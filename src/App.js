import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ItemPage } from "./pages/ItemPage/ItemPage";
import { MyCartPage } from "./pages/MyCartPage/MyCartPage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { SuccessfulPage } from "./pages/SuccessfulPage/SuccessfulPage";
import { MyInvoicesPage } from "./pages/MyInvoicesPage/MyInvoicesPage";
import { InvoicePage } from "./pages/InvoicePage/InvoicePage";
import { OrderPlacedPage } from "./pages/OrderPlacedPage/OrderPlacedPage";

function App() {
  const RedirectToLogin = () => {
    let navigate = useNavigate();
    useEffect(() => {
      navigate("/login");
    }, [navigate]);
    return null;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<RedirectToLogin />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/item/:productId" element={<ItemPage />} />
        <Route path="/mycart" element={<MyCartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/successful" element={<SuccessfulPage />} />
        <Route path="/myInvoices" element={<MyInvoicesPage />} />
        <Route path="/orderplaced" element={<OrderPlacedPage />} />
        <Route path="/invoice/:orderId" element={<InvoicePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
