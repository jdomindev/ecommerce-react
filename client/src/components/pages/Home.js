import React from "react";
import { useQuery } from "@apollo/client";

import "../assets/Main.css";
import "../assets/Home.css";
// import Carousel from "../layout/Carousel";
import Category from "../layout/Category";
import { GET_PRODUCTS } from "../../utils/queries";


export default function Home(props) {
  const { onAddToCart } = props;
  const { data } = useQuery(GET_PRODUCTS);


  const products = data?.products || [];

  // const [filteredData, setFilteredData] = useState([]);

  return (
    <>
      {/* <Carousel /> */}
      <Category products={products} onAddToCart={onAddToCart}/>
      {/* <div>
          <div className="container">
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
                        Price:
                        ${product.price}
                      </h5>
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
          </div>
      </div> */}

    </>
  )
};

