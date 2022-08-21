import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ADD_ORDER } from "../../utils/mutations";

// import "../assets/success.css";

const Success = (props) => {
  const [addOrder] = useMutation(ADD_ORDER);
  const { cartItems } = props;

  useEffect(() => {
    async function saveOrder() {
      const cart = await JSON.parse(localStorage.getItem("cartItems"));
      const products = cart.map((item) => item._id);
  
      // Need to find a way to make sure quantities get passed on here
      if (products.length) {
        await addOrder({ variables: { products } });
        
        cartItems.forEach((index, object) => {
            cartItems.splice(index);
        });
        window.localStorage.removeItem('cartItems')
      }
      

      setTimeout(() => {
        window.location.assign("/");
      }, 3000);
    }

    saveOrder();
  }, [addOrder, cartItems]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <h1>Purchase Successful!</h1>
    </div>
  );
};

export default Success;
