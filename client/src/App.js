import React from "react";
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <div id="page-container">
          <div id="content-wrap">
            <NavTabs />
            <Route exact path="/">
              <Landing />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
