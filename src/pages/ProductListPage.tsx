// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useProducts } from "../hooks/useProducts";
// import type { RootState } from "../store";
// import {
//   setSearchTerm,
//   setSelectedCategory,
// } from "../store/slices/filterSlice";

// import ProductGrid from "../components/product/ProductGrid";
// import LoadingSpinner from "../components/common/LoadingSpinner";
// import ErrorMessage from "../components/common/ErrorMessage";
// import type { ProductCategory } from "../types/product";
// import Header from "../components/common/Header";
// import { useNavigate } from "react-router-dom";

// const ProductListPage: React.FC = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { products, loading, error, refetch } = useProducts();

//   const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);
//   const selectedCategory = useSelector(
//     (state: RootState) => state.filter.selectedCategory
//   );

//   const categories = React.useMemo(() => {
//     const uniqueCategories = Array.from(
//       new Set(products.map((product) => product.category))
//     );
//     return ["all", ...uniqueCategories] as ProductCategory[];
//   }, [products]);

//   const filteredProducts = React.useMemo(() => {
//     let filtered = products;

//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (product) => product.category === selectedCategory
//       );
//     }

//     if (searchTerm.trim()) {
//       const lower = searchTerm.toLowerCase();
//       filtered = filtered.filter(
//         (product) =>
//           product.name.toLowerCase().includes(lower) ||
//           product.description.toLowerCase().includes(lower) ||
//           product.category.toLowerCase().includes(lower)
//       );
//     }

//     return filtered;
//   }, [products, selectedCategory, searchTerm]);

//   if (loading) return <LoadingSpinner />;
//   if (error) return <ErrorMessage message={error} onRetry={refetch} />;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header onCartClick={() => navigate("/cart")} />

//       <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-8">
//         <div className="flex justify-center mb-4 sm:mb-6">
//           <button
//             onClick={refetch}
//             className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm touch-manipulation w-full sm:w-auto"
//           >
//             <span className="text-lg">🔄</span>
//             <span className="font-medium">Pull to Refresh</span>
//           </button>
//         </div>

//         <div className="mb-4 sm:mb-6">
//           <div className="relative">
//             <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
//               🔍
//             </span>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchTerm}
//               onChange={(e) => dispatch(setSearchTerm(e.target.value))}
//               className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
//             />
//             {searchTerm && (
//               <button
//                 onClick={() => dispatch(setSearchTerm(""))}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
//               >
//                 ✕
//               </button>
//             )}
//           </div>
//         </div>

//         <div className="mb-6 sm:mb-8">
//           <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
//             {categories.map((category) => (
//               <button
//                 key={category}
//                 onClick={() => dispatch(setSelectedCategory(category))}
//                 className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors touch-manipulation ${
//                   category === selectedCategory
//                     ? "bg-green-500 text-white hover:bg-green-600"
//                     : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
//                 }`}
//               >
//                 {category === "all" ? "All Categories" : category}
//               </button>
//             ))}
//           </div>
//         </div>

//         <div className="mb-4 text-sm text-gray-600">
//           {filteredProducts.length === 0 ? (
//             <span>No products found</span>
//           ) : (
//             <span>
//               {filteredProducts.length} product
//               {filteredProducts.length !== 1 ? "s" : ""} found
//             </span>
//           )}
//         </div>

//         <ProductGrid
//           products={filteredProducts}
//           onProductClick={(product) => navigate(`/product/${product.id}`)}
//         />
//       </main>
//     </div>
//   );
// };

// export default ProductListPage;

import React, { useEffect, useCallback, useRef } from "react";
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

const PRODUCTS_PER_PAGE = 8; // reduced for mobile performance

const ProductListPage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const observerRef = useRef<HTMLDivElement>(null);
  const [displayedCount, setDisplayedCount] = React.useState(PRODUCTS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = React.useState(false);

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

  const displayedProducts = React.useMemo(() => {
    return filteredProducts.slice(0, displayedCount);
  }, [filteredProducts, displayedCount]);

  const hasMore = displayedProducts.length < filteredProducts.length;

  //reset displayed count when filters change
  React.useEffect(() => {
    setDisplayedCount(PRODUCTS_PER_PAGE);
  }, [searchTerm, selectedCategory]);

  const loadMore = useCallback(() => {
    if (isLoadingMore || !hasMore) return;

    setIsLoadingMore(true);

    //reduced loading delay for mobile
    setTimeout(() => {
      setDisplayedCount((prev) => prev + PRODUCTS_PER_PAGE);
      setIsLoadingMore(false);
    }, 300);
  }, [isLoadingMore, hasMore]);

  //intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !isLoadingMore) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [loadMore, hasMore, isLoadingMore]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => navigate("/cart")} />

      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-4 sm:py-8">
        <div className="flex justify-center mb-4 sm:mb-6">
          <button
            onClick={refetch}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm touch-manipulation w-full sm:w-auto"
          >
            <span className="text-lg">🔄</span>
            <span className="font-medium">Pull to Refresh</span>
          </button>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => dispatch(setSearchTerm(""))}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => dispatch(setSelectedCategory(category))}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors touch-manipulation ${
                  category === selectedCategory
                    ? "bg-green-500 text-white hover:bg-green-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category === "all" ? "All Categories" : category}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4 text-sm text-gray-600">
          {filteredProducts.length === 0 ? (
            <span>No products found</span>
          ) : (
            <span>
              Showing {displayedProducts.length} of {filteredProducts.length}{" "}
              product
              {filteredProducts.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <ProductGrid
          products={displayedProducts}
          onProductClick={(product) => navigate(`/product/${product.id}`)}
        />

        {/*infinite scroll*/}
        {hasMore && (
          <div ref={observerRef} className="flex justify-center py-8">
            {isLoadingMore ? (
              <div className="flex items-center gap-2 text-gray-500">
                <div className="w-5 h-5 border-2 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
                <span>Loading more products...</span>
              </div>
            ) : (
              <div className="text-gray-400 text-sm">
                Scroll down to load more products
              </div>
            )}
          </div>
        )}

        {!hasMore && filteredProducts.length > 0 && (
          <div className="text-center py-8 text-gray-500 text-sm">
            <div className="border-t border-gray-200 pt-4">
              You've reached the end of the results
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductListPage;
