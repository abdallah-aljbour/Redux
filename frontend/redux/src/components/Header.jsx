import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  fetchCart,
  removeFromCart,
  updateQuantity,
  selectCartItems,
  selectCartItemCount,
} from "../store/cartSlice";

const Header = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItemCount = useSelector(selectCartItemCount);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <header className="bg-white-800 text-black p-4 flex justify-between items-center relative">
      <h1 className="text-xl font-bold">My Store</h1>
      <div className="relative">
        <button onClick={toggleCart} className="flex items-center">
          <FontAwesomeIcon icon={faShoppingCart} />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartItemCount}
            </span>
          )}
        </button>
        {showCart && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-lg w-64 max-h-[80vh] overflow-y-auto z-50">
            <div className="p-4 border-b sticky top-0 bg-white">Cart</div>
            <ul>
              {cartItems.map((item) => (
                <li key={item.productId._id} className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={item.productId.imageUrl}
                        alt={item.productId.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <p className="font-semibold">{item.productId.name}</p>
                        <p>
                          ${item.productId.price} x {item.quantity}
                        </p>
                        <div className="flex items-center mt-2">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId._id,
                                item.quantity - 1
                              )
                            }
                            className="bg-white-200 px-2 py-1 rounded text-sm"
                          >
                            -
                          </button>
                          <span className="mx-2 text-sm">{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(
                                item.productId._id,
                                item.quantity + 1
                              )
                            }
                            className="bg-gray-200 px-2 py-1 rounded text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(item.productId._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
