import React from "react";
import styles from "./Successful.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import confetti from "../../assets/icon/confetti.png";
import { Footer } from "../Footer/Footer";

const Successful = () => {
  return (
    <div>
      <div></div>
      <div className={styles.box}>
        <div className={styles.content}>
          <img src={confetti} alt="SuccessfullPic" />
          <p>Order is placed successfully!</p>
          You will be receiving a confirmation email with order details
          <br />
          <button>Go back to Home page</button>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Successful;
