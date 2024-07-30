import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useCart } from "./ContextReducer";
import { useToast } from "@chakra-ui/react";
const Cards = ({ filterItem, options }) => {
  const toast = useToast();
  let Sdata = useCart();
  let dispatch = useDispatch();
  let option = options;
  let priceRef = useRef();
  let priceoptions = Object.keys(option);
  const [qty, setqty] = useState(1);
  const [size, setSize] = useState("");
  const handlrAddToCarty = async () => {
    let food = [];

    for (const item of Sdata) {
      if (item.id === filterItem._id) {
        food = item;
        break;
      }
    }
    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: filterItem._id,
          price: finalprice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: filterItem._id,
          name: filterItem.name,
          price: finalprice,
          qty: qty,
          size: size,
        });
        return;
      }
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    await dispatch({
      type: "ADD",
      id: filterItem._id,
      name: filterItem.name,
      price: finalprice,
      qty: qty,
      size: size,
    });
  };
  let finalprice = qty * parseInt(option[size]) || 0;
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);
  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={filterItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{filterItem.name}</h5>
          <p className="card-text">{filterItem.description}</p>
          <div className="container w-100">
            <select
              className="m-2 h-100 rounded "
              onChange={(e) => setqty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100  rounded"
              onChange={(e) => setSize(e.target.value)}
              ref={priceRef}
            >
              {priceoptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5"> र {finalprice}/-</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={handlrAddToCarty}
            >
              {" "}
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
