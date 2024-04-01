import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./MyInvoices.module.css";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { TitleBar } from "../TitleBar/TitleBar";
import { getOrders } from "../../apis/invoice";
import invoiceImage from "../../assets/icon/invoice.png";
import invoiceImageHeader from "../../assets/icon/myInvoice.png";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { useNavigate } from "react-router";

export const MyInvoices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    getInvoices();
  }, []);

  const viewHome = () => {
    navigate("/home");
  };

  const viewInvoice = (orderId) => {
    navigate(`/invoice/${orderId}`);
  };

  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await getOrders();
      setInvoices(response);
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <TitleBar />
      <MobileSearchBar />
      <div>
        <button onClick={viewHome} className={styles.button}>
          Back to Home
        </button>
      </div>
      <div className={styles.invoicePage}>
        <div className={styles.myInvoices}>
          <img src={invoiceImageHeader} className={styles.headingImage} />
          &nbsp;My Invoices
        </div>

        <div>
          {invoices.map((item, index) => (
            <div className={styles.invoices}>
              <div className={styles.userDetails}>
                <div className={styles.invoiceImage}>
                  <img src={invoiceImage} />
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.name}>{item.name}</p>
                  <p className={styles.address}>{item.address}</p>
                </div>
              </div>

              <div className={styles.invoiceLink}>
                <button
                  onClick={() => {
                    viewInvoice(item._id);
                  }}
                >
                  View Invoice
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
