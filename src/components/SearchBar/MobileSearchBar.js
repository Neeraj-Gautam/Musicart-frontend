import React, { useState } from "react";
import styles from "./MobileSearchBar.module.css";
import searchBarIcon from "../../assets/icon/SearchBarIcon.png";
import { useNavigate } from "react-router";

const MobileSearchBar = ({ handleMobileSearch }) => {
  const navigate = useNavigate();

  const handleChange = (event) => {
    handleMobileSearch(event.target.value);
  };

  const handleClick = (event) => {
    navigate("/home");
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.searchContainer}>
        <img src={searchBarIcon} />
        <input
          type="text"
          placeholder="Search Musicart"
          className={styles.searchBox}
          onClick={handleClick}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default MobileSearchBar;
