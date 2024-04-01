import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import musiCartLogo from "../../assets/icon/musiCartLogo.png";
import { useNavigate } from "react-router";
import { registerUser } from "../../apis/auth";
import { Footer } from "../Footer/Footer";
import { Header } from "../Header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

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

  const [data, setData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!data.name || !data.mobile || !data.email || !data.password) {
      toast.error("Please fill in all fields.");
      return;
    }
    const response = await registerUser({ ...data });
    if (response && (response.status == 200 || response.status == 201)) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.name);
      navigate("/");
      return;
    }
    if (response && response.data) {
      toast.error(response.data.message);
    }
  };

  const alreadyLoggedIn = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  };

  const redirectToLoginPage = () => {
    navigate("/login");
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className={styles.container}>
        <div className={styles.registerForm}>
          <h1 className={styles.h1}>
            <strong>Create Account</strong>
            {viewportWidth < 768 ? (
              <span>. Don't have an account?</span>
            ) : (
              <></>
            )}
          </h1>
          <h2 className={styles.h2}>Your name</h2>
          <input
            className={styles.input}
            name="name"
            value={data.name}
            onChange={handleChange}
            type={"text"}
          ></input>
          <h2 className={styles.h2}>Mobile number</h2>
          <input
            className={styles.input}
            name="mobile"
            value={data.mobile}
            onChange={handleChange}
            type={"tel"}
          ></input>
          <h2 className={styles.h2}>Email Id</h2>
          <input
            className={styles.input}
            name="email"
            value={data.email}
            onChange={handleChange}
            type={"email"}
          ></input>
          <h2 className={styles.h2}>Password</h2>
          <input
            className={styles.input}
            name="password"
            value={data.password}
            onChange={handleChange}
            type={"password"}
          ></input>

          <p>
            <strong>
              {" "}
              By enrolling your mobile phone number, you consent to receive
              automated security notifications via text message from Musicart.
              Message and data rates may apply.
            </strong>
          </p>
          <button onClick={handleSubmit} className={styles.button}>
            Continue
          </button>
          <p>
            By continuing, you agree to Musicart privacy notice and conditions
            of use.
          </p>
        </div>
      </div>
      <br />
      <div className={styles.signUp}>
        <strong>
          Already have an account? &nbsp;&nbsp;
          <u onClick={redirectToLoginPage}>Sign in</u>
        </strong>
      </div>
      <br />
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Register;
