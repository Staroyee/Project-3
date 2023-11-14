import { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import "../assets/css/Navbar.modules.css"; 

function Navbar() {
  // adding the states
  const [isActive, setIsActive] = useState(false);

  // add the active class
  const toggleActiveClass = () => {
    setIsActive(!isActive);
  };

  // clean up function to remove the active class
  const removeActive = () => {
    setIsActive(false);
  };
  function ShowNav() {
    if (Auth.loggedIn()) {
      return (
        <>
          <ul className={`navMenu ${isActive ? "active" : ""}`}>
            <li onClick={removeActive}>
              <Link to="/" className={`navLink`}>
                Home
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/launches" className={`navLink`}>
                Launches
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/saved-launches" className={`navLink`}>
                Saved Launches
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/profile" className={`navLink`}>
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
            <li onClick={removeActive}>
              <Link to="/" className={`navLink`}>
                Home
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/launches" className={`navLink`}>
                Launches
              </Link>
            </li>
            <li onClick={removeActive}>
              <Link to="/login-signup" className={`navLink`}>
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
          {/* logo */}
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
