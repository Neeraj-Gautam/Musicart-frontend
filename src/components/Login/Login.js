import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import line from "../../assets/icon/Line.png";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ userIdentifier: "", password: "" });
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    alreadyLoggedIn();
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await loginUser({ ...data });

    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.name);
      navigate("/home", { state: { user: response } });
    }
  };

  const alreadyLoggedIn = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    console.log("token", userName);
    if (token && userName) {
      navigate("/home");
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.loginForm}>
          <h1 className={styles.h1}>
            <strong>Sign in</strong>
            {viewportWidth < 768 ? <span>. Already a customer</span> : <></>}
          </h1>
          <h2 className={styles.h2}>Enter your email or mobile number</h2>
          <input
            className={styles.input}
            name="userIdentifier"
            value={data.userIdentifier}
            onChange={handleChange}
            type={"userIdentifier"}
          ></input>
          <h2 className={styles.h2}>Password</h2>
          <input
            className={styles.input}
            name="password"
            value={data.password}
            onChange={handleChange}
            type={"password"}
          ></input>
          <br />
          <br />
          <button onClick={handleSubmit} className={styles.button}>
            Continue
          </button>
          <p>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </div>
      <div className={styles.line}>
        <img src={line} />
        <span>&nbsp;&nbsp;&nbsp;New to Musicart? &nbsp;&nbsp;&nbsp;</span>
        <img src={line} />
      </div>

      <div className={styles.createAccount}>
        <button onClick={() => navigate("/register")}>
          Create your Musicart account
        </button>
      </div>
      <br />
      <br />
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};
