import React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import {
  removeFromCart,
  clearCart,
  updateQuantity,
} from "../../store/slices/cartSlice";

const CartPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (
    productId: string,
    newQuantity: number,
    max: number
  ) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(productId));
    } else if (newQuantity <= max) {
      dispatch(updateQuantity({ productId, quantity: newQuantity }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-lg p-6 overflow-y-auto relative">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">🛒 Your Cart</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-20">Your cart is empty.</p>
        ) : (
          <>
            <ul className="space-y-6 mb-6">
              {cartItems.map((item) => {
                const maxAvailable = item.product.inventory;

                return (
                  <li
                    key={item.product.id}
                    className="border-b pb-4 flex justify-between items-start gap-4"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {item.product.unit}
                      </p>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity - 1,
                              maxAvailable
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded border text-lg font-bold bg-gray-100 hover:bg-gray-200"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.quantity + 1,
                              maxAvailable
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center rounded border text-lg font-bold bg-gray-100 hover:bg-gray-200"
                          disabled={item.quantity >= maxAvailable}
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {maxAvailable - item.quantity} left in stock
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() =>
                          dispatch(removeFromCart(item.product.id))
                        }
                        className="text-sm text-red-500 hover:underline mt-2"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="flex justify-between items-center mb-4 border-t pt-4">
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
