import React from "react";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col group"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center h-48 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-16 h-16 bg-green-300 rounded-full"></div>
          <div className="absolute bottom-4 left-4 w-12 h-12 bg-green-400 rounded-full"></div>
        </div>

        <div className="relative z-10 p-6">
          <span
            className="material-symbols-outlined text-8xl text-green-700 select-none group-hover:scale-110 transition-transform duration-300"
            aria-label={product.icon}
            role="img"
          >
            {product.icon}
          </span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-4">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`material-symbols-outlined text-sm ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                } select-none`}
              >
                star
              </span>
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="flex items-baseline space-x-2 mb-4">
          <span className="text-3xl font-bold text-green-700">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${(product.price * 1.2).toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center mt-auto">
          {product.available ? (
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-3 py-2 rounded-full flex items-center space-x-1">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>In Stock</span>
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-2 rounded-full flex items-center space-x-1">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>Out of Stock</span>
            </span>
          )}

          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <span className="material-symbols-outlined text-sm">
              shopping_cart
            </span>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
