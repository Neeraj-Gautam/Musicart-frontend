import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router";
import { Footer } from "../Footer/Footer";
import { registerUser } from "../../apis/auth";

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    alreadyLoggedIn();
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
      alert("Please fill in all fields.");
      return;
    }
    const response = await registerUser({ ...data });
    if (response) {
      localStorage.setItem("token", response.token);
      localStorage.setItem("userName", response.name);
      navigate("/");
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
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <h1 className={styles.h1}>Create an account</h1>
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
        <br />
        <br />
        <p>
          By enrolling your mobile phone number, you consent to receive
          automated security notifications via text message from Musicart.
          Message and data rates may apply.
        </p>
        <button onClick={handleSubmit} className={styles.button}>
          Continue
        </button>
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>
    </div>
  );
};

export default Register;
