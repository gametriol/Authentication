import React, { useState } from "react";
import Input from "./Input";
import Form from "./Form";
import { Link } from "react-router-dom";

function SignUP() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
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
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
      setUserData(()=>({
        username:'',
        email:'',
        password:''
      }))
    } else {
      const errorData = await response.json();
      alert(errorData.error); 
    }
  }

  return (
    <div className="container">
      <h1>Sign Up</h1>
      <form id="signUpForm" onSubmit={handleSubmit} method="POST">
        <Form label="Username:">
          <Input
            type="text"
            id="username"
            name="username"
            value={userData.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </Form>
        <Form label="Email:">
          <Input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
        </Form>
        <Form label="New Password:">
          <Input
            type="password"
            id="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            placeholder="Create Your Password"
            required
          />
        </Form>
        {/* <Form label="Confirm Password:">
                    <Input type="password" id="confirmPassword" name="confirmPassword" placeholder="Rewrite Your Password" required />
                </Form> */}
        <button type="submit">Sign Up</button>
        <div class="already">
          <Link to="/Login">
            <p>Already Have an Account?</p>
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignUP;
