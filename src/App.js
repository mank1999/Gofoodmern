import React from "react";
import Home from "./pages/Home";
import Login from "./pages/login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css"; //npm i bootstrap-dark-5 boostrap
import SignUp from "./pages/SignUp";
import { CartProvider } from "./components/ContextReducer";
import Cart from "./pages/Cart";
import Myorder from "./pages/Myorder";

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createuser" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorder" element={<Myorder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
