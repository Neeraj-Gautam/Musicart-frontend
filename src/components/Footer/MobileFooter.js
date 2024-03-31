import React from "react";
import styles from "./MobileFooter.module.css";
import home from "../../assets/icon/home.png";
import mobileCart from "../../assets/icon/mobileCart.png";
import mobileInvoice from "../../assets/icon/mobileInvoice.png";
import login from "../../assets/icon/login.png";

export const MobileFooter = () => {
  return (
    <div className={styles.mobileFooter}>
      <div className={styles.home}>
        <img src={home} />
        <span>
          <strong>Home</strong>
        </span>
      </div>
      <div className={styles.cart}>
        <img src={mobileCart} />
        <span>
          <strong>Cart</strong>
        </span>
      </div>
      <div className={styles.invoice}>
        <img src={mobileInvoice} />
        <span>
          <strong>Invoice</strong>
        </span>
      </div>
      <div className={styles.login}>
        <img src={login} />
        <span>
          <strong>Login</strong>
        </span>
      </div>
    </div>
  );
};
