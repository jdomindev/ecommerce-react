import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import spinner from "../assets/spinner.gif";

import { GET_ME } from "../../utils/queries";

export default function Profile(props) {
  const { data, loading } = useQuery(GET_ME);
  const user = data?.me;

  // function to get total price and quantity, or adjust cart

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div className="container order-container my-1">
          {/* <Link to="/">← Back to Products</Link> */}

          {user ? (
            <>
              <h2 className="py-3">
                <strong>{user.firstName}'s Order History</strong>
              </h2>
              {user.orders.map((order) => (
                <div key={order._id} className="card cart-item my-2">
                  <div className="">
                    <h4 className="float-left order-text-title">Order Summary</h4>
                    <h4 className="text-right order-text-title">
                      {new Date(
                        parseInt(order.purchaseDate)
                      ).toLocaleDateString()}
                    </h4>
                    <hr></hr>
                    <div className="order-items">
                      {order.products.map(
                        ({ _id, image, name, price, quantity }, index) => (
                          <div key={index} className="order-card">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex justify-content-between">
                                <Link
                                  to={`/products/${_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <img
                                    alt={name}
                                    src={image}
                                    className="order-image"
                                  />
                                </Link>

                                <div>
                                  <h5 className="order-text">{name}</h5>
                                  <h6 className="order-text">
                                    Price: ${price}
                                  </h6>
                                </div>
                              </div>
                              <div className="text-right">
                                <h6 className="order-text">Qty: {quantity}</h6>
                                <h6 className="order-text">${price}</h6>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <hr></hr>
                      <div className="">
                        <div className="d-flex justify-content-between">
                          <h5 className="">Total Price</h5>
                          <h5 className="">$300</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
