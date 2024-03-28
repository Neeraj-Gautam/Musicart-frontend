import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import { Footer } from "../Footer/Footer";

export const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ userIdentifier: "", password: "" });

  useEffect(() => {
    alreadyLoggedIn();
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
      <div className={styles.header}>
        <img src={musiCartLogo} alt="musiCartLogo" />
        <span><strong>Musicart</strong></span>
      </div>
      <div className={styles.container}>
        <div className={styles.loginForm}>
          <h1 className={styles.h1}>Sign in</h1>
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
        <hr />
        <p>New to Musicart?</p>
        <hr />
      </div>

      <div className={styles.createAccount}>
        <p className={styles.button2}>
          <span
            onClick={() => navigate("/register")}
            className={styles.underline}
          >
            Create your Musicart account
          </span>
        </p>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
