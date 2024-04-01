import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import bannerImage from "../../assets/icon/bannerImage.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";
import { Feedback } from "../Feedback/Feedback";
import { addProductIncart } from "../../apis/cart";
import { TitleBar } from "../TitleBar/TitleBar";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Home = () => {
  const [cart, setCart] = useState(null);
  const [mobileSearch, setMobileSearch] = useState("");

  const addProduct = async (productId) => {
    const response = await addProductIncart(productId);
    if (response.status == 204) {
      toast.error("Maximum quantity (8) reached for this product");
      return;
    }
    toast.success("Product added successfully in cart!!");
    setCart(response.data);
  };

  const handleMobileSearch = (newValue) => {
    setMobileSearch(newValue);
  };

  return (
    <div>
      <ToastContainer />
      <Navbar showLogoutOption={false} />{" "}
      <TitleBar
        currentPage="home"
        showUserInfo={true}
        cartDetails={cart}
        showCartInfo={true}
      />
      <MobileSearchBar handleMobileSearch={handleMobileSearch} />
      <div className={styles.homePage}>
        <div className={styles.gradientBox}>
          <div className={styles.bannerText}>
            Grab upto 50% off on Selected headphones
          </div>
          <div className={styles.logo}>
            <img src={bannerImage} />
          </div>
        </div>
        <br />
        <div>
          <Product
            cart={cart}
            handleCartChange={addProduct}
            mobileSearch={mobileSearch}
          />
        </div>
      </div>
      <Feedback />
      <div>
        <Footer />
      </div>
    </div>
  );
};
