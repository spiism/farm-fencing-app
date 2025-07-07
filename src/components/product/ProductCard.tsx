import React from "react";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => {}}
    >
      <div className="bg-green-100 h-48 flex items-center justify-center">
        <span className="text-6xl">🚜</span>
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {product.name}
        </h3>

        <div className="flex items-center space-x-1 mb-2">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        <div className="text-2xl font-bold text-green-600 mb-2">
          ${product.price.toFixed(2)}
        </div>

        <div className="flex justify-end">
          {product.available ? (
            <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
              In Stock
            </span>
          ) : (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
