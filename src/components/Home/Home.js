import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import bannerImage from "../../assets/icon/bannerImage.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { addProductIncart, getCart } from "../../apis/cart";
import { useNavigate } from "react-router";
import { TitleBar } from "../TitleBar/TitleBar";

export const Home = () => {
  const [cart, setCart] = useState(null);

  const addProduct = async (productUuid) => {
    const cartData = await addProductIncart(productUuid);
    setCart(cartData);
  };

  return (
    <div>
      <Navbar showLogoutOption={false}/>
      <TitleBar currentPage="home" showUserInfo={true} cartDetails={cart} showCartInfo={true} />
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
          <Product cart={cart} handleCartChange={addProduct} />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
};
