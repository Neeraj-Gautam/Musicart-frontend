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
  const [loggedIn, setLoggedIn] = useState(false);
  const [cart, setCart] = useState(null);
  const [numberOfProductInCart, setNumberOfProductInCart] = useState(0);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  return (
    <div>
      <Navbar />
      <TitleBar />
      <div className={styles.homePage}>
        <div className={styles.gradientBox}>
          <p>Grab upto 50% off on Selected headphones</p>
          {<img src={bannerImage} />}
        </div>

        <div>
          <Product />
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
