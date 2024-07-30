import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

import Cards from "../components/Cards";
import Carousel from "../components/Carousel";

const Home = () => {
  const [foodCatg, setFoodCatg] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search,setSearch] = useState("");
  const loadData = async () => {
    let url = "http://localhost:5000/api/foodData";
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    console.log(response.fooddata[0]);
    setFoodCatg(response.foodCatg);
    setFoodItem(response.fooddata);
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Navbar  />
      <div>
        <Carousel setSearch={setSearch} search={search}/>
      </div>
      <div className="container">
        {foodCatg !== [] ? (
          foodCatg.map((data) => (
            <div className=" row mb-3">
              <div key={data.CategoryName} className="fs-3 m-3">
                {data.CategoryName}
              </div>
              <hr />
              {foodItem !== []
                ? foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name
                          .toLowerCase()
                          .includes(search.toLocaleLowerCase())
                    )
                    .map((filterItem) => (
                      <div
                        key={filterItem._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        {" "}
                        <Cards
                        filterItem= {filterItem}
                          
                          options={filterItem.options[0]}
                        />
                      </div>
                    ))
                : ""}
            </div>
          ))
        ) : (
          <div> No such data found </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
