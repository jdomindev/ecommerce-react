import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../assets/Main.css";
import Carousel from "../layout/Carousel";
import Product from "../layout/Product";
import { GET_PRODUCTS } from "../../utils/queries";

export default function Home(props) {
  const { onAddToCart } = props;
  const { loading, data } = useQuery(GET_PRODUCTS);

  const products = data?.products || [];
  const [filteredData, setFilteredData] = useState([]);

  const handleFilter = async (event) => {
    const searchWord = event.target.value;
    const newFilter = await products.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  return (
    <>
      {/* <Carousel /> */}
      <div className="search-wrapper d-flex justify-content-center pt-5">
        <input
          id="search"
          type="text"
          placeholder="enter search"
          onChange={handleFilter}
        ></input>
        <div className="search-icon">
          {filteredData.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i className="fa-solid fa-xmark"></i>
          )}
        </div>
      </div>
      <div>
        {filteredData.length != 0 && (
          <div>
            {filteredData.map((product, key) => {
              return (
                <div className="m-3" key={product._id}>
                  <div className="card">
                    <Link to={`/products/${product._id}`}>
                      <img
                        className="card-img-top card-width"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <h6>Price: ${product.price}</h6>
                      <p className="card-text ">{product.description}</p>
                    </div>
                    <div className="d-flex justify-content-end button-row">
                      <button className="btn btn-secondary mr-1">
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="btn btn-primary"
                      >
                        Add to Cart{" "}
                        <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Product onAddToCart={onAddToCart} />
    </>
  );
}

// Break out search bar into component, make a new route for a search results page
