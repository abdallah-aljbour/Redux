const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Static user ID
const STATIC_USER_ID = "gmhnyj4268365214mn";

// Add product to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: STATIC_USER_ID });
    if (!cart) {
      cart = new Cart({ userId: STATIC_USER_ID, items: [] });
    }

    // Check if product is already in cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity if product is already in cart
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new product to cart
      cart.items.push({ productId, quantity });
    }

    // Save cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get cart for the static user
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: STATIC_USER_ID }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove product from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.query;
  try {
    // Find cart for the static user
    const cart = await Cart.findOne({ userId: STATIC_USER_ID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Filter out the item to be removed
    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    // Save updated cart
    await cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update quantity of a product in cart
exports.updateQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  try {
    // Find cart for the static user
    const cart = await Cart.findOne({ userId: STATIC_USER_ID });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex > -1) {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;

      // Remove item if quantity is 0 or less
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }

      // Save updated cart
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
