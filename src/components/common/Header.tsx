import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store";

interface HeaderProps {
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick }) => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
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
            <button
              onClick={onCartClick}
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-700"
            >
              <span>🛒</span>
              <span>Cart</span>
              <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
