import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import bannerImage from "../../assets/icon/bannerImage.png";
import shoppingCart from "../../assets/icon/shoppingCart.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { addProductIncart, getCart } from "../../apis/cart";
import { useNavigate } from "react-router";

export const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation();
  const [cart, setCart] = useState(null);
  const [numberOfProductInCart, setNumberOfProductInCart] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
      loadcart();
    }
  }, []);

  const loadcart = async () => {
    const cartData = await getCart();
    setCart(cartData);
    setNumberOfProductInCart(countProductsInCart(cartData));
  };

  const addProduct = async (productUuid) => {
    const cartData = await addProductIncart(productUuid);
    setCart(cartData);
    console.log(cartData);
    setNumberOfProductInCart(countProductsInCart(cartData));
  };

  const handleViewcart = () => {
    navigate("/mycart");
  };

  const countProductsInCart = (cartData) => {
    try {
      if (cartData && cartData.products) {
        let count = 0;
        for (let i = 0; i < cartData.products.length; i++) {
          count = count + cartData.products[i].quantity;
        }

        return count;
      }
    } catch (error) {}
    return 0;
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className={styles.homePage}>
        <div className={styles.titleBar}>
          <div className={styles.titleBarLogo}>
            {
              <img src="https://drive.google.com/file/d/16O5MLyLWwZ9CWVSus2zN8IgC88UD3tm-/view?usp=drive_link" />
            }
            <span className={styles.titleName}> Musicart </span>
            <span>Home</span>
            {loggedIn && <span>Invoice</span>}
          </div>

          {loggedIn && (
            <div className={styles.navLoginCart}>
              <button onClick={handleViewcart}>
                <img src={shoppingCart} alt="" />
                View Cart &nbsp;{numberOfProductInCart}
              </button>
            </div>
          )}
        </div>

        <div className={styles.gradientBox}>
          <p>Grab upto 50% off on Selected headphones</p>
          {<img src={bannerImage} />}
        </div>

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
