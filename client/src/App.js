import React, {useEffect, useState} from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Landing from "./components/pages/Landing"
import Login from "./components/pages/Login"
import Signup from "./components/pages/SignUp"
import Home from "./components/pages/Home"
import Cart from "./components/pages/Cart"

import NavTabs from "./components/layout/NavTabs"
import Footer from "./components/layout/Footer"

// CHANGE BACK AFTER DEPLOYMENT?
const httpLink = createHttpLink({
  // uri: "/graphql",
  uri: "http://localhost:3001/graphql"
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
  const cartFromLocalStorage = JSON.parse(localStorage.getItem('cartItems') || '[]')
  const [cartItems, setCartItems] = useState(cartFromLocalStorage)

  
    
  const onAddToCart = (product) => { 
      const exist = cartItems.find(x => x._id === product._id)
      if (exist) {
          setCartItems(cartItems.map(x => x._id === product._id ? {...exist, quantity: exist.quantity + 1} : x)) 
      } else {
          setCartItems([...cartItems, {...product, quantity: 1}])
      }
  }

  const onRemoveFromCart = (product) => {
    const exist = cartItems.find(x => x._id === product._id)
    if (exist.quantity === 1) {
        setCartItems(cartItems.filter(x => x._id !== product._id))
    } else {
        setCartItems(
            cartItems.map(x => x._id === product._id ? {...exist, quantity: exist.quantity - 1} : x)
        )
    }
  }

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]);


  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <NavTabs countCartItems={cartItems.length }/>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/home">
              <Home onAddToCart={onAddToCart}/>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/cart">
            <Cart cartItems={cartItems} onAddToCart={onAddToCart} onRemoveFromCart={onRemoveFromCart}/>
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
