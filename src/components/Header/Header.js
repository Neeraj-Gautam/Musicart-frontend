import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";

export const Header = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className={styles.header}>
        <img src={musiCartLogo} />
        <span>Musicart</span>
      </div>
      {viewportWidth < 768 ? (
        <p className={styles.mobileHeader}> &nbsp;Welcome</p>
      ) : (
        <></>
      )}
    </>
  );
};
