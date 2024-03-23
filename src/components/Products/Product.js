import React, { useState, useEffect } from "react";
import styles from "./Products.module.css";
import { allProducts } from "../../apis/products";
import image0 from "../../assets/products/image0.png";

const Product = () => {
  const [dataArray, setDataArray] = useState([]);

  useEffect(() => {
    console.log("Component has mounted");
    loadData();
  }, []);

  const loadData = async () => {
    const response = await allProducts({});
    console.log(response);
    setDataArray(response);
  };

  // return (
  //   <div>
  //     <ul>
  //       {dataArray.map((item, index) => (
  //         <div className={styles.gridContainer}>
  //           <div className={styles.container}>
  //             <div className={styles.rowContainer}>
  //               <li key={index}>
  //                 <img src={image0} alt="" />
  //               </li>
  //               <li key={index}>
  //                 {item.brand} {item.modelName}
  //               </li>
  //               <li key={index}>Price - ₹ {item.price}</li>

  //               <li key={index}>
  //                 {item.color} | {item.headPhoneType}
  //               </li>
  //               {/* <li key={index}>{item.headPhoneType}</li> */}
  //             </div>
  //           </div>
  //         </div>
  //       ))}
  //     </ul>
  //   </div>
  // );


  // return (
  //   <div>
  //     <ul>
  //       {dataArray.map((item, index) => (
  //         <li key={index} className={styles.gridItem}>
  //           <img src={image0} alt="" />
  //           <div className={styles.container}>
  //             <div className={styles.rowContainer}>
  //               <div>
  //                 {item.brand} {item.modelName}
  //               </div>
  //               <div>
  //                 Price - ₹ {item.price}
  //               </div>
  //               <div>
  //                 {item.color} | {item.headPhoneType}
  //               </div>
  //             </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  

  return (
    <div className={styles.gridContainer}>
      {dataArray.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          <img src={image0} alt="" />
          <div className={styles.container}>
            <div className={styles.rowContainer}>
              <div>
                {item.brand} {item.modelName}
              </div>
              <div>
                Price - ₹ {item.price}
              </div>
              <div>
                {item.color} | {item.headPhoneType}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  
};

export default Product;
