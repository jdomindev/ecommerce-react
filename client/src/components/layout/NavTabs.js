import React from "react";

import { Link } from "react-router-dom";
import "../assets/NavTabs.css";
import logo from "../images/keyboard.svg";

import auth from "../../utils/auth";

function NavTabs() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <Link className="navbar-brand" to="/home">
        <img src={logo} width="50" alt="Tandem Fandom" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
          {auth.loggedIn() && (
            <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/profile">
                  Profile <i className="fa-solid fa-user"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/wishlist">
                  Wishlist <i className="fa-solid fa-rectangle-list"></i>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/cart">
                  Cart <i className="fa-solid fa-cart-shopping"></i>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/" onClick={auth.logout}>Logout</Link>
              </li>
            </ul>
            </>
          )}
          {!auth.loggedIn() && (
            <>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/login">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/signup">
                  Create Account
                </Link>
              </li>
            </ul>
            </>
          )}
      </div>
    </nav>
  );
}

export default NavTabs;
