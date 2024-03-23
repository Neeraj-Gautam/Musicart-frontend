import React from "react";
import FooterCSS from "./styles/Footer.module.css";

export const Footer = () => {
    return (
        <div className={FooterCSS.footerContainer}>
        <hr />
        <p>Musicart | All rights reserved</p>
       </div>
    );
};