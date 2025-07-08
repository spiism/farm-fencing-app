import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const navigate = useNavigate();
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <button
            onClick={() => navigate("/")}
            className="flex items-center space-x-2 hover:opacity-75 transition-opacity"
          >
            <span className="material-symbols-outlined text-xl sm:text-2xl">
              agriculture
            </span>
            <span className="text-lg sm:text-xl font-semibold text-gray-900">
              Farm Shop
            </span>
          </button>

          <div className="flex items-center space-x-3 sm:space-x-6">
            <button className="hidden sm:block text-green-600 hover:text-green-700 font-medium transition-colors">
              Products
            </button>

            <button
              onClick={onCartClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-700 transition-colors touch-manipulation"
            >
              <span className="material-symbols-outlined text-lg sm:text-xl">
                shopping_cart
              </span>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center min-w-[20px]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="sm:hidden border-t border-gray-100 px-4 py-2">
        <div className="flex justify-center">
          <button className="text-green-600 hover:text-green-700 font-medium py-1 px-3 rounded transition-colors">
            All Products
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
