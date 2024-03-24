import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Home.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import bannerImage from "../../assets/icon/bannerImage.png";
import shoppingCart from "../../assets/icon/shoppingCart.png";
import Product from "../Products/Product";
import { Footer } from "../Footer/Footer";

export const Home = () => {
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
            <span>Invoice</span>
          </div>

          <div className={styles.navLoginCart}>
            <button>
              <img src={shoppingCart} alt="" />
              View Cart <>0</>
            </button>
          </div>
        </div>

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
