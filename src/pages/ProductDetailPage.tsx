import React, { useState } from "react";
import type { Product } from "../types/product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice";
import Header from "../components/common/Header";
import CartPanel from "../components/cart/CartPanel";
import type { RootState } from "../store";

interface ProductDetailPageProps {
  product: Product;
  onBack: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBack,
}) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showCart, setShowCart] = React.useState(false);

  const cartItem = useSelector((state: RootState) =>
    state.cart.items.find((item) => item.product.id === product.id)
  );
  const cartQuantity = cartItem?.quantity ?? 0;
  const availableStock = product.inventory - cartQuantity;

  const isOutOfStock = !product.available || availableStock <= 0;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => setShowCart(true)} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/*back button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
        >
          <span>←</span>
          <span>Back to Products</span>
        </button>

        {/*detail card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          {/* TODO: replace icons*/}
          <div className="bg-green-100 h-80 flex items-center justify-center">
            <span className="text-8xl">🚜</span>
          </div>

          {/*product info */}
          <div className="p-8">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>

                {/*rating */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-yellow-400 text-lg">⭐</span>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>

                {/*desc */}
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/*details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <span className="text-gray-600 font-medium">Category:</span>
                    <div className="text-gray-900 font-semibold">
                      {product.category}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Unit:</span>
                    <div className="text-gray-900 font-semibold">
                      {product.unit}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600 font-medium">Stock:</span>
                    <div className="text-gray-900 font-semibold">
                      {availableStock} available
                    </div>
                  </div>
                </div>
              </div>

              {/*stock status */}
              <div className="ml-6">
                {product.available ? (
                  <span className="bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                    In Stock
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-800 text-sm px-3 py-1 rounded-full font-medium">
                    Out of Stock
                  </span>
                )}
              </div>
            </div>

            {/*price*/}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between">
                <div className="text-4xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </div>

                {product.available && (
                  <div className="flex items-center space-x-4">
                    {/*quantity selector */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        −
                      </button>
                      <span className="w-12 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity + cartQuantity >= product.inventory}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        +
                      </button>
                    </div>

                    {/*add to cart*/}
                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={`px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors ${
                        isOutOfStock
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-green-600 hover:bg-green-700 text-white"
                      }`}
                    >
                      <span>🛒</span>
                      <span>
                        {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      {showCart && <CartPanel onClose={() => setShowCart(false)} />}
    </div>
  );
};

export default ProductDetailPage;
