import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Launch from "./pages/Launch";

import styled from "styled-components";
import "./App.css";

const BackgroundContainer = styled.div`
  background-color: #120401;
  display: flex;
  flex-direction: column;
  text-align: center;
  min-height: 100vh; // Set min-height to at least 100% of the viewport height
`;

const ContentContainer = styled.div`
  flex: 1; // Use flex to push the Footer to the bottom
`;

function App() {
  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/signup", label: "Signup" },
    { to: "/profile", label: "Profile" },
    { to: "/launch", label: "Launch" },
  ];

  return (
    <>
      <BrowserRouter>
        <BackgroundContainer>
          <Header links={navLinks} />
          <ContentContainer>
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/launch" element={<Launch />} />
            </Routes>
          </ContentContainer>
          <Footer />
        </BackgroundContainer>
      </BrowserRouter>
    </>
  );
}

export default App;
