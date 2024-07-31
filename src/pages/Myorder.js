import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
const Myorder = () => {
  const [myOrders, setMyOrders] = useState([]);
  const URL = "http://localhost:5000"
  const fetchMyOrder = async () => {
    try {
      let url = URL + "/api/myorderdata";
      let response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: sessionStorage.getItem("userEmail") }),
      });
      response = await response.json();
      await setMyOrders(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMyOrder();
  }, []);
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div>
        {Array(myOrders).map((data) => {
          return data.order_data.map((item) => {
            return item.map((subitem) => {
              return <div key={subitem[0].Order_date}>{subitem[0].Order_date}</div>;
            });
          });
        })}
      </div>
    </>
  );
};

export default Myorder;
