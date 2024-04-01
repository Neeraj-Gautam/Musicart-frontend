import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { getProductsFromCart } from "../../apis/checkout";
import { TitleBar } from "../TitleBar/TitleBar";
import { paymentMethodOptions } from "../../utils/paymentMethodOptions";
import { ADDRESS, CONVENIENCE_FEE } from "../../utils/constants";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { formatNumberIndianStyle } from "../../utils/UtilFunctions/util";
import { placeOrderForUser } from "../../apis/order";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [userName, setUserName] = useState("");
  const [totalMrp, setTotalMrp] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUserName(userName);
      loadCart();
    } else {
      navigate("/login");
    }
  }, []);

  const loadCart = async () => {
    try {
      const response = await getProductsFromCart();
      setCart(response);
      setTotalMrp(calculateTotalMrp(response));
    } catch (error) {}
  };

  const updatePaymentMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  const calculateTotalMrp = (cart) => {
    try {
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

  const viewCart = () => {
    navigate("/mycart");
  };

  const onClick = (product) => {
    setCurrentProduct(product);
  };

  const placeOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please choose one payment method!");
      return;
    }
    const placedOrder = await placeOrderForUser({
      address: ADDRESS,
      deliveryCharge: CONVENIENCE_FEE,
      paymentMethod: paymentMethod,
    });

    navigate("/successful");
    return;
  };

  return (
    <div>
      <div>
        <ToastContainer />
        <Navbar />
        <TitleBar
          currentPage="Checkout"
          showUserInfo={false}
          cartDetails={cart}
          showCartInfo={true}
        />
      </div>
      <br />
      <br />
      <div>
        <button onClick={viewCart} className={styles.viewCart}>
          Back to cart
        </button>
      </div>
      <br /> <br />
      <div className={styles.checkoutHeading}>
        <span>Checkout</span>
      </div>
      <br /> <br />
      <div className={styles.calculateTotalPrice}>
        <div className={styles.checkoutInfo}>
          <div className={styles.deliveryAddress}>
            <span className={styles.heading}>1. Delivery address</span>
            <div className={styles.deliveryAddressInput}>
              <span>{userName}</span>
              <textarea disabled>{ADDRESS}</textarea>
            </div>
          </div>
          <hr />
          <div className={styles.paymentMethod}>
            <span className={styles.heading}>2. Payment method</span>
            <select onChange={updatePaymentMethod}>
              <option value="" hidden>
                Mode of payment
              </option>
              {paymentMethodOptions.options.map((element) => (
                <option value={element.value}>{element.displayName}</option>
              ))}
            </select>
          </div>
          <hr />
          <div className={styles.review}>
            <div className={styles.reviewtext}>
              <span className={styles.heading}>
                3. Review items and delivery
              </span>
            </div>

            <div>
              <div className={styles.gridContainer}>
                {cart &&
                  cart.map((item, index) => (
                    <div key={index} className={styles.gridItem}>
                      <div className={styles.imageContainer}>
                        <img
                          src={item?.product.imageUrl}
                          className={styles.productImage}
                          onClick={() => onClick(item)}
                        />
                      </div>
                    </div>
                  ))}
              </div>
              {currentProduct && (
                <div className={styles.productInfo}>
                  <p>
                    <strong>
                      {currentProduct.product.brand}
                      &nbsp;
                      {currentProduct.product.modelName}
                    </strong>
                  </p>
                  <p style={{ color: "#797979" }}>
                    <span>Colour: {currentProduct.product.color}</span>
                    <br />
                    <span>In Stock</span>
                  </p>
                  <p>
                    <span>Estimated delivery :</span>
                    <br />
                    <span>Monday - FREE Standard Delivery</span>
                  </p>
                </div>
              )}
            </div>
          </div>
          <hr />
        </div>

        <div className={styles.invoiceCard}>
          <div className={styles.Order}>
            <button onClick={placeOrder}>
              <span>Place your order</span>
            </button>
            <p>
              By placing your order, you agree to Musicart privacy notice and
              conditions of use.
            </p>
          </div>
          <hr />
          <div className={styles.invoiceItem}>
            <strong>
              <p>Order Summary</p>
            </strong>
            <p>
              <span>Items : </span>
              <span className={styles.orderValues}>
                ₹{formatNumberIndianStyle(totalMrp)}
              </span>
            </p>

            <p>
              <span>Delivery : </span>
              <span className={styles.orderValues}>₹{CONVENIENCE_FEE}</span>
            </p>
            <hr />
            <p style={{ color: "#B52B00" }}>
              <span>
                <strong>Order Total : </strong>
              </span>
              <span className={styles.orderValuesTotal}>
                <strong>
                  ₹{formatNumberIndianStyle(totalMrp + CONVENIENCE_FEE)}
                </strong>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <button className={styles.placeYourOrder} onClick={placeOrder}>
          Place your order
        </button>
        <div className={styles.bottomBarText}>
          <span className={styles.orderTotal}>Order Total : ₹3545.00</span>
          <span>
            By placing your order, you agree to Musicart privacy notice and
            conditions of use.
          </span>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
