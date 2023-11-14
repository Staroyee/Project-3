import { Outlet } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import styled from "styled-components";
import background from "./assets/images/background.jpg";
import "./App.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const BackgroundContainer = styled.div`
  background-color: #120401;
  background-image: url(${background});
  background-size: cover;
  display: flex;
  background-repeat: no-repeat;
  flex-direction: column;
  text-align: center;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex-grow: 1;
`;

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {

  
  return (
    <>
      <ApolloProvider client={client}>
        <BackgroundContainer>
          <Navbar />
          <ContentContainer>
            <Outlet />
          </ContentContainer>
          <Footer />
        </BackgroundContainer>
      </ApolloProvider>
    </>
  );
}

export default App;
