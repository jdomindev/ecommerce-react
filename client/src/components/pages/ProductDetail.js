import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../../utils/queries";

import "../assets/Product.css";

export default function ProductDetail(props) {
  const { onAddToCart } = props;
  const { loading, data } = useQuery(GET_PRODUCTS);

  const products = data?.products || [];
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
  }, [products, id]);

  return (
    <>
      {loading ? (
        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
      ) : null}
      {currentProduct ? (
        <>
        <div className="my-4 mx-3">
            <Link to="/" className="back-icon "><i className="fa-solid fa-arrow-left"></i> Back to Products</Link>
        </div>
        <div className="m-3">
          <div className="card product-card container p-0">
            <div className="flex">
              <div>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.name}
                  className="card-img"
                />
              </div>
              <div className="card-padding">
                  <h2>{currentProduct.name}</h2>
                  <h5>
                  ${currentProduct.price}{" "}
                  </h5>
                  <p>{currentProduct.description}</p>
                  <button
                    className="btn cart-button float-right"
                    onClick={() => onAddToCart(currentProduct)}
                  >
                    Add to Cart
                  </button>
              </div>
            </div>
          </div>
        </div>
        </>
      ) : null}
    </>
  );
}
