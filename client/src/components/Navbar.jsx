import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.png"
import Auth from "../utils/auth";
import "../assets/css/Navbar.modules.css";

// Define Navbar component
function Navbar() {
  // Track is active for navbar burger menu
  const [isActive, setIsActive] = useState(false);
  // Track is active for nav links
  const [activeLink, setActiveLink] = useState("");

  // Toggle active for burger menu
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // Toggle remove active for burger menu
  const removeActive = () => {
    setIsActive(false);
  };

  // Toggle set and remove active for nav links
  const handleLinkClick = (link) => {
    setActiveLink(link);
    removeActive();
  };

  // Define ShowNav component
  function ShowNav() {
    const commonLinkProps = {
      onClick: () => handleLinkClick(""),
      className: "navLink",
    };

    // If logged in return the following
    if (Auth.loggedIn()) {
      return (
        <>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={() => handleLinkClick("home")}>
              <Link to="/" {...commonLinkProps} style={{ opacity: activeLink === "home" ? 1 : 0.6 }}>
                Home
              </Link>
            </li>
            <li onClick={() => handleLinkClick("launches")}>
              <Link to="/launches" {...commonLinkProps} style={{ opacity: activeLink === "launches" ? 1 : 0.6 }}>
                Launches
              </Link>
            </li>
            <li onClick={() => handleLinkClick("picture-of-the-day")}>
              <Link to="/picture-of-the-day" {...commonLinkProps} style={{ opacity: activeLink === "picture-of-the-day" ? 1 : 0.6 }}>
              APOD
              </Link>
            </li>
            <li onClick={() => handleLinkClick("saved-launches")}>
              <Link to="/saved-launches" {...commonLinkProps} style={{ opacity: activeLink === "saved-launches" ? 1 : 0.6 }}>
                Saved Launches
              </Link>
            </li>
            <li onClick={() => handleLinkClick("profile")}>
              <Link to="/profile" {...commonLinkProps} style={{ opacity: activeLink === "profile" ? 1 : 0.6 }}>
                Profile
              </Link>
            </li>

            <li>
              <a href="/" onClick={() => Auth.logout()} className="navLink">
                Logout
              </a>
            </li>
          </ul>
        </>
      );
    } else {
      // If not logged in return the following
      return (
        <>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={() => handleLinkClick("home")}>
              <Link to="/" {...commonLinkProps} style={{ opacity: activeLink === "home" ? 1 : 0.6 }}>
                Home
              </Link>
            </li>
            <li onClick={() => handleLinkClick("launches")}>
              <Link to="/launches" {...commonLinkProps} style={{ opacity: activeLink === "launches" ? 1 : 0.6 }}>
                Launches
              </Link>
            </li>
            <li onClick={() => handleLinkClick("picture-of-the-day")}>
              <Link to="/picture-of-the-day" {...commonLinkProps} style={{ opacity: activeLink === "picture-of-the-day" ? 1 : 0.6 }}>
              APOD
              </Link>
            </li>
            <li onClick={() => handleLinkClick("login-signup")}>
              <Link to="/login-signup" {...commonLinkProps} style={{ opacity: activeLink === "login-signup" ? 1 : 0.6 }}>
                Login/Signup
              </Link>
            </li>
          </ul>
        </>
      );
    }
  }

  // Return Navbar component with nested ShowNav component depending on if the user is logged in or not
  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navBar`}>
          <Link to="/">
          <img className={`logo`}
            src={Logo}
            alt="Logo"
          />
          </Link>
          {ShowNav()}
          <div
            className={`hamburger ${isActive ? "active" : ""}`}
            onClick={toggleActiveClass}
          >
            <span className={`bar`}></span>
            <span className={`bar`}></span>
            <span className={`bar`}></span>
          </div>
        </nav>
      </header>
    </div>
  );
}

// Export component
export default Navbar;
