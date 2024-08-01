import React from "react";
import { useCart, useDispatch } from "../components/ContextReducer";
import { DeleteIcon} from '@chakra-ui/icons'
import { Button, Text } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
const Cart = () => {
  const url = 'https://gofoodmern-backend-cpmu.onrender.com'
  const toast = useToast();
  let data = useCart();
  let dispatch = useDispatch();
  let totalPrice = data.reduce((total, food) => total + food.price, 0);
  if (data.length === 0) {
    return (
      <div>
        <div className="m-5 w-100 tet-center fs-3">The Cart is Empty!!</div>
      </div>
    );
  }

  const handleCheckout = async() =>{
     let userEmail = localStorage.getItem('userEmail')
     let Response = await fetch(url+'/api/orderdata',{
      method : 'POST',
      headers :{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        order_data : data,
        email : userEmail,
        order_date : new Date().toISOString()
      })
     })
   if(Response.status === 200){
    dispatch({type: 'DROP'})
   }
  }
  return (
    <div className="cotaine table-responsive" style={{ padding: "30px" }}>
      <table class="table table-hover">
        <thead className="text-success fs-4">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Options</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody style={{color:'black'}}>
          {data.map((food, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{food.name}</td>
              <td>{food.qty}</td>
              <td>{food.size}</td>
              <td>{food.price}</td>
              <td>
                <button
                  type="button"
                  className="btn p-0"
                  onClick={() => {
                    dispatch({ type: "REMOVE", inde: index });
                  }}
                ><DeleteIcon color='black' /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className=" fs-4" style={{marginTop:'auto'}}>
        <Text fontSize='20px'fontWeight='500'>

        Total Price : {totalPrice} /-
        </Text>
      </div>
      <Button colorScheme="red" ml='auto' mt='20px' onClick={handleCheckout}>Checkout</Button>
    </div>

  );
};

export default Cart;
