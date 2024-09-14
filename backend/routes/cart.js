const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Add product to cart
router.post("/", cartController.addToCart);

// Get cart
router.get("/", cartController.getCart);

// Remove product from cart
router.delete("/remove", cartController.removeFromCart);

// Update quantity of a product in cart
router.put("/updateQuantity", cartController.updateQuantity);

module.exports = router;
