import React from 'react';
// import { Link } from "react-router-dom";

import "../assets/Main.css";
import Carousel from "../layout/Carousel";
import Product from "../layout/Product";


export default function Home(props) {
  const {onAddToCart} = props


  return (
    <>
      {/* <Carousel /> */}
      <Product onAddToCart={onAddToCart} />
    </>
  );
}
