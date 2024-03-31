import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import searchBarIcon from "../../assets/icon/SearchBarIcon.png";

const SearchBar = ({ placeholder, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={styles.searchContainer}>
      <img src={searchBarIcon} />
      <input type="text" placeholder={placeholder} className={styles.searchBox} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
