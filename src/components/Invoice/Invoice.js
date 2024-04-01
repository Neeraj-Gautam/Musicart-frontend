import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Invoice.module.css";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { getOrder } from "../../apis/order";
import { TitleBar } from "../TitleBar/TitleBar";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { formatNumberIndianStyle } from "../../utils/UtilFunctions/util";
import { TOKEN, ADDRESS, convenienceFee } from "../../utils/constants";

export const Invoice = () => {
  const { orderId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    if (token) {
      loadInvoice();
    } else {
      navigate("/login");
    }
  }, []);

  const loadInvoice = async () => {
    try {
      const response = await getOrder(orderId);
      setInvoice(response);
    } catch (error) {}
  };

  const viewMyInvoice = () => {
    navigate("/myInvoices");
  };

  const onClick = (product) => {
    setCurrentProduct(product);
  };

  return (
    <div>
      <div>
        <Navbar />
        <TitleBar
          currentPage="Invoice"
          showUserInfo={false}
          showCartInfo={false}
        />
        {/* <MobileSearchBar /> */}
      </div>
      <br />
      <br />
      <div>
        <button onClick={viewMyInvoice} className={styles.viewCart}>
          Back to Invoices
        </button>
      </div>
      <br /> <br />
      <div className={styles.checkoutHeading}>
        <span>Invoice</span>
      </div>
      <br /> <br />
      <div className={styles.calculateTotalPrice}>
        <div className={styles.checkoutInfo}>
          <div className={styles.deliveryAddress}>
            <span className={styles.heading}>1. Delivery address</span>
            <div className={styles.deliveryAddressInput}>
              <span>{invoice?.name}</span>
              <textarea disabled>{ADDRESS}</textarea>
            </div>
          </div>
          <hr />
          <div className={styles.paymentMethod}>
            <span className={styles.heading}>2. Payment method</span>
            <select disabled>
              <option value="" hidden>
                {invoice?.paymentMethod}
              </option>
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
                {invoice &&
                  invoice?.products.map((item, index) => (
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
          <div className={styles.invoiceItem}>
            <strong>
              <p>Order Summary</p>
            </strong>
            <table>
              <tr>
                <td>Items:</td>
                <td>₹{formatNumberIndianStyle(invoice?.totalItemPrice)}</td>
              </tr>

              <tr>
                <td>Delivery: </td>
                <td> ₹{invoice?.deliveryCharge}</td>
              </tr>
            </table>
            <hr />
            <p style={{ color: "#B52B00" }}>
              <span>
                <strong>
                  Order Total :
                  <span style={{ "margin-left": "80px" }}>
                    ₹
                    {formatNumberIndianStyle(
                      invoice?.totalItemPrice + invoice?.deliveryCharge
                    )}
                  </span>
                </strong>
              </span>
              <span className={styles.orderValuesTotal}>
                <strong></strong>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
