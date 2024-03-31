import React, { useState } from "react";
import styles from "./OrderPlaced.module.css";
import { TitleBar } from "../TitleBar/TitleBar";
import { useNavigate } from "react-router";
import confetti from "../../assets/icon/confetti.png";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import { Footer } from "../Footer/Footer";

const OrderPlaced = () => {
  const navigate = useNavigate();

  const viewHomePage = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.titleBarLogo}>
          <img src={musiCartLogo} />
          <span className={styles.titleName}> Musicart </span>
        </div>
      </div>
      <div className={styles.bannerContainer}>
        <img src={confetti} />
        <span className={styles.message}>Order is placed successfully!</span>
        <span className={styles.email}>
          You will be receiving a confirmation email with order details
        </span>
        <button onClick={viewHomePage} className={styles.backButton}>
          Go back to Home page
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default OrderPlaced;
