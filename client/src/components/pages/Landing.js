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
        <div>
            <div className="col-md-12 header">
              <img
                className="img-fluid"
                src={logo}
                width="25%"
                alt="React Ecommerce"
              />
              <p className="text-secondary">
                Tandem Fandom is THE people finding app for the Who's Whovian of
                your favorite fandoms!
              </p>
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
