import React, { useEffect } from "react";

// import "../assets/success.css";

const Success = (props) => {
  const { cartItems } = props;

  useEffect(() => {
    async function saveOrder() {
    
      if (cartItems.length) {
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
  }, [cartItems]);

  return (
    <div className="d-flex justify-content-center mt-5">
      <h1>Purchase Successful!</h1>
    </div>
  );
};

export default Success;
