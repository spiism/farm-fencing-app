import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import { addToCart } from "../store/slices/cartSlice";
import { HapticsService } from "../services/haptics";
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
      //light haptic feedback for quantity changes
      HapticsService.light();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Header
        onCartClick={() => {
          HapticsService.light();
          navigate("/cart");
        }}
      />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-3 text-green-600 hover:text-green-700 mb-8 group transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
            <span className="material-symbols-outlined text-xl">
              arrow_back
            </span>
          </div>
          <span className="text-lg font-medium">Back to Products</span>
        </button>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="relative bg-gradient-to-br from-green-100 via-green-200 to-green-300 p-8 lg:p-12 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-8 right-8 w-24 h-24 bg-green-400 rounded-full"></div>
                <div className="absolute bottom-8 left-8 w-16 h-16 bg-green-500 rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-green-300 rounded-full"></div>
                <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-green-400 rounded-full"></div>
              </div>

              <div className="relative z-10 text-center">
                <span
                  className="material-symbols-outlined text-9xl lg:text-[12rem] text-green-700 select-none"
                  aria-label={product.icon}
                  role="img"
                >
                  {product.icon}
                </span>
              </div>

              <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium text-green-700">
                  Premium Quality
                </span>
              </div>
            </div>

            <div className="p-8 lg:p-12 flex flex-col">
              <div className="mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {product.name}
                </h1>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`material-symbols-outlined text-lg ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        } select-none`}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {product.rating}
                  </span>
                  <span className="text-gray-600">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {product.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 font-medium">
                      Category
                    </span>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {product.category}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 font-medium">
                      Unit
                    </span>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {product.unit}
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <span className="text-sm text-gray-600 font-medium">
                      Stock
                    </span>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      {availableStock} available
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-auto">
                <div className="mb-6">
                  <div className="flex items-baseline space-x-3">
                    <span className="text-4xl font-bold text-green-600">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ${(product.price * 1.25).toFixed(2)}
                    </span>
                    <span className="bg-red-100 text-red-800 text-sm font-bold px-2 py-1 rounded">
                      20% OFF
                    </span>
                  </div>
                </div>

                <div className="mb-6">
                  {product.available ? (
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                      <span className="text-green-700 font-semibold">
                        In Stock
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                      <span className="text-red-700 font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {product.available && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                      <button
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          remove
                        </span>
                      </button>
                      <span className="w-12 text-center font-bold text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity + cartQuantity >= product.inventory}
                        className="w-10 h-10 rounded-lg bg-white border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">
                          add
                        </span>
                      </button>
                    </div>

                    <button
                      onClick={handleAddToCart}
                      disabled={isOutOfStock}
                      className={`flex-1 px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center space-x-3 transition-all ${
                        isOutOfStock
                          ? "bg-gray-400 cursor-not-allowed text-white"
                          : "bg-green-600 hover:bg-green-700 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <span className="material-symbols-outlined">
                        shopping_cart
                      </span>
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <span className="material-symbols-outlined text-2xl text-green-600">
                local_shipping
              </span>
              <h3 className="text-lg font-bold text-gray-900">Free Shipping</h3>
            </div>
            <p className="text-gray-600">Free delivery on orders over $50</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <span className="material-symbols-outlined text-2xl text-green-600">
                verified
              </span>
              <h3 className="text-lg font-bold text-gray-900">
                Quality Guarantee
              </h3>
            </div>
            <p className="text-gray-600">30-day money back guarantee</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <span className="material-symbols-outlined text-2xl text-green-600">
                support_agent
              </span>
              <h3 className="text-lg font-bold text-gray-900">24/7 Support</h3>
            </div>
            <p className="text-gray-600">Expert customer support available</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;
