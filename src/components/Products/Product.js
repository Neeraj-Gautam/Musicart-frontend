import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { getProducts } from "../../apis/products";
import image0 from "../../assets/products/image4.png";
import { DropDownMenu } from "../DropDownMenu/DropDownMenu";
import { colorOptions } from "../../utils/colorOptions";

const Product = () => {
  const [gridView, setGridView] = useState(false);
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    console.log("Component has mounted");
    loadData();
  }, []);

  const loadData = async () => {
    const response = await getProducts({});
    console.log(response);
    setDataArray(response);
  };

  const handleGridView = () => {
    setGridView(true);
  };

  const handleListView = () => {
    setGridView(false);
  };

  const selectColor = async (color) => {
    const param = "color=" + "black";
    console.log(param);
    const response = await getProducts(param);
    console.log(response);
    setDataArray(response);
  };

  return (
    <div>
      <div className={styles.controls}>
        <button onClick={handleGridView}></button>
        <button onClick={handleListView}></button>
        <select name={colorOptions.label} onChange={selectColor}>
          <option hidden>{colorOptions.hiddenOption}</option>
          {colorOptions.options.map((element) => (
            <option value={element.value}>{element.displayName}</option>
          ))}
        </select>
      </div>

      {gridView && (
        <div className={styles.gridContainer}>
          {dataArray.map((item, index) => (
            <div key={index} className={styles.gridItem}>
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
