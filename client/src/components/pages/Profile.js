import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import "../assets/Profile.css"

import { GET_ME } from "../../utils/queries";

export default function Profile() {
  const { data, loading } = useQuery(GET_ME);
  const user = data?.me;
  const order = user?.orders;
  const prices = order?.map(order => (order.products.map(product => product.price)))

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      ) : (
        <div className="">
          {user ? (
            <>
            <div className="container">
              <aside className="order-item p-3 mt-3 d-flex-column">
                  <h2 className="pb-3 profile-header">
                    <strong>{user.firstName}'s Profile</strong>
                  </h2>
                  <h5>Name: {user.firstName} {user.lastName}</h5>
                  <h5>Email: {user.email}</h5>
                {/* {user.address ? (
                  <>
                    <h5> <strong>Shipping Address:</strong></h5>
                    <h5> {user.address.street}</h5>
                    {(user.address.aptNo !== null) ? (
                      <h5>Apt No. {user.address.aptNo}</h5>
                    ) : null }
                    <h5> {user.address.city}, {user.address.state} {user.address.zipCode}</h5>
                    <h5> {user.address.country}</h5>
                  </>
                  ) : null} */}
                  <hr></hr>
                  <div className="d-flex justify-content-end">
                  <Link to={'/profile-edit'} >
                    <button className="btn btn-secondary ">Update Account Details</button>
                  </Link>
                  </div>
              </aside>
              <h3 className="py-3 m-0 profile-header">
                <strong>Order History</strong>
              </h3>
              {order.map((order, index) => (
                <div key={order._id} className="card order-item mb-4">
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
                        ({ _id, image, name, price }, index) => (
                          <div key={index} className="order-card">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex justify-content-between">
                                <Link
                                  to={`/products/${_id}`}
                                >
                                  <img
                                    alt={name}
                                    src={image}
                                    className="order-image"
                                  />
                                </Link>

                                <div className="mx-3">
                                  <h5 className="order-text">{name}</h5>
                                  
                                </div>
                              </div>
                              <div className="text-right">
                                <h6 className="order-text">
                                    ${price}
                                  </h6>
                                {/* <h6 className="order-text">Qty:</h6> */}
                                {/* <h6 className="order-text">${price} x {quantity}</h6> */}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                      <hr></hr>
                      <div className="">
                        <div className="d-flex justify-content-between">
                          <h5 className="">Total Price</h5>
                          <h5 className="">${
                          prices[index].reduce((a, b) => a + b, 0).toFixed(2)
                          }</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </>
          ) : null}
        </div>
      )}
    </>
  );
}
