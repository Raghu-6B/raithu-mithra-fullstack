// src/components/ProductCard.jsx
import React from "react";

export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg shadow-md p-4 flex flex-col justify-between">
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p>₹{product.price}</p>
      <p>Freshness: {product.freshness}%</p>
      <p>Stock: {product.stock}</p>
      <button className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
}
