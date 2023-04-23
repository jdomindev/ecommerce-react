import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../../utils/queries";
// import spinner from "../assets/spinner.gif";

import "../assets/Main.css";
import "../assets/Home.css";
import Product from "./Product";

export default function Category(props) {
  const { products, onAddToCart } = props;

  const { data } = useQuery(GET_CATEGORIES);
  const categories = data?.categories || [];
  const [sortedData, setSortedData] = useState([]);

  const searchFunc = async (event) => {
    const searchWord = event.target.value;
    const newFilter = await products.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setSortedData([]);
    } else {
      setSortedData(newFilter);
    }
  }

  const handleFilteredData = async (event) => {
    const category = event.target.value;
    const newFilter = await products?.filter(
      (product) => product.category._id === category
    );
    if (category === "") {
      setSortedData([]);
    } else {
      setSortedData(newFilter);
    }
  };

  return (
    <>
      <div>
            <div className="d-flex-column search-bar">
              <div className="d-flex justify-content-center pt-3">
                <input
                  id="search"
                  type="search"
                  placeholder="Enter search"
                  onChange={searchFunc}
                ></input>
                <button className="search-icon">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
              <div className="d-flex justify-content-center p-3">
                {categories.map((category) => {
                  return (
                    <button
                      className="btn btn-secondary mr-1"
                      key={category._id}
                      value={category._id}
                      onClick={handleFilteredData}
                    >
                      {category.name}
                    </button>
                  );
                })}
                { sortedData.length !== 0 ? 
                (<button
                  className="btn btn-secondary"
                  value={""}
                  onClick={handleFilteredData}
                ><i className="fa-solid fa-x"></i>
                </button>) 
                : ("")
                }
                
              </div>
            </div>
      </div>
      {sortedData.length !== 0 ? (
        <>
          <div className="container">
          <div className="product-grid m-3">
            {sortedData.map((product) => {
              return (
                <div key={product._id} id="product">
                <div className="product-card">
                  <Link to={`/products/${product._id}`}>
                    <img
                      className="card-img"
                      src={product.image}
                      alt={product.name}
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
        </>
      ) : ( <Product onAddToCart={onAddToCart} /> )}
    </>
  );
}
