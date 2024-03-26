import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import myCart from "../../assets/icon/myCart.png";
import styles from "./MyCart.module.css";
import { getProductsFromCart } from "../../apis/checkout";

export const MyCart = () => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const response = await getProductsFromCart();
      setCart(response);
      console.log(response);
    } catch (error) {}
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <br />
      <br />
      <div>
        <Link
          to={`/home`}
          style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
        >
          <button className={styles.button}>Back to products</button>
        </Link>
      </div>

      {cart.map((item, index) => (
        <div>{item.quantity}</div>
      ))}

      <div>
        <div className={styles.cartLogoAndText}>
          <img src={myCart} />
          <span>My Cart</span>
        </div>
      </div>

      <div>
        <div>
          <img />
        </div>
        <div></div>
        <div>
          <p>Price</p>
        </div>
        <div>
          <p>Quantity</p>
        </div>
        <div>
          <p>Total</p>
        </div>
      </div>
    </div>
  );
};
