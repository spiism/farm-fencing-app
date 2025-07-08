import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { removeFromCart, clearCart } from "../../store/slices/cartSlice";

const CartPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">🛒 Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-lg"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <li
                  key={item.product.id}
                  className="border-b pb-4 flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="text-sm text-red-500 hover:underline mt-1"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-lg font-bold text-green-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <button
                onClick={() => dispatch(clearCart())}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Clear Cart
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPanel;
