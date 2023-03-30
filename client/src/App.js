import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/pages/Login";
import Signup from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Cart from "./components/pages/Cart";
import ProductDetail from "./components/pages/ProductDetail";
import Success from './components/pages/Success';
import Profile from './components/pages/Profile';
import ProfileEdit from './components/pages/ProfileEdit';

import auth from "./utils/auth";

import NavTabs from "./components/layout/NavTabs";
import Footer from "./components/layout/Footer";

// import { GET_ME } from "./utils/queries";


// CHANGE BACK AFTER DEPLOYMENT?

const httpLink = createHttpLink({
  // uri: "/graphql",
  uri: "http://localhost:3001/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const cartFromLocalStorage = JSON.parse(
    localStorage.getItem("cartItems") || "[]"
  );
  const [cartItems, setCartItems] = useState(cartFromLocalStorage);

  const productIds = () => {
    let productIds = [];
    const quantities = [];

    cartItems.forEach((item) => {
      quantities.push(item.quantity)
      for (let i = 0; i < item.quantity; i++) {
        productIds.push(item._id);
      }
    });
    
    return productIds;
  };
  
  const onAddToCart = (product) => {
    if(auth.loggedIn()) {
      const exist = cartItems.find((x) => x._id === product._id);
      if (exist) {
        setCartItems(
          cartItems.map((x) =>
            x._id === product._id ? { ...exist, quantity: (exist.quantity + 1) } : x
          )
        );
        successCart()
      } else {
        setCartItems([...cartItems, { ...product, quantity: 1 }]);
      }
    } else {
      window.location.assign("/login")
    }
  };

  const successCart = () => {
    
  }

  const onRemoveFromCart = (product) => {
    const exist = cartItems.find((x) => x._id === product._id);
    if (exist.quantity === 1) {
      setCartItems(cartItems.filter((x) => x._id !== product._id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x._id === product._id ? { ...exist, quantity: exist.quantity - 1 } : x
        )
      );
    }
  };

  const handleChange = (e, product) => {
    const value = e.target.value ? (parseInt(e.target.value)) : (1)
    setCartItems(
      cartItems.map((x) =>
        x._id === product._id ? { ...product, quantity: value } : x
      )
    );
  }

  const onDeleteFromCart = (product) => {
    setCartItems(cartItems.filter((x) => x._id !== product._id));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <NavTabs productIds={productIds()} />
            <Route exact path="/">
              <Home onAddToCart={onAddToCart} />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/products/:id">
              <ProductDetail onAddToCart={onAddToCart}/>
            </Route>
            <Route exact path="/profile">
              <Profile cartItems={cartItems} />
            </Route>
            <Route exact path="/profile-edit">
              <ProfileEdit />
            </Route>
            <Route exact path="/success">
              <Success  cartItems={cartItems} productIds={productIds()}/>
            </Route>
            <Route exact path="/cart">
              <Cart
                productIds={productIds()}
                cartItems={cartItems}
                setCartItems={setCartItems}
                onAddToCart={onAddToCart}
                onRemoveFromCart={onRemoveFromCart}
                handleChange={handleChange}
                onDeleteFromCart={onDeleteFromCart}
              />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
