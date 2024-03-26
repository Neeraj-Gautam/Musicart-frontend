import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { loginUser } from "../../apis/auth";

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
      <div className={styles.container}>
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
        <button onClick={handleSubmit} className={styles.button}>
          Continue
        </button>
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>

      <div className={styles.line}>
        <hr />
        <p>New to Musicart?</p>
        <hr />
      </div>

      <div>
        <p className={styles.button2}>
          <span
            onClick={() => navigate("/register")}
            className={styles.underline}
          >
            Create your Musicart account
          </span>
        </p>
      </div>
    </div>
  );
};

/*import React from "react";
import LoginSignupCSS from "./styles/LoginSignup.module.css";
export const LoginSignup = () => {
  return (
    <div className={LoginSignupCSS.loginSignup}>
      <div className={LoginSignupCSS.signInContainer}>
        <h1>Sign In</h1>
        <p>Enter your email or mobile number</p>
        <br />
        <input type="text" />
        <p>Password</p>
        <input type="password" />
        <br />
        <button>Continue</button>
        <p>
          By continuing, you agree to Musicart privacy notice and conditions of
          use.
        </p>
      </div>

      <p className="">New to Musicart?</p>
      <button>Create your Musicart account</button>
    </div>
  );
};*/

/*
import React, { useState } from 'react';

function SignInPage() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (event) => {
    event.preventDefault();
    // Here you'd handle the login logic, perhaps sending a request to your back end
    console.log('Login with:', emailOrPhone, password);
  };

  return (
    <div className="login-container">
      <h1>Sign in</h1>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="emailOrPhone">Enter your email or mobile number</label>
          <input
            type="text"
            id="emailOrPhone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Continue</button>
      </form>
      <button onClick={() => alert('Go to account creation')}>Create your Musiccart account</button>
    </div>
  );
}

export default SignInPage;
*/
