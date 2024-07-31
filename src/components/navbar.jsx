import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "./Modal";
import Cart from "../pages/Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
  let data = useCart();
  const navigate = useNavigate();
  const handlrLogout = () => {
    sessionStorage.removeItem("authToken");
    navigate("/login");
  };
  const [modalView, setModalView] = useState(false);
  return (
    <>
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-success"
        style={{ backgroundColor: "green" }}
      >
        <div className="container-fluid ">
          <Link className="navbar-brand fs-1 fst-italic mt-2" to="/">
            GO FOOD
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mt-2 gap-2">
              <li className="nav-item">
                <Link
                  className="text-white fs-5 mt-6"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>

              {sessionStorage.getItem("authToken") ? (
                <Link className="text-white fs-5" aria-current="page" to="/myorder">
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </ul>
            <div style={{ justifyContent: "right" }}>
              {!sessionStorage.getItem("authToken") ? (
                <div className="d-flex">
                  <Link
                    className="btn bg-white text-success mx-1 fs-5"
                    to="/login"
                  >
                    LogIn
                  </Link>
                  <Link
                    className="btn bg-white text-success mx-1 fs-5"
                    aria-current="page"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </div>
              ) : (
                <>
                  <div className="btn bg-white text-success mx-1 fs-5" onClick={()=>{setModalView(true)}}>
                    My Cart <span className="badge bg-danger">{data.length}</span>
                  </div>
                  {modalView ? <Modal onClose={()=>{setModalView(false)}}> <Cart/></Modal> : null}
                  <div
                    className="btn bg-white text-danger mx-1 fs-5"
                    onClick={handlrLogout}
                  >
                    LogOut
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
