import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { addToCart } from "../store/slices/cartSlice";
import Header from "../components/common/Header";
import type { RootState } from "../store";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error, refetch } = useProducts();

  const product = products.find((p) => p.id === id);
  const cartItem = useSelector((state: RootState) =>
    product
      ? state.cart.items.find((item) => item.product.id === product.id)
      : undefined
  );
  const cartQuantity = cartItem?.quantity ?? 0;

  const availableStock = product ? product.inventory - cartQuantity : 0;
  const isOutOfStock = product
    ? !product.available || availableStock <= 0
    : true;

  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (product && newQuantity >= 1 && newQuantity <= product.inventory) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ product, quantity }));
      setQuantity(1);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;
  if (!product)
    return (
      <div className="p-8 text-center text-gray-500">Product not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => navigate("/cart")} />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
        >
          <span className="text-xl">←</span>
          <span className="text-sm sm:text-base font-medium">
            Back to Products
          </span>
        </button>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-green-100 flex items-center justify-center h-64 sm:h-80 md:h-full">
            <span className="text-8xl">🚜</span>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              <div className="flex items-center space-x-2 mb-4 text-sm">
                <span className="text-yellow-400 text-lg">⭐</span>
                <span className="font-semibold text-gray-900">
                  {product.rating}
                </span>
                <span className="text-gray-600">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-700 text-base sm:text-lg mb-6 leading-relaxed">
                {product.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm sm:text-base mb-6">
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

            <div className="border-t pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="text-3xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </div>

                {product.available && (
                  <div className="flex items-center flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 text-xl rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                      >
                        −
                      </button>
                      <span className="w-10 text-center font-semibold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity + cartQuantity >= product.inventory}
                        className="w-10 h-10 text-xl rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={`px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors text-white ${
                        isOutOfStock
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-green-600 hover:bg-green-700"
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
    </div>
  );
};

export default ProductDetailPage;
