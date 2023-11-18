import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../assets/css/Navbar.modules.css";

function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // New state to track active link

  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  const removeActive = () => {
    setIsActive(false);
  };

  const handleLinkClick = (link) => {
    setActiveLink(link);
    removeActive();
  };

  function ShowNav() {
    const commonLinkProps = {
      onClick: () => handleLinkClick(""),
      className: "navLink",
    };

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

  return (
    <div className="App">
      <header className="App-header">
        <nav className={`navBar`}>
          <Link to="/" className={`logo`}>
            SKYWARD{" "}
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

export default Navbar;
