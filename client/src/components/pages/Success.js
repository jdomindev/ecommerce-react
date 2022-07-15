import React, { useEffect } from "react";
import { useMutation } from "@apollo/client";

import { ADD_ORDER } from "../../utils/mutations";

// import "../assets/success.css";

// need to delete items from cart after order is added
const Success = () => {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await JSON.parse(localStorage.getItem("cartItems"));
      const products = cart.map((item) => item._id);

      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;

        // productData.forEach((item) => {
        //   window.localStorage.removeItem(item);
        // });
      }

    //   setTimeout(() => {
    //     window.location.assign("/");
    //   }, 3000);
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
