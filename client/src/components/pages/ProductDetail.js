import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../utils/queries";

import spinner from '../assets/spinner.gif';
import "../assets/Product.css";


export default function ProductDetail(props) {
  const { onAddToCart } = props;
  const { loading, data } = useQuery(GET_PRODUCTS);
  
  const products = data?.products || [];
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});


  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
}, [products, id])

  return (
    <>
        {loading ? <img src={spinner} alt="loading" /> : null}
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>
          <div className='flex-row'>
            <img
                src={`/images/${currentProduct.image}`}
                alt={currentProduct.name}
                className="img-size"
            />
          </div>
          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button className="btn btn-primary" onClick={() => onAddToCart(currentProduct)}>Add to Cart</button>
          </p>

          
        </div>
      ) : null}
    </>
  )
}
