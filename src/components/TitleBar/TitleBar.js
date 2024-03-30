import React, { useState, useEffect } from "react";
import styles from "./TitleBar.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import bannerImage from "../../assets/icon/bannerImage.png";
import shoppingCart from "../../assets/icon/shoppingCart.png";
import viewCart from "../../assets/icon/viewCart.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { addProductIncart, getCart } from "../../apis/cart";
import { TOKEN, USERNAME } from "../../utils/constants";

export const TitleBar = ({ showUserInfo, currentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(null);
  const [numberOfProductInCart, setNumberOfProductInCart] = useState(0);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const userName = localStorage.getItem(USERNAME);
    if (token) {
      setIsLoggedIn(true);
      setUserName(userName);
      loadcart();
    }
  }, []);

  const loadcart = async () => {
    const cartData = await getCart();
    console.log(cartData);
    setCart(cartData);
    setNumberOfProductInCart(countProductsInCart(cartData));
  };

  const handleViewcart = () => {
    navigate("/mycart");
  };

  const handleChange = () => {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USERNAME);
    window.location.reload();
  };

  const handleClick = (page) => {
    navigate("/" + page);
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
      <div className={styles.titleBar}>
        <div className={styles.titleBarLogo}>
          {<img src={musiCartLogo} />}
          <span className={styles.titleName}> Musicart </span>
          {currentPage === "home" && (
            <>
              <span
                onClick={() => {
                  handleClick("home");
                }}
              >
                Home
              </span>
              {isLoggedIn && (
                <span
                  onClick={() => {
                    handleClick("invoice");
                  }}
                >
                  Invoice
                </span>
              )}
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className={styles.navLoginCart}>
            <button onClick={handleViewcart}>
              <img className={styles.shoppingCart} src={shoppingCart} />
              <img className={styles.viewCart} src={viewCart} />
              <span className={styles.noOfProducts}>
                {numberOfProductInCart}
              </span>
            </button>
            {showUserInfo && (
              <select onChange={handleChange}>
                <option value="name">{userName}</option>
                <option value="logout"> Logout </option>
              </select>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
