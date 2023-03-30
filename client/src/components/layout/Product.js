import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../utils/queries";
import "../assets/Product.css";
import spinner from "../assets/spinner.gif";

// Added to cart and removed from cart alerts by cart tab


export default function Product(props) {
  const { onAddToCart } = props;
  const { loading, data } = useQuery(GET_PRODUCTS);
  const products = data?.products || [];

  return (
    <div>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <img src={spinner} alt="loading" />
        </div>
      ) : (
        <div className="container">
        <div className="product-grid m-3">
          {products.map((product) => {
            return (
              <div key={product._id} id="product">
                <div className="product-card">
                  <Link to={`/products/${product._id}`}>
                    <img
                      className="card-img"
                      src={product.image}
                      alt="product"
                    />
                  </Link>
                  <div className="card-move">
                    <div className="card-padding">
                      <h2 className="card-title"><strong>{product.name}</strong></h2>
                      <h5>
                        ${product.price}
                      </h5>
                      <details>
                        <summary>Description</summary>
                        <p className="card-text pt-2">{product.description}</p>
                      </details>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end card-padding pt-0">
                    <button className="btn btn-secondary mr-1">
                      <i className="fa-solid fa-heart"></i>
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="btn cart-button"
                      
                    >
                      Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                    </button>
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      )}
    </div>
  );
}
