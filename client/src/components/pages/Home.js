import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";

import "../assets/Main.css";
import "../assets/Home.css";
// import Carousel from "../layout/Carousel";
import Product from "../layout/Product";
import Category from "../layout/Category";
import { GET_PRODUCTS } from "../../utils/queries";


export default function Home(props) {
  const { onAddToCart } = props;
  const { data } = useQuery(GET_PRODUCTS);


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
      {/* // <select className="float-right" defaultValue={'DEFAULT'}>
          //     <option value="DEFAULT">Select an Option</option>
          //   {categories.map((category) => { return (
          //       <option key={category._id} value={category.name}>{category.name}</option>
          //     )}
          //   )}
          // </select> */}
      <Category products={products} />
      
      <div>
          <>
            <div className="product-grid m-3">
              {filteredData.map((product) => {
                return (
                <div key={product._id} id="product">
                  <div className="card">
                    <Link to={`/products/${product._id}`}>
                      <img
                        className="card-img"
                        src={product.image}
                        alt="product"
                      />
                    </Link>
                    <div className="card-padding">
                      <h2 className="card-title">{product.name}</h2>
                      <h5>
                        <strong>Price: </strong>
                        ${product.price}
                      </h5>
                      {/* <p className="card-text">{product.description}</p> */}
                    </div>
                    <div className="d-flex justify-content-end card-padding pt-0">
                      <button className="btn btn-secondary mr-1">
                        Add to Wishlist
                      </button>
                      <button
                        onClick={() => onAddToCart(product)}
                        className="btn btn-primary"
                      >
                        Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
              })}
            </div>
          </>
        {/* // : (
        // <Product onAddToCart={onAddToCart} />
        // )} */}
      </div>

    </>
  );
}

// Break out search bar into component, make a new route for a search results page?, work on search buttons and functionality
