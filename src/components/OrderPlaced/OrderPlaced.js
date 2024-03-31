import React, { useState } from "react";
import styles from "./OrderPlaced.module.css";
import { TitleBar } from "../TitleBar/TitleBar";
import confetti from "../../assets/icon/confetti.png";

const OrderPlaced = () => {
  return (
    <div>
      <div className={styles.titleBar}>
        <TitleBar showUserInfo={false} />
      </div>
      <div className={styles.mainContent}>
        <img src={confetti} />
        <h3>Order is placed successfully!</h3>
        <h4>You will be receiving a confirmation email with order details</h4>
        <button>Go back to Home page</button>
      </div>
    </div>
  );
};

export default OrderPlaced;
