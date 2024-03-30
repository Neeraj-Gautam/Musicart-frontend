import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import phone from "../../assets/icon/phone.png";
import { logout, isUserLoggedIn } from "../../utils/UtilFunctions/util";

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(isUserLoggedIn());
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.reload();
  };

  return (
    <div>
      <div className={styles.navbar}>
        <div className={styles.navPhone}>
          <img src={phone}></img>
          <p>9763542854</p>
        </div>

        <div className={styles.navInfo}>
          <p>Get 50% off on selected items | Shop Now</p>
        </div>

        {loggedIn && (
          <div className={styles.logout}>
            <p onClick={handleLogout}> Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
