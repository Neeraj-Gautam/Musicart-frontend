import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import myCart from "../../assets/icon/myCart.png";
import styles from "./MyCart.module.css";
import { getProductsFromCart } from "../../apis/checkout";
import { addProductIncart } from "../../apis/cart";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { TitleBar } from "../TitleBar/TitleBar";
import image0 from "../../assets/products/image6.png";
import backButton from "../../assets/icon/backButton.png";
import { convenienceFee } from "../../utils/constants";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { formatNumberIndianStyle } from "../../utils/UtilFunctions/util";

export const MyCart = () => {
  const [cart, setCart] = useState(null);
  const [numberOfProductInCart, setNumberOfProductInCart] = useState(0);
  const [totalMrp, setTotalMrp] = useState(0);
  const navigate = useNavigate();
  const maxQuantity = [];
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  for (let i = 1; i <= 8; i++) {
    maxQuantity.push(i);
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    if (token) {
      loadCart();
    } else {
      navigate("/login");
    }
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const addProduct = async (event, productId) => {
    try {
      const quantity = event.target.value;
      const cartData = await addProductIncart(productId, quantity);
      loadCart();
    } catch (error) {}
  };

  const loadCart = async () => {
    try {
      const response = await getProductsFromCart();
      setCart(response);
      setTotalMrp(calculateTotalMrp(response));
      setNumberOfProductInCart(countProductsInCart(response));
    } catch (error) {}
  };

  const countProductsInCart = (cartData) => {
    try {
      if (cartData) {
        let count = 0;
        for (let i = 0; i < cartData.length; i++) {
          count = count + cartData[i].quantity;
        }

        return count;
      }
    } catch (error) {}
    return 0;
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

  const handlePlaceOrder = () => {
    console.log("hi");
    navigate("/checkout");
  };

  const viewProducts = () => {
    navigate("/home");
  };

  return (
    <div className={styles.myCart}>
      <div className={styles.cartWide}>
        <div>
          <Navbar />
          <TitleBar
            currentPage="View Cart"
            showUserInfo={false}
            cartDetails={cart}
            showCartInfo={true}
          />
        </div>
        <br />
        <br />
        <div>
          <button onClick={viewProducts} className={styles.viewProducts}>
            Back to products
          </button>
        </div>
        <div>
          <div className={styles.cartLogoAndText}>
            <img src={myCart} />
            <span>My Cart</span>
          </div>
        </div>
        <hr />
        <div className={styles.calculateTotalPrice}>
          <div className={styles.scrollablediv}>
            {cart &&
              cart.map((item, index) => (
                <div>
                  <div className={styles.singleProduct}>
                    <div className={styles.itemImage}>
                      <img src={image0} />
                    </div>
                    <div>
                      <span className={styles.itemName}>
                        {item?.product.brand} {item?.product.modelName}
                      </span>

                      <p> Colour : {item?.product.color}</p>
                      <p>In Stock</p>
                    </div>
                    <div className={styles.itemName}>
                      <p>Price</p>
                      <p>₹{item?.product.price}</p>
                    </div>

                    <div>
                      <p className={styles.itemName}>Quantity</p>

                      <select
                        className={styles.customSelect}
                        onChange={(event) =>
                          addProduct(event, item?.product.productId)
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
            <div className={styles.priceInfo}>
              <span>PRICE DETAILS</span>
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
                  <td>₹{numberOfProductInCart > 0 ? convenienceFee : 0}</td>
                </tr>
              </table>
            </div>
            <div className={styles.finalAmount}>
              <table>
                <tr>
                  <td>
                    <strong>Total Amount</strong>
                  </td>
                  <td>
                    ₹
                    {totalMrp +
                      (numberOfProductInCart > 0 ? convenienceFee : 0)}
                  </td>
                </tr>
              </table>
              <button
                onClick={handlePlaceOrder}
                disabled={numberOfProductInCart == 0}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
        <hr />
        <div className={styles.totalItem}>
          <span>{numberOfProductInCart} Items</span>
          <span>₹{totalMrp}</span>
        </div>

        <Footer />
      </div>

      {viewportWidth < 768 ? (
        <div>
          <MobileSearchBar />
          <div className={styles.mobileBackButton}>
            <img src={backButton} onClick={viewProducts} />
          </div>
          <div>
            <div className={styles.mobileViewItems}>
              {cart &&
                cart.map((item, index) => (
                  <div className={styles.mobileViewItem}>
                    <div className={styles.mobileViewItemImage}>
                      <img src={image0} />
                    </div>
                    <div className={styles.mobileViewItemInfo}>
                      <p style={{ "font-size": "16px" }}>
                        {item?.product.brand} {item?.product.modelName}
                      </p>
                      <p style={{ "font-size": "18px" }}>
                        <strong>
                          ₹{formatNumberIndianStyle(item?.product.price)}{" "}
                        </strong>
                      </p>
                      <p style={{ "font-size": "14px" }}>
                        Colour : {item?.product.color}
                      </p>
                      <p style={{ "font-size": "13px" }}> In Stock</p>
                    </div>
                  </div>
                ))}

              <div className={styles.mobileViewTotalPrice}>
                <table>
                  <tr>
                    <td>Total MRP</td>
                    <td>₹{formatNumberIndianStyle(totalMrp)}</td>
                  </tr>

                  <tr>
                    <td>Discount on MRP</td>
                    <td>₹0</td>
                  </tr>

                  <tr>
                    <td>Convenience Fee</td>
                    <td>₹{numberOfProductInCart > 0 ? convenienceFee : 0}</td>
                  </tr>
                  <br />
                </table>
              </div>
            </div>
            <div className={styles.mobileViewFinalAmount}>
              <strong>Total Amount &nbsp; &nbsp;</strong>
              <strong>
                ₹
                {formatNumberIndianStyle(
                  totalMrp + (numberOfProductInCart > 0 ? convenienceFee : 0)
                )}
              </strong>
            </div>
          </div>
          <div className={styles.mobileViewPlaceOrder}>
            <button
              onClick={handlePlaceOrder}
              disabled={numberOfProductInCart == 0}
            >
              PLACE ORDER
            </button>
          </div>
          <Footer currentPage="mycart" />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
