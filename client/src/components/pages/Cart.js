import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
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
    handleChange
  } = props;

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  // const taxPrice = itemsPrice * 0.06;
  const shippingPrice = itemsPrice > 50 ? 0 : 12;
  const totalPrice = itemsPrice + shippingPrice;

  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);

  const submitCheckout = () => {
    setLoading(true)
    getCheckout({
      variables: { products: productIds },
    });
  };

  return (
    <>
      {cartItems.length ? (
        <div className="container mt-3">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="cart-item d-flex align-items-center justify-content-between my-3"
            >
              <div className="d-flex align-items-center flex-wrap w-50">
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.image}
                    className="order-image mr-3"
                    alt="cart item"
                  />
                </Link>
                <div className="d-flex-column cart-text mt-3">
                  <h6 className="order-text">{item.name}</h6>
                  <h6>${item.price}</h6>
                </div>
              </div>

              <div className="d-flex-column text-center mx-3">
                <button
                  onClick={() => onAddToCart(item)}
                  className="btn btn-secondary"
                >
                  <i className="fa-solid fa-plus px-1"></i>
                </button>
                <div>
                  <input
                    type="number"
                    min="1"
                    className="cart-quantity"
                    value={item.quantity}
                    onChange={(e) => handleChange(e, item)}
                  ></input>
                </div>
                <button
                  onClick={() => onRemoveFromCart(item)}
                  className="btn btn-secondary"
                >
                  <i className="fa-solid fa-minus px-1"></i>
                </button>
              </div>
              <div className="text-center mx-3">
                <h6>${(item.quantity * item.price).toFixed(2)}</h6>
              </div>
              <div className="mx-3">
                <button
                  onClick={() => onDeleteFromCart(item)}
                  className="btn btn-danger"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-center mt-5">
            <div className="w-100 mb-3">
              <div className="cart-item">
                <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">
                    Items (<div className="badge">{productIds.length}</div>)
                  </h6>
                  <h6 className="order-text">${itemsPrice.toFixed(2)}</h6>
                </div>
                {/* <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">Taxes</h6>
                  <h6 className="order-text">Incl. in Stripe</h6>
                </div> */}
                <div className="d-flex justify-content-between pb-1">
                  <h6 className="order-text">Shipping & handling</h6>
                  <h6 className="order-text">${shippingPrice.toFixed(2)}</h6>
                </div>
                <p className="font-italic">Free shipping on purchases over $50</p>
                <hr></hr>
                <div className="d-flex font-weight-bold justify-content-between pt-1">
                  <h6 className="order-text">
                    <strong>Total Price</strong>
                  </h6>
                  <h6 className="order-text">${totalPrice.toFixed(2)}</h6>
                </div>
                <div className="text-right">
                  <Button
                  onClick={submitCheckout}
                  className='btn-custom'
                  type='submit'>
                  {!loading ? ("Checkout") : <div className="lds-ring-checkout"><div></div><div></div><div></div><div></div></div>
}
                  </Button>
                </div>
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
