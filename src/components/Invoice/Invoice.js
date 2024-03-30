import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Invoice.module.css";
import { Link } from "react-router-dom";
import { Footer } from "../Footer/Footer";
import { TitleBar } from "../TitleBar/TitleBar";
import { getOrders } from "../../apis/invoice";
import invoiceImage from "../../assets/icon/invoice.png";
export const Invoice = () => {
  useEffect(() => {
    getInvoices();
  }, []);

  const [invoices, setInvoices] = useState([]);

  const getInvoices = async () => {
    try {
      const response = await getOrders();
      setInvoices(response);
      console.log(response);
    } catch (error) {}
  };

  return (
    <div>
      <Navbar />
      <TitleBar />
      <div>
        <Link
          to={`/home`}
          style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
        >
          <button className={styles.button}>Back to Home</button>
        </Link>
      </div>
      <div className={styles.invoicePage}>
        <div className={styles.myInvoices}>
          <span className={styles.heading}>My Invoices</span>
        </div>

        <div>
          {invoices.map((item, index) => (
            <div className={styles.invoices}>
              <div className={styles.userDetails}>
                <div className={styles.invoiceImage}><img src={invoiceImage} /></div>
                <div className={styles.userInfo}>
                  <p className={styles.name}>{item.name}</p> 
                  <p className={styles.address}>{item.address}</p>
                </div>
              </div>

              <div className={styles.invoiceLink}>
                <button>View Invoice</button>
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
