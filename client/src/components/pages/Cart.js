import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { useLazyQuery } from "@apollo/client";
import { QUERY_CHECKOUT } from "../../utils/queries";
import "../assets/Cart.css";

// `${process.env.STRIPE_PUBLIC_KEY}`
const stripePromise = loadStripe(
  "pk_test_51LIUvTJAwJ0NAqdWYNzagEqGwoHnV97chBf2JDlTiAjLIDCzAwF3G17jQVj2Mjt8UzCiMZBIL97smrPI6da9CCmv00F6HteyiR"
);

export default function Cart(props) {
  const {
    onAddToCart,
    onRemoveFromCart,
    cartItems,
    productIds,
    onDeleteFromCart,
  } = props;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const taxPrice = itemsPrice * 0.06;
  const shippingPrice = itemsPrice > 50 ? 0 : 12;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const submitCheckout = () => {
    getCheckout({
      variables: { products: productIds },
    });
  };

  return (
    <>
      <div>
        {cartItems.length === 0 && (
          <div className="d-flex justify-content-center mt-5">
            <h1>Cart is Empty</h1>
          </div>
        )}
      </div>
        
              
        <div className="container cart-item-container">
              <h2 className="py-3">
                <strong>Your Cart</strong>
              </h2>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item d-flex justify-content-between align-items-center"
            >
              <img src={item.image} className="cart-image" alt="cart item" />
              <h5 className="order-text">{item.name}</h5>
              <div>
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="btn btn-danger m-1"
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <button
                  onClick={() => onAddToCart(item)}
                  className="btn btn-success m-1"
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>
              <h6 className="order-text">
                {item.quantity} x {item.price}
              </h6>
              <button
                onClick={() => onDeleteFromCart(item)}
                className="btn btn-secondary"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          ))}
          {cartItems.length !== 0 && (
            <>
              <hr></hr>
              <div className="d-flex justify-content-center">
                <div className="w-100">
                  <div className="cart-item">
                    <div className="d-flex justify-content-between pb-1">
                      <h6>
                        Items (<div className="badge">{productIds.length}</div>)
                      </h6>
                      <h6>${itemsPrice.toFixed(2)}</h6>
                    </div>
                    <div className="d-flex justify-content-between pb-1">
                      <h6>Taxes</h6>
                      <h6>${taxPrice.toFixed(2)}</h6>
                    </div>
                    <div className="d-flex justify-content-between pb-1">
                      <h6>Shipping & handling</h6>
                      <h6>${shippingPrice.toFixed(2)}</h6>
                    </div>
                  </div>
                  <div className="cart-item">
                    <div className="d-flex font-weight-bold justify-content-between pt-1">
                      <h6 className="font-weight-bold">Total Price</h6>
                      <h6>${totalPrice.toFixed(2)}</h6>
                    </div>
                    
                  </div>
                  <div className="text-right button-margin ">
                      <button
                        className="btn btn-success"
                        onClick={submitCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                </div>
              </div>
            </>
          )}
        </div>
    </>
  );
}
