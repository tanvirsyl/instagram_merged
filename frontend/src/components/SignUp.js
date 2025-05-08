import React, { useState } from "react";
import logo from "../img/logo.png";
import "./SignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import config from "../config";

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid email format.");
      return;
    } else if (!passRegex.test(password)) {
      notifyA(
        "Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }

    fetch(`${config.apiUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, userName, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message);
          navigate("/signin");
        }
        console.log(data);
      })
      .catch((err) => {
        console.error("Signup Error:", err);
        notifyA("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src={logo} alt="App Logo" />
          <p className="loginPara">
            Sign up to see photos and videos from your friends.
          </p>

          <div className="signup-divider">
            <span>REGISTER WITH EMAIL</span>
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <p className="terms-text">
            By signing up, you agree to our Terms, Privacy Policy, and Cookies Policy.
          </p>

          <button
            type="submit"
            id="submit-btn"
            onClick={postData}
            disabled={!email || !name || !userName || !password}
          >
            Sign Up
          </button>
        </div>

        <div className="form2">
          Already have an account?{" "}
          <Link to="/signin">
            <span className="sign-in-link">Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
