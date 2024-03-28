import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Item.module.css";
import { getProduct } from "../../apis/products";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import image from "../../assets/products/Group 22.png";
import Star from "../Star";
import { addProductIncart } from "../../apis/cart";
import { useNavigate } from "react-router";

export const Item = () => {
  const { uuid } = useParams();
  const [item, setItem] = useState();
  const navigate = useNavigate();

  const imageSrc =
    "https://ih1.redbubble.net/image.4647705481.2735/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg";

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await getProduct(uuid);
      setItem(response.item);
    } catch (error) {}
  };

  const addProduct = async (productUuid) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const cartData = await addProductIncart(productUuid);
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <br />
      <br />
      <div className={styles.itemView}>
        <Link
          to={`/home`}
          style={{ color: "#FFF", backgroundColor: "var(--dark-pink)" }}
        >
          <button className={styles.button}>Back to products</button>
        </Link>

        <div className={styles.fullName}>{item?.fullName}</div>

        <div className={styles.mainContent}>
          <img className={styles.image} src={image} alt="headphone image" />

          <div>
            <div className={styles.info}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontWeight: "bold" }}>
                  {item?.brand} {item?.modelName}
                </div>
                <Star stars={item?.stars} />
                <div style={{ fontWeight: "bold" }}>
                  Price - ₹ {item?.price}
                </div>
                <div style={{ fontWeight: "bold" }}>
                  {item?.color} | {item?.headPhoneType}
                </div>
                About this item
                <ul>
                  {item?.about.map((aboutItem, index) => (
                    <li key={index}>{aboutItem}</li>
                  ))}
                </ul>
                <div>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Available</span> - In
                    stock
                  </p>
                  <p>
                    <span style={{ fontWeight: "bold" }}>Brand</span> -{" "}
                    {item?.brand}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div>
            <img src="https://www.researchgate.net/profile/Pablo-Caballero-2/publication/328101815/figure/fig18/AS:678371704987657@1538747826575/The-sample-clean-image-200X200-pixels.ppm" />
            <img src="https://www.researchgate.net/profile/Pablo-Caballero-2/publication/328101815/figure/fig18/AS:678371704987657@1538747826575/The-sample-clean-image-200X200-pixels.ppm" />
            <img src="https://www.researchgate.net/profile/Pablo-Caballero-2/publication/328101815/figure/fig18/AS:678371704987657@1538747826575/The-sample-clean-image-200X200-pixels.ppm" />
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.addToCart}
              onClick={() => addProduct(item.uuid)}
            >
              Add to cart
            </button>
            <button className={styles.buyNow}>Buy Now</button>
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

// return (
//   <div>
//     <Navbar />

//     <button className={styles.button}>Back to products</button>

//     <div className={styles.fullName}>{item?.fullName}</div>

//     <div className={styles.mainContent}>
//       <img
//         className={styles.image}
//         src="https://ih1.redbubble.net/image.4647705481.2735/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.jpg"
//         alt="headphone image"
//       />

//       <div className={styles.productDetails}>
//         <h2>{item?.brand} {item?.modelName}</h2>
//         <p>{item?.stars}</p>
//         <p>Price - ₹ {item?.price}</p>
//         <p>{item?.brand} | {item?.headPhoneType}</p>

//         <div>
//           <h3>About this item</h3>
//           <ul>
//             <li>Sony’s lightest Wireless Noise-cancelling headband ever</li>
//             <li>Up to 50-hour battery life with quick charging (3 min charge for up to 1 hour of playback)</li>
//             <li>Multi-Point Connection helps to pair with two Bluetooth devices at the same time</li>
//             <li>Take noise cancelling to the next level with Sony’s Integrated Processor V1, so you can fully immerse yourself in the music</li>
//             <li>Super comfortable and lightweight design (192 Grams)</li>
//             <li>High sound quality and well-balanced sound tuning</li>
//           </ul>
//           <p><span className={styles.boldText}>Available</span> - In stock</p>
//           <p><span className={styles.boldText}>Brand</span> - {item?.brand}</p>
//         </div>
//       </div>
//     </div>

//     <Footer />
//   </div>
// );

/* {item?.modelName} */
