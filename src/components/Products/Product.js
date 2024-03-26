import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./Products.module.css";
import { getProducts } from "../../apis/products";
import image0 from "../../assets/products/image9.png";
import cartImage from "../../assets/icon/cartImage.png";
import { colorOptions } from "../../utils/colorOptions";
import { HeadphoneTypeOptions } from "../../utils/HeadphoneTypeOptions";
import { companyOptions } from "../../utils/companyOptions";
import { PriceOptions } from "../../utils/PriceOptions";
import { SortOptions } from "../../utils/SortOptions";
import SearchBar from "../SearchBar/SearchBar";
import listViewRounded from "../../assets/icon/list-view-rounded.png";
import gridViewRounded from "../../assets/icon/grid-view-rounded.png";

const Product = ({cart, handleCartChange}) => {
  const [gridView, setGridView] = useState(true);
  const [dataArray, setDataArray] = useState([]);
  const [color, setColor] = useState("");
  const [company, setCompany] = useState("");
  const [headPhoneType, setHeadPhoneType] = useState("");
  const [price, setPrice] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("");
  const [search, setSearch] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(token) {
      setLoggedIn(true);
    }
    loadData();
  }, [color, company, headPhoneType, price, sortBy, sortType, search]);

  const loadData = async () => {
    let params = "";

    if (headPhoneType) {
      params += "headPhoneType=" + headPhoneType + "&";
    }
    if (color) {
      params += "color=" + color + "&";
    }
    if (company) {
      params += "company=" + company + "&";
    }

    if (price) {
      params += "price=" + price + "&";
    }

    if (sortBy) {
      params += "sortBy=" + sortBy + "&";
    }

    if (sortType) {
      params += "sortType=" + sortType + "&";
    }
    if (search) {
      params += "search=" + search + "&";
    }

    console.log(params);
    const response = await getProducts(params);
    setDataArray(response);
  };

  const handleGridView = () => {
    setGridView(true);
  };

  const handleListView = () => {
    setGridView(false);
  };

  const selectHeadphoneType = (event) => {
    setHeadPhoneType(event.target.value);
  };

  const selectColor = (event) => {
    setColor(event.target.value);
  };

  const selectCompany = (event) => {
    setCompany(event.target.value);
  };

  const selectPrice = (event) => {
    setPrice(event.target.value);
  };

  const handleSearch = (value) => {
    console.log(value);
    setSearch(value);
  };

  const handleSorting = (event) => {
    const val = event.target.value;
    const sortOption = JSON.parse(val);
    setSortBy(sortOption.sortBy);
    setSortType(sortOption.sortType);
  };

  return (
    <div>
      <div>
        <SearchBar
          onChange={handleSearch}
          placeholder="Search By Product Name"
        />
      </div>
      <div className={styles.controls}>
        <div className={styles.views}>
          <button onClick={handleGridView}>
            <img src={gridViewRounded}></img>
          </button>
          <button onClick={handleListView}>
            <img src={listViewRounded}></img>
          </button>
        </div>
        <div className={styles.genre}>
          <select name={headPhoneType.label} onChange={selectHeadphoneType}>
            <option value="headPhoneType" hidden>
              Headphone type
            </option>
            {HeadphoneTypeOptions.options.map((element) => (
              <option value={element.value}>{element.displayName}</option>
            ))}
          </select>
          <select name={companyOptions.label} onChange={selectCompany}>
            <option value="company" hidden>
              Company
            </option>
            {companyOptions.options.map((element) => (
              <option value={element.value}>{element.displayName}</option>
            ))}
          </select>
          <select name={colorOptions.label} onChange={selectColor}>
            <option value="color" hidden>
              Color
            </option>
            {colorOptions.options.map((element) => (
              <option value={element.value}>{element.displayName}</option>
            ))}
          </select>
          <select name={PriceOptions.label} onChange={selectPrice}>
            <option value="price" hidden>
              Price
            </option>
            {PriceOptions.options.map((element) => (
              <option value={element.value}>{element.displayName}</option>
            ))}
          </select>
        </div>

        <div className={styles.sortBy}>
          <select name={SortOptions.label} onChange={handleSorting}>
            <option value="sortType" hidden>
              Sort by :Featured
            </option>
            {SortOptions.options.map((element) => (
              <option value={JSON.stringify(element.value)}>
                {element.displayName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {gridView && (
        <div className={styles.gridContainer}>
          {dataArray.map((item, index) => (
            <div key={index} className={styles.gridItem}>
              <div className={styles.imageContainer}>
                <Link
                  to={`/item/${item.uuid}`}
                  state={{ item: item }}
                  style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
                >
                  <img src={image0} alt="" />
                </Link>
                {loggedIn && (<button
                  className={styles.overlayButton}
                  onClick={() => handleCartChange(item.uuid)}
                >
                  <img src={cartImage} alt="Description of the image" />
                </button>)}
              </div>
              <div className={styles.container}>
                <div className={styles.rowContainer}>
                  <div>
                    {item.brand} {item.modelName}
                  </div>
                  <div>Price - ₹ {item.price}</div>
                  <div>
                    {item.color} | {item.headPhoneType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!gridView && (
        <div className={styles.listContainer}>
          {dataArray.map((item, index) => (
            <div className={styles.listItem}>
              <img src={image0} alt="" />
              <div classNane={styles.listItemInfo}>
                <div>
                  {item.brand} {item.modelName}
                </div>
                <div>Price - ₹ {item.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

{
  /* <div key={index} className={styles.listItem}>
              <img src={image0} alt="" />
              <div className={styles.container}>
                <div className={styles.rowContainer}>
                  <div>
                    {item.brand} {item.modelName}
                  </div>
                  <div>Price - ₹ {item.price}</div>
                  <div>
                    {item.color} | {item.headPhoneType}
                  </div>
                </div>
              </div>
            </div> */
}

export default Product;
