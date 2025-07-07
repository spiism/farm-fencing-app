import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/product/ProductGrid";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import type { ProductCategory, Product } from "../types/product";
import ProductDetailPage from "./ProductDetailPage";

const ProductListPage: React.FC = () => {
  const { products, loading, error, refetch } = useProducts();
  const [selectedCategory, setSelectedCategory] =
    React.useState<ProductCategory>("all");
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );

  const categories: ProductCategory[] = React.useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(products.map((product) => product.category))
    );
    return ["all", ...uniqueCategories] as ProductCategory[];
  }, [products]);

  //filter products based on selected category & search
  const filteredProducts = React.useMemo(() => {
    let filtered = products;

    //by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    //by search term
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower)
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

  //show product detail if a product is selected
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🚜</span>
              <span className="text-xl font-semibold text-gray-900">
                Farm Shop
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="text-green-600 hover:text-green-700 font-medium">
                Products
              </button>
              <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-700">
                <span>🛒</span>
                <span>Cart</span>
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

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
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
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
                onClick={() => setSelectedCategory(category)}
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
          onProductClick={setSelectedProduct}
        />
      </main>
    </div>
  );
};

export default ProductListPage;
