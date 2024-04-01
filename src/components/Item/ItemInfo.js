import React, { useState, useEffect } from "react";
import styles from "./Item.module.css";
import Star from "../Star";

export const ItemInfo = ({ item }) => {
  const getCustomerReviewCount = (noOfCustomerReviews) => {
    return `(${noOfCustomerReviews} Customer reviews)`;
  };
  return (
    <div>
      <div className={styles.info}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{ fontWeight: "bold", fontSize: "20px", marginTop: "5px" }}
          >
            {item?.brand} {item?.modelName}
          </div>
          <Star
            stars={item?.stars}
            additionalText={getCustomerReviewCount(item?.noOfCustomerReviews)}
          />
          <div style={{ fontWeight: "bold" }}>Price - ₹ {item?.price}</div>
          <div style={{ fontWeight: "bold" }}>
            {item?.color} | {item?.headPhoneType}
          </div>
          <br />
          About this item
          <ul>
            {item?.about.map((aboutItem, index) => (
              <li key={index}>{aboutItem}</li>
            ))}
          </ul>
          <div>
            <span>
              <span>
                <strong>Available</strong>
              </span>
              - In stock
            </span>
            <br />
            <span>
              <span>
                <strong>Brand</strong>
              </span>
              &nbsp;-&nbsp;{item?.brand}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
