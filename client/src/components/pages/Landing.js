import React from "react";
import { Link } from "react-router-dom";

import "./../assets/Landing.css";
import SmoothScroll from "smooth-scroll";
import logo from "../images/keyboard.svg";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

export default function Landing() {
  return (
    <>
      <header>
        <div className="col-md-12 header">
          <div className="d-flex justify-content-center">
            <img src={logo} width="25%" alt="Ecommerce React" />
          </div>
        </div>
        <div className="col-md-12 header">
            <p className="text-secondary text-center">
              React E-commerce site template to be used for various product
              models.
            </p>
            <div className="d-flex justify-content-center">
              <Link to="/signup" className="btn btn-custom mr-2">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-custom ml-2">
                Login
              </Link>
          </div>
        </div>
      </header>
    </>
  );
}
