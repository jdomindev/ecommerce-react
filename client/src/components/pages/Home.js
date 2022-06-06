import React from 'react';
// import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../assets/Home.css";
import Carousel from "../layout/Carousel";
import Product from "../layout/Product";

// need to get all products
import { GET_PRODUCTS } from "../../utils/queries";

export default function Home(props) {
  const {onAddToCart} = props
  const { loading, data } = useQuery(GET_PRODUCTS);
  const products = data?.products || [];



  return (
    <>
      {/* <Carousel /> */}
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
            <>
              <Product products={products} onAddToCart={onAddToCart} />
            </>
        )}
      </div>
    </>
  );
}
