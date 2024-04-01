import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import line from "../../assets/icon/Line.png";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (!data || !data.userIdentifier || !data.password) {
      toast.error("Please fill all the fields");
      return;
    }
    const response = await loginUser({ ...data });

    if (response && (response.status == 200 || response.status == 201)) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);
      navigate("/home", { state: { user: response.data } });
      return;
    }

    if (response && response.data) {
      toast.error(response.data.message);
    }
  };

  const alreadyLoggedIn = () => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      navigate("/home");
    }
  };

  return (
    <div>
      <ToastContainer />
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
