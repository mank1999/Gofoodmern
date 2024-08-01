import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useCart } from "./ContextReducer";
import { Flex, Select, Text, useToast } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
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
        toast({
          title: 'Item Added to Cart',
          position:'top-left',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        return;
      }
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
      <div
        className="card mt-3"
        style={{ width: "19rem", maxHeight: "360px", backgroundColor: "white" }}
      >
        <Box border="1px" borderRadius="10px">
          <img
            src={filterItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "120px", objectFit: "fill" ,padding:'5px 5px',borderRadius:'5px'} }
          />
          <div className="card-body">
            <h5 className="card-title">{filterItem.name}</h5>
            <p className="card-text">{filterItem.description}</p>
            <div className="container w-100">
              <Flex gap="8px">
                <Select
                  className="m-2 h-100 rounded "
                  width="40px"
                  height="10px"
                  onChange={(e) => setqty(e.target.value)}
                >
                  {Array.from(Array(6), (e, i) => {
                    return (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    );
                  })}
                </Select>
                <Select
                  width="50px"
                  height='10px'
                  className="m-2 h-100  rounded"
                  onChange={(e) => setSize(e.target.value)}
                  ref={priceRef}
                >
                  {priceoptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              </Flex>
              <Text alignContent='flex-end'> Price : र {finalprice}/</Text>
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
        </Box>
      </div>
    </div>
  );
};

export default Cards;
