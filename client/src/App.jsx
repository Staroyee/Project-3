import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

import "./App.css";

import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Create link for GraphQL endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Create context for JWT token to be recognised for user login and other auth needs
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// Enable apollo client links for apolloProvider
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Reset the cache without refetching active queries when a user logs out
client.clearStore();

function App() {

  
  return (
    <>
      <ApolloProvider client={client}>
        <section className="background">
          <Navbar />
          <section className="container">
            {/* Render the current pages content */}
            <Outlet />
          </section>
          <Footer />
        </section>
      </ApolloProvider>
    </>
  );
}

export default App;
