import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginMail, setLoginMail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleCreateAcc = () => {
    fetch("http://localhost:5000/signup", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application.json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        loginMail,
        loginPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="App">
      <div className="content-container">
        <div className="signup-sec">
          <div className="sec-title-container">
            <span className="title">MERN Stack Authentication</span>
          </div>

          <form className="signup-form-container">
            <label>Enter your Name</label>
            <input
              type="text"
              placeholder="Full Name"
              className="input-box"
              onChange={(e) => setName(e.target.value)}
            />

            <label>Enter Email</label>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Set Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input-box"
              onChange={(e) => setPassword(e.target.value)}
            />
          </form>

          <button className="btn" onClick={handleCreateAcc}>
            Create Account
          </button>
        </div>
        <div className="login-sec">
          <div className="sec-title"></div>

          <form className="signup-form-container">
            <label>Email</label>
            <input
              type="text"
              placeholder="Email"
              className="input-box"
              onChange={(e) => setLoginMail(e.target.value)}
            />

            <label>Password</label>
            <input
              type="text"
              placeholder="Password"
              className="input-box"
              onChange={(e) => setLoginPassword(e.target.value)}
            />

            <button className="btn" onClick={handleLogin}>
              Log In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
