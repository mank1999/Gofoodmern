import React from "react";
import { Link } from "react-router-dom";
const Cards = () => {
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src="https://media.post.rvohealth.io/wp-content/uploads/2022/09/frozen-dinner-meal-meatloaf-mashed-potatoes-vegetables-732x549-thumbnail-732x549.jpg"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to="/" className="btn btn-primary">
            Go somewhere
          </Link>
          <div className="container w-100">
            <select className="m-2 h-100 rounded ">
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select className="m-2 h-100  rounded">
              <option key={1} value={"half"}>
                Half
              </option>
              <option key={2} value={"Full"}>
                Full
              </option>
            </select>
            <div className="d-inline h-100 fs-5"> Total Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
