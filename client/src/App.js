import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SearchBooks from "./pages/SearchBooks";
import SavedBooks from "./pages/SavedBooks";
import Navbar from "./components/Navbar";

import { setContext } from "@apollo/client/link/context";

import {
  ApolloProvider, // provides data to componenents
  ApolloClient, // constructor, initializes connection to server
  InMemoryCache, // caches API responses for efficiency
  createHttpLink, // controls how client makes requests
} from "@apollo/client";

const httpLink = createHttpLink({
  uri: "/graphql", // links to GraphQL server
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  // set the http headers of every request to include the token!!
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // tie the auth and http links together!!
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path="/" component={SearchBooks} />
            <Route exact path="/saved" component={SavedBooks} />
            <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
