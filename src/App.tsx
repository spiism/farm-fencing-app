import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadCart, loadFromStorage } from "./store/slices/cartSlice";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import "./App.css";

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //load cart from storage when app starts
    const initializeCart = async () => {
      const savedCart = await loadFromStorage();
      dispatch(loadCart(savedCart));
    };

    initializeCart();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
