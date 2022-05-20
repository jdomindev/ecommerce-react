import React from "react";
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
          <div className="row">
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
              <a href="/Signup" className="btn btn-custom btn-lg mr-2">
                Sign Up
              </a>
              <a href="/Login" className="btn btn-custom btn-lg ml-2">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
