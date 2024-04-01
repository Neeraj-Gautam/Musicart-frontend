import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import styles from "./Item.module.css";
import { getProduct } from "../../apis/products";
import { Footer } from "../Footer/Footer";
import { useParams, useLocation } from "react-router-dom";
import { addProductIncart } from "../../apis/cart";
import { useNavigate } from "react-router";
import { TitleBar } from "../TitleBar/TitleBar";
import Carousel from "../Carousel/Carousel";
import { ItemInfo } from "../Item/ItemInfo";
import MobileSearchBar from "../SearchBar/MobileSearchBar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Item = () => {
  const [cart, setCart] = useState(null);
  const { productId } = useParams();
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const [pageName, setPageName] = useState("");
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [mainImage, setMainImage] = useState(null);
  const [sideImages, setSideImages] = useState([]);

  useEffect(() => {
    loadData();
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const loadData = async () => {
    try {
      const response = await getProduct(productId);
      setItem(response);
      if (response && response.brand && response.modelName) {
        setPageName(response.brand + " " + response.modelName);
      }
      setMainImage(response.imageUrl);
      setSideImages(response.sideViewImages);
    } catch (error) {}
  };

  const addProduct = async (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    const response = await addProductIncart(productId);

    if (response.status == 204) {
      toast.error("Maximum quantity (8) reached for this product");
      return;
    }
    toast.success("Product added successfully in cart!!");
    setCart(response.data);
  };

  const handleViewcart = () => {
    navigate("/mycart");
  };

  const handleClick = (image) => {
    setMainImage(image);
  };

  return (
    <div>
      <ToastContainer />
      {viewportWidth > 768 ? (
        <div>
          <div>
            <Navbar />
            <TitleBar currentPage={pageName} cartDetails={cart} />
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
              <img src={mainImage} alt="headphone image" />
              <ItemInfo item={item} />
            </div>

            <div className={styles.smallPicsContainer}>
              <div className={styles.smallPics}>
                {item?.sideViewImages.map((sideViewImage, index) => (
                  <img
                    src={sideViewImage}
                    className={styles.sideViewImages}
                    onClick={() => {
                      handleClick(sideViewImage);
                    }}
                  />
                ))}
              </div>

              <div className={styles.cartButtons}>
                <button
                  className={styles.addToCart}
                  onClick={() => addProduct(item.productId)}
                >
                  Add to cart
                </button>
                <button className={styles.buyNow} onClick={handleViewcart}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <br />
          <br />
        </div>
      ) : (
        <div>
          <MobileSearchBar />
          <div className={styles.mainMobileElement}>
            <div className={styles.carousel}>
              <Carousel images={sideImages} />
            </div>
            <ItemInfo item={item} />
            <div className={styles.mobileButtons}>
              <button
                className={styles.addToCart}
                onClick={() => addProduct(item.productId)}
              >
                Add to cart
              </button>
              <button className={styles.buyNow} onClick={handleViewcart}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};
