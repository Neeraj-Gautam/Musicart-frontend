import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import bannerImage from "../../assets/icon/bannerImage.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";
import { addProductIncart } from "../../apis/cart";
import { TitleBar } from "../TitleBar/TitleBar";
import MobileSearchBar from "../SearchBar/MobileSearchBar";

export const Home = () => {
  const [cart, setCart] = useState(null);
  const [mobileSearch, setMobileSearch] = useState("");

  const addProduct = async (productId) => {
    const cartData = await addProductIncart(productId);
    setCart(cartData);
  };

  const handleMobileSearch = (newValue) => {
    setMobileSearch(newValue);
  };

  return (
    <div>
      <Navbar showLogoutOption={false} />{" "}
      <TitleBar
        currentPage="home"
        showUserInfo={true}
        cartDetails={cart}
        showCartInfo={true}
      />
      <MobileSearchBar handleMobileSearch={handleMobileSearch}/>
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
          <Product cart={cart} handleCartChange={addProduct} mobileSearch={mobileSearch} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
