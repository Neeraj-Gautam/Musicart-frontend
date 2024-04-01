import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import phone from "../../assets/icon/phone.png";
import { logout } from "../../utils/UtilFunctions/util";
import { TOKEN } from "../../utils/constants";
import { useNavigate } from "react-router";

const Navbar = ({ showLogoutOption }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    window.location.reload();
  };

  const handleLogIn = () => {
    setLoggedIn(false);
    navigate("/login");
  };

  const handleSignup = () => {
    setLoggedIn(false);
    navigate("/register");
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
        {!loggedIn && (
          <div className={styles.logout}>
            <p onClick={handleLogIn}> Login |</p>
            <p onClick={handleSignup}> &nbsp;Signup</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
