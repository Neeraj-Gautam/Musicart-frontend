import { image0 } from "../assets/products/image0.png";
import { image1 } from "../assets/products/image1.png";
import { image2 } from "../assets/products/image2.png";
import { image3 } from "../assets/products/image3.png";
import { image4 } from "../assets/products/image4.png";
import { image5 } from "../assets/products/image5.png";
import { image6 } from "../assets/products/image6.png";
import { image7 } from "../assets/products/image7.png";
import { image8 } from "../assets/products/image8.png";
import { image9 } from "../assets/products/image9.png";
import { image10 } from "../assets/products/image10.png";
import { image11 } from "../assets/products/image11.png";
import { image12 } from "../assets/products/image12.png";

const imageMap = {
    image0,
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12
  };

export const getProdcutImage = (imageId) => {
    if (imageId in imageMap) {
        // Return the corresponding image
        return imageMap[imageId];
      } else {
        // Handle the case where imageId is not found
        console.error(`Image with ID ${imageId} not found`);
        return null; // Or return a default image
      }
};
