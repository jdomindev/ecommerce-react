import React from 'react';
// import { Link } from "react-router-dom";

import "../assets/Product.css";


export default function Product(props) {
    const {products, onAddToCart} = props

  return (
    <div className="container">
        <div className="row m-0 justify-content-center">
            {products.map((product) => {
            return (
                <div className="m-3" key={product._id}>
                <div className="card">
                    <img className="card-img-top img-size card-width" src={product.image} alt="product"/>
                    <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <h6>Price: ${product.price}</h6>
                    <p className="card-text ">{product.description}</p>
                    
                    </div>
                    <div className="d-flex justify-content-end button-row">
                        <button className="btn btn-secondary mr-1">Add to Wishlist</button>
                        <button onClick={() => onAddToCart(product)} className="btn btn-primary">Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
                </div>
            );
            })}
        </div>
    </div>
  );
}
