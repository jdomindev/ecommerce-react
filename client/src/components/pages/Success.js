import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ADD_ORDER } from "../../utils/mutations";

// import "../assets/success.css";

// need to delete items from cart after order is added
const Success = (props) => {
  const [addOrder] = useMutation(ADD_ORDER);
  const { productIds, cartItems, onDeleteFromCart } = props;

  useEffect(() => {
    async function saveOrder() {
      const cart = await JSON.parse(localStorage.getItem("cartItems"));
      const products = cart.map((item) => item._id);


      if (products.length) {
        await addOrder({ variables: { products } });
    //   On successful order only one cart item gets deleted, need all 
        
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
  }, [addOrder]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <h1>Purchase Successful!</h1>
    </div>
  );
};

export default Success;
