import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const url = "http://localhost:5000/api/userlogin";
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    try {
      const Response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          email: credentials.email,
        }),
      });
      const data = await Response.json();
      console.log(data);
      if (!data.success) {
        alert("enter valid credentils");
      }
      if (data.success) {
        localStorage.setItem("authToken", data.authToken);
        localStorage.setItem("userEmail", credentials.email);

        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              name="email"
              onChange={handlevalue}
              value={credentials.email}
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              name="password"
              onChange={handlevalue}
              value={credentials.password}
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="mt-3-btn btn-success">
            Submit
          </button>
          <Link to="/createuser" type="button" className="m-3 btn btn-danger">
            Register Here
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
