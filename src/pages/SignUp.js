import React, { useState } from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  const handlevalue = (e) => {
    const { value, name } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };
  const url = "http://localhost:5000/api/createuser";
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          password: credentials.password,
          email: credentials.email,
          location: credentials.geolocation,
        }),
      });
      const data = await Response.json();
      console.log(data);
      if(!data.success){
        alert("Enter valid credentials")
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
            <label htmlFor="exampleInputPassword1">Full Name</label>
            <input
              name="name"
              value={credentials.name}
              onChange={handlevalue}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Name.."
            />
          </div>
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
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
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
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Address</label>
            <input
              name="geolocation"
              value={credentials.geolocation}
              onChange={handlevalue}
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder=" Enter address here"
            />
          </div>
          <button type="submit" className="mt-3-btn btn-success">
            Submit
          </button>
          <Link to="/login" type="button" className="m-3 btn btn-danger">
            Already have User
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignUp;
