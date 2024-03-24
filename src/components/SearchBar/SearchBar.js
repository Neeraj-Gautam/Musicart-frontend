import React, { useState } from "react";
import styles from "./SearchBar.module.css";
const SearchBar = ({ placeholder, onChange }) => {
  const handleChange = (event) => {
    const { value } = event.target;
    onChange(value);
  };

  return (
    <div className={styles.searchContainer}>
      {/* <div>
        <div className={styles.searchContainer}>
          <img src={SearchBarIcon}></img>
          <input
            type="text"
            placeholder={placeholder}
            onChange={handleChange}
          />
        </div>
      </div> */}
      <svg
        stroke="currentColor"
        fill="none"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke-linecap="round"
        stroke-linejoin="round"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input type="text" placeholder={placeholder} onChange={handleChange} />
    </div>
  );
};

export default SearchBar;
