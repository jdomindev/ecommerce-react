import React from "react";

import { Link } from "react-router-dom";
import "../assets/NavTabs.css";
import logo from "../images/leaf.svg";

import auth from "../../utils/auth";

export default function NavTabs(props) {
  const {productIds} = props

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img className="mr-3" src={logo} width="50" alt="leaf logo" />
        <h2 className="no-style">Plant Store</h2>
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
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="navbar-brand nav-link" to="/cart">
                  
                  Cart <i className="fa-solid fa-cart-shopping"></i> {' '}
                  {productIds ? (
                    <span className="lead"><button className="badge">{productIds.length}</button></span>
                  ) : (
                    ''
                  )}

                </Link>{' '}
              </li>
              <li className="nav-item">
                <button id="no-button-style" className="navbar-brand nav-link" onClick={auth.logout}>Logout</button>
              </li>
            </ul>
            </>
          )}
          {!auth.loggedIn() && (
            <>
            <ul className="navbar-nav ml-auto">
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