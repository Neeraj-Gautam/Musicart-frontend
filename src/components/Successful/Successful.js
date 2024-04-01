import React from "react";
import styles from "./Successful.module.css";
import confetti from "../../assets/icon/confetti.png";
import { Footer } from "../Footer/Footer";
import { useNavigate } from "react-router";
import musicartLogo from "../../assets/icon/musiCartLogo.png";

const Successful = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate("/home");
  };
  return (
    <div>
      <div className={styles.musicartLogo}>
        <img src={musicartLogo} /> <span>&nbsp;Musicart</span>
      </div>
      <div className={styles.box}>
        <div className={styles.content}>
          <img src={confetti} alt="SuccessfullPic" />
          <p style={{ "font-size": "20px" }}>Order is placed successfully!</p>
          <p style={{ color: "#969696", "font-size": "15px" }}>
            You will be receiving a confirmation email with order details
          </p>
          <br />
          <button onClick={onClick}>
            <span
              style={{
                color: "#FFFFFF",
                "font-size": "15px",
                "margin-bottom": "50px",
              }}
            >
              Go back to Home page
            </span>
          </button>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Successful;
