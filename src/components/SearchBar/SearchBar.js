import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchBarIcon from "../../assets/icon/SearchBarIcon.png";
const SearchBar = ({ placeholder, data }) => {
  // const [filteredData, setFilteredData] = useState(data);
  // const [wordEntered, setWordEntered] = useState("");

  // const handleFilter = (event) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   const newFilter = data.filter((value) => {
  //     return value.title.toLowerCase().includes(searchWord.toLowerCase());
  //   });

  //   if (searchWord === "") {
  //     setFilteredData(data);
  //   } else {
  //     setFilteredData(newFilter);
  //   }
  // };

  {
    /* <div class="search-container">
  <input type="text" placeholder="Search...">
  <i class="fas fa-search search-icon"></i>
</div> */
  }

  return (
    <div>
      <div>
        {/* <input
          className={styles.searchContainer}
          type="text"
          placeholder="Search by Product Name"
        /> */}

        <div className={styles.searchContainer}>
          <img src={SearchBarIcon}></img>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by Product Name"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
