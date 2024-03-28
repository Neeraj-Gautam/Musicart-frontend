import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Checkout.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { getProductsFromCart } from "../../apis/checkout";

export const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [totalMrp, setTotalMrp] = useState(0);
  const navigate = useNavigate();
  const convenienceFee = 45;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loadCart();
    } else {
      navigate("/login");
    }
  }, []);

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
          mrp = mrp + cart[i].quantity * cart[i].product.price;
        }
        return mrp;
      }
    } catch (error) {}

    return 0;
  };

  return (
    <div>
      <div>
        <Navbar />;
      </div>
      <br />
      <br />
      <div>
        <Link
          to={`/mycart`}
          style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
        >
          <button className={styles.button}>Back to cart</button>
        </Link>
      </div>

      <div className={styles.checkoutHeading}>
        <span>Checkout</span>
      </div>

      <div className={styles.calculateTotalPrice}>
        <div className={styles.checkoutInfo}>
          <div className={styles.deliveryAddress}>
            <p className={styles.heading}>1. Delivery address</p>
            <div>
              <p>Akash Patel</p>
              <textarea>104 kk hh nagar, Lucknow Uttar Pradesh 226025</textarea>
            </div>
          </div>

          <div className={styles.paymentMethod}>
            <p className={styles.heading}>2. Payment method</p>
            <select>
              <option value="Mode of payment" disabled selected>
                Mode of payment
              </option>
              <option value="option1">Pay on Delivery</option>
              <option value="option2">UPI</option>
              <option value="option3">Card</option>
            </select>
          </div>

          <div className={styles.paymentMethod}>
            <p className={styles.heading}>3. Review items and delivery</p>
            {/* dummy data */}
            <select>
              <option value="Mode of payment" disabled selected>
                Mode of payment
              </option>
              <option value="option1">Pay on Delivery</option>
              <option value="option2">UPI</option>
              <option value="option3">Card</option>
            </select>
          </div>
        </div>

        <div className={styles.invoiceCard}>
          <div className={styles.orderButton}>
            <button>Place your order</button>
            <p>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
          </div>
          <hr />
          <div className={styles.invoiceItem}>
            <p>Order Summary</p>
            <p>
              <span>Items : </span>
              <span>₹3500.00</span>
            </p>

            <p>
              <span>Delivery : </span>
              <span>₹45.00</span>
            </p>
            <hr />
            <p>
              <strong>Order Total : </strong>
              <strong>₹3545.00</strong>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <button className={styles.placeYourOrder}>Place your order</button>
        <div>
          <p className={styles.orderTotal}>Order Total : ₹3545.00</p>
          <p>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </p>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};
