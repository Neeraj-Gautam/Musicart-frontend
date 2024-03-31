import React, { useState, useEffect } from "react";
import styles from "./Footer.module.css";
import home from "../../assets/icon/home.png";
import mobileCart from "../../assets/icon/mobileCart.png";
import mobileInvoice from "../../assets/icon/mobileInvoice.png";
import login from "../../assets/icon/login.png";
import { logout } from "../../utils/UtilFunctions/util";
import { useNavigate } from "react-router";

export const Footer = ({ showNoOfItems, noOfItems, currentPage }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutUser = () => {
    logout();
    setIsLoggedIn(false);
    window.location.reload();
  };

  const navigatePage = (page) => {
    navigate("/" + page);
  };

  return (
    <div>
      <div className={styles.footer}>Musicart | All rights reserved</div>
      <div className={styles.mobileFooter}>
        <div className={styles.home}>
          <img src={home} />
          <span
            onClick={() => {
              navigatePage("home");
            }}
          >
            <strong>Home</strong>
          </span>
        </div>
        <div className={styles.cart}>
          {showNoOfItems && (
            <div className={styles.numberOfItems}>
              <span>{noOfItems}</span>
            </div>
          )}
          <img src={mobileCart} className={styles.cartImage} />
          <span
            onClick={() => {
              navigatePage("mycart");
            }}
          >
            <strong>Cart</strong>
          </span>
        </div>
        <div className={styles.invoice}>
          <img src={mobileInvoice} />
          <span
            onClick={() => {
              navigatePage("invoice");
            }}
          >
            <strong>Invoice</strong>
          </span>
        </div>
        <div className={styles.login}>
          <img src={login} />
          {isLoggedIn && (
            <span onClick={logoutUser}>
              <strong>Logout</strong>
            </span>
          )}

          {!isLoggedIn && (
            <span
              onClick={() => {
                navigatePage("login");
              }}
            >
              <strong>Login</strong>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
