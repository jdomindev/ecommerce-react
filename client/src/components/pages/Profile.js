import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import spinner from "../assets/spinner.gif";

import { GET_ME } from "../../utils/queries";

export default function Profile(props) {
  const { data, loading } = useQuery(GET_ME);
  const user = data?.me;

  console.log(user)

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div className="container my-1">
          {/* <Link to="/">← Back to Products</Link> */}

          {user ? (
            <>
              <h2>
                Order History for {user.firstName} {user.lastName}
              </h2>
              {user.orders.map((order) => (
                <div key={order._id} className="my-2">
                  <h3>
                    {new Date(
                      parseInt(order.purchaseDate)
                    ).toLocaleDateString()}
                  </h3>
                  <div className="flex-row">
                    {order.products.map(
                      ({ _id, image, name, price, quantity }, index) => (
                        <div key={index} className="card px-1 py-1">
                          <Link to={`/products/${_id}`}>
                            <img alt={name} src={image} className='cart-image' />
                            <p>{name}</p>
                            
                          </Link>
                          <div>
                            <span>${price}</span>
                          </div>
                        </div>
                      )
                    )}
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
