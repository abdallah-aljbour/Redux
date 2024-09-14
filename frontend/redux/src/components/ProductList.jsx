import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      await axios.post(`${API_URL}/cart`, {
        productId,
        quantity: 1,
      });
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  if (loading)
    return (
      <div className="text-center py-4 text-2xl animate-pulse">
        Loading awesome products...
      </div>
    );

  if (error)
    return (
      <div className="text-center py-4 text-red-500 text-2xl">
        Oops! {error}
      </div>
    );

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="w-full py-8 px-4 md:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-6 text-center text-white animate-bounce">
          Fantastic Product List
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col transform transition duration-500 hover:scale-105 hover:rotate-1"
            >
              <div className="relative">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-yellow-400 text-black font-bold py-1 px-2 rounded-bl-lg">
                  ${product.price}
                </div>
              </div>
              <div className="p-4 flex-grow bg-gradient-to-b from-white to-gray-100">
                <h2 className="text-xl font-semibold mb-2 text-purple-600">
                  {product.name}
                </h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <button
                  onClick={() => addToCart(product._id)}
                  className="mt-4 w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full hover:from-green-500 hover:to-blue-600 transform transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
