import React from "react";
import Slider from "react-slick";
import styles from "./Carousel.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {images.map((cImage, index) => (
        <div className={styles.carouselElement}>
          <img src={cImage} alt="Image" className={styles.carouselImage} />
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
