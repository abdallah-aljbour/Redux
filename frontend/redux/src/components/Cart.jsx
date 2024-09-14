// src/components/Cart.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartStatus,
  selectCartError,
} from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const status = useSelector(selectCartStatus);
  const error = useSelector(selectCartError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCart());
    }
  }, [status, dispatch]);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  if (status === "loading")
    return <div className="text-center py-4">Loading...</div>;
  if (error)
    return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-6 text-center">Cart</h1>
        {cartItems.length > 0 ? (
          <div className="flex flex-col space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.productId._id}
                className="flex bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={item.productId.imageUrl}
                  alt={item.productId.name}
                  className="w-48 h-48 object-cover"
                />
                <div className="p-4 flex-grow">
                  <h2 className="text-xl font-semibold mb-2">
                    {item.productId.name}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {item.productId.description}
                  </p>
                  <p className="text-gray-800 font-bold">
                    ${item.productId.price}
                  </p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      className="bg-gray-200 px-2 py-1 rounded"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.productId._id)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-4">Your cart is empty.</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
