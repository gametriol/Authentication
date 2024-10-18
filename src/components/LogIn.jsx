import React, { useState } from "react";
import Input from "./Input";
import Form from "./Form";
import { Link } from "react-router-dom";

function LogIn() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      alert("Success");
    } else {
      alert("Bhag Bhosadike");
    }
  }

  return (
    <div className="container">
      <h1>Log In</h1>
      <form id="logInForm" onSubmit={handleSubmit} method="POST">
        <Form label="Username">
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="Your Username"
            value={userData.username}
            onChange={handleChange}
          ></Input>
        </Form>
        <Form label="Password">
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            value={userData.password}
            onChange={handleChange}
          ></Input>
        </Form>
        <button type="submit">Log In</button>
        <div className="already">
          <Link to="/">
            <p>Create an Account?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
