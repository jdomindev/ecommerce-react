import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
  // console.log(cartItems);
  const taxPrice = itemsPrice * 0.06;
  const shippingPrice = itemsPrice > 50 ? 0 : 12;
  const totalPrice = itemsPrice + taxPrice + shippingPrice;
  // const itemPrice = cartItems.forEach(item) => a + c.price * c.quantity, 0

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  // const quantity = cartItems.map(item => item.quantity)


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
      {cartItems.length ? (
        <div className="container cart-item-container">
          <h2 className="py-3">
            <strong>Your Cart</strong>
          </h2>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item d-flex align-items-center justify-content-between my-1"
            >
              <div className="d-flex align-items-center">
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    className="order-image"
                    alt="cart item"
                  />
                </Link>
                <div className="d-flex-column cart-text ml-3">
                  <h6 className="order-text">{item.name}</h6>
                  <h6 className="order-text">${item.price}</h6>
                </div>
              </div>

              <div className="d-flex-column text-center m-1">
                <button
                  onClick={() => onAddToCart(item)}
                  className="btn btn-secondary py-0"
                >
                  <i className="fa-solid fa-plus px-1 "></i>
                </button>
                <div>
                <input
                  type="number"
                  min="0"
                  className="cart-quantity"
                  placeholder={item.quantity}
                  value={item.quantity}
                ></input>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="btn btn-secondary py-0"
                >
                  <i className="fa-solid fa-minus px-1"></i>
                </button>
              </div>
              <div>
                <button
                  onClick={() => onDeleteFromCart(item)}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <hr></hr>
          <div className="d-flex justify-content-center">
            <div className="w-100">
              <div className="cart-item">
                <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">
                    Items (<div className="badge">{productIds.length}</div>)
                  </h6>
                  <h6 className="order-text">${itemsPrice.toFixed(2)}</h6>
                </div>
                <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">Taxes</h6>
                  <h6 className="order-text">${taxPrice.toFixed(2)}</h6>
                </div>
                <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">Shipping & handling</h6>
                  <h6 className="order-text">${shippingPrice.toFixed(2)}</h6>
                </div>
              </div>
              <div className="cart-item">
                <div className="d-flex font-weight-bold justify-content-between pt-1">
                  <h6 className="order-text">
                    <strong>Total Price</strong>
                  </h6>
                  <h6 className="order-text">${totalPrice.toFixed(2)}</h6>
                </div>
              </div>
              <div className="text-right button-margin ">
                <button className="btn btn-success" onClick={submitCheckout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <h1>Cart is Empty</h1>
        </div>
      )}
    </>
  );
}
