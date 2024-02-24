import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import Cards from "../components/Cards";
import Carousel from "../components/Carousel";


const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Carousel/>
      </div>
      <div className="m-3">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
