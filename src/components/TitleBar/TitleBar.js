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

export const TitleBar = ({
  showUserInfo,
  showCartInfo,
  currentPage,
  cartDetails,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(null);
  const [numberOfProductInCart, setNumberOfProductInCart] = useState(0);
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [initials, setInitials] = useState("");

  useEffect(() => {
    console.log("run...");
    const token = localStorage.getItem(TOKEN);
    const userName = localStorage.getItem(USERNAME);
    if (token) {
      setIsLoggedIn(true);
      setUserName(userName);
      setInitials(getInitials(userName));
      loadcart();
    }
  }, [cartDetails]);

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

  const getInitials = (name) => {
    if (name) {
      const words = name.trim().split(/\s+/);
      let initials = "";
      for (let i = 0; i < words.length && initials.length < 2; i++) {
        initials += words[i].charAt(0).toUpperCase();
      }
      console.log(initials);
      return initials;
    }
  };

  const countProductsInCart = (cartData) => {
    try {
      console.log(cartData);
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

          {currentPage && currentPage !== "home" && (
            <div className={styles.pageName}>
              <span>Home/ {currentPage}</span>
            </div>
          )}
        </div>

        {showCartInfo && isLoggedIn && (
          <div className={styles.navLoginCart}>
            <div className={styles.cart}>
              <button onClick={handleViewcart}>
                <img className={styles.shoppingCart} src={shoppingCart} />
                <img className={styles.viewCart} src={viewCart} />
                <span className={styles.noOfProducts}>
                  &nbsp;{numberOfProductInCart}
                </span>
              </button>
            </div>
            {showUserInfo && (
              <select className={styles.userProfile} onChange={handleChange}>
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
