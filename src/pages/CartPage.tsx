import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import CartPanelContent from "../components/cart/CartPanelContent";

const CartPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCartClick={() => {}} />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-green-600 hover:text-green-700 mb-6"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <h1 className="text-2xl font-bold mb-6">🛒 Your Cart</h1>
        <CartPanelContent />
      </main>
    </div>
  );
};

export default CartPage;
