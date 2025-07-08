import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProducts } from "../hooks/useProducts";
import type { RootState } from "../store";
import {
  setSearchTerm,
  setSelectedCategory,
} from "../store/slices/filterSlice";

import ProductGrid from "../components/product/ProductGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import type { ProductCategory } from "../types/product";
import Header from "../components/common/Header";
import { useNavigate } from "react-router-dom";

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading, error, refetch } = useProducts();

  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
  const selectedCategory = useSelector(
    (state: RootState) => state.filter.selectedCategory
  );

  const categories = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return ["all", ...uniqueCategories] as ProductCategory[];
  }, [products]);

  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(lower) ||
          product.description.toLowerCase().includes(lower) ||
          product.category.toLowerCase().includes(lower)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={refetch} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => navigate("/cart")} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => refetch()}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <span>🔄</span>
            <span>Pull to refresh</span>
          </button>
        </div>

        {/*search bar */}
        <div className="mb-6">
          <div className="relative">
            <span className="absolute left-3 top-3 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => dispatch(setSearchTerm(""))}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/*category flter*/}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => dispatch(setSelectedCategory(category))}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  category === selectedCategory
                    ? "bg-green-600 text-white hover:bg-green-700"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          onProductClick={(product) => navigate(`/product/${product.id}`)}
        />
      </main>

      {/* {showCart && <CartPanel onClose={() => setShowCart(false)} />} */}
    </div>
  );
};

export default ProductListPage;
