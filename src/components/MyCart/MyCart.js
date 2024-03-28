import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import myCart from "../../assets/icon/myCart.png";
import styles from "./MyCart.module.css";
import { getProductsFromCart } from "../../apis/checkout";
import { addProductIncart } from "../../apis/cart";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";

export const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [totalMrp, setTotalMrp] = useState(0);
  const navigate = useNavigate();
  const convenienceFee = 45;
  const maxQuantity = [];

  for (let i = 1; i <= 8; i++) {
    maxQuantity.push(i);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCart();
    } else {
      navigate("/login");
    }
  }, []);

  const addProduct = async (event, productUuid) => {
    try {
      const quantity = event.target.value;
      const cartData = await addProductIncart(productUuid, quantity);
      loadCart();
    } catch (error) {}
  };

  const loadCart = async () => {
    try {
      const response = await getProductsFromCart();
      console.log(response);
      setCart(response);
      setTotalMrp(calculateTotalMrp(response));
    } catch (error) {}
  };

  const calculateTotalMrp = (cart) => {
    try {
      console.log(cart);
      let mrp = 0;
      if (cart) {
        for (let i = 0; i < cart.length; i++) {
          mrp = mrp + (cart[i].quantity * cart[i].product.price);
        }
        return mrp;
      }
    } catch (error) {}

    return 0;
  };

  const handlePlaceOrder = () => {
    navigate("/checkout");
  }

  return (
    <div className={styles.myCart}>
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

      <div>
        <div className={styles.cartLogoAndText}>
          <img src={myCart} />
          <span>My Cart</span>
        </div>
      </div>

      <div className={styles.calculateTotalPrice}>
        <div className={styles.scrollablediv}>
          {cart &&
            cart.map((item, index) => (
              <div>
                <div className={styles.singleProduct}>
                  {/* image */}
                  <div className={styles.itemImage}>
                    <img
                      src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817607.jpg?size=626&ext=jpg"
                      alt="img"
                    />
                  </div>

                  {/* modelname & color */}
                  <div>
                    <span className={styles.itemName}>
                      {item?.product.brand} {item?.product.modelName}
                    </span>

                    <p> Colour : {item?.product.color}</p>
                    <p>In Stock</p>
                  </div>

                  {/* price */}
                  <div className={styles.itemName}>
                    <p>Price</p>
                    <p>₹{item?.product.price}</p>
                  </div>

                  {/* Quantity */}
                  <div>
                    <p className={styles.itemName}>Quantity</p>

                    <select
                      className={styles.customSelect}
                      onChange={(event) =>
                        addProduct(event, item?.product.uuid)
                      }
                    >
                      {maxQuantity.map((number, idx) => (
                        <option
                          value={number}
                          selected={item?.quantity === number}
                        >
                          {number}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Total */}
                  <div className={styles.itemName}>
                    <p>Total</p>
                    <p>₹ {item?.quantity * item?.product.price}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className={styles.priceDetails}>
          <h2>PRICE DETAILS</h2>
          <table>
            <tr>
              <td>Total MRP</td>
              <td>₹{totalMrp}</td>
            </tr>

            <tr>
              <td>Discount on MRP</td>
              <td>₹0</td>
            </tr>

            <tr>
              <td>Convenience Fee</td>
              <td>₹{convenienceFee}</td>
            </tr>
            <tr></tr>
          </table>

          <span>Total Amount ₹ {totalMrp + convenienceFee}</span>
          <br />
          <button onClick={handlePlaceOrder}>PLACE ORDER</button>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};
