import React from "react";

export default function ProductCard(props) {
  const product = props.product; // simple variable for clarity

  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-200 text-center">
      <img
        src={product.image} // using the image path directly
        alt={product.name}
        className="w-full h-36 object-cover rounded-lg mb-2"
      />

      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-700">₹{product.price}</p>
      <p className="text-sm text-green-700">Freshness: {product.freshness}%</p>
      <p className="text-sm mb-2">Stock: {product.stock}</p>

      <button className="mt-2 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
        Add to Cart
      </button>
    </div>
  );
}
