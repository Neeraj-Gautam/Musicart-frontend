import React from "react";
import styles from "./Navbar.module.css";
import phone from "../../assets/icon/image.png";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navLogo}>
        <p>912121131313</p>
      </div>

      <div className={styles.navInfo}>
        <p>Get 50% off on selected items | Shop Now</p>
      </div>
    </div>
  );
};

export default Navbar;
