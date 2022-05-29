import React from "react";
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../assets/Home.css";
import Carousel from "../layout/Carousel";

// need to get all products
import { GET_PRODUCTS } from "../../utils/queries";

export default function Home() {
    
  const { loading, data } = useQuery(GET_PRODUCTS);
  const products = data?.products || [];

  return (
    <>
      <Carousel />
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="row">
            {products.map((product) => {
              return (
                <div>
                  <h2>{product.name}</h2>
                  <h2>{product.price}</h2>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
