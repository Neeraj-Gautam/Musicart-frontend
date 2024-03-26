import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { HomePage } from "./pages/HomePage/HomePage";
import { ItemPage } from "./pages/ItemPage/ItemPage";
import { MyCartPage } from "./pages/MyCartPage/MyCartPage";

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
        <Route path="/item/:uuid" element={<ItemPage />} />
        <Route path="/mycart" element={<MyCartPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
