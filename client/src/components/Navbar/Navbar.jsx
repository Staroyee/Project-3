import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import Auth from "../../utils/auth";
import NavButton from "../../components/Buttons/NavButton.jsx";
import "./Navbar.modules.css";

// Define Navbar component
function Navbar() {
  const location = useLocation();
  // Track is active for navbar burger menu
  const [isActive, setIsActive] = useState(false);
  // Track is active for nav links
  const [activeLink, setActiveLink] = useState("");

  useEffect(() => {
    setActiveLink(location.pathname);
    console.log(location.pathname)
  }, [location.pathname])

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
              <Link to="/" {...commonLinkProps}>
                <NavButton
                  valueOne={"Home"}
                  valueTwo={"Home"}
                  style={{
                    background: activeLink === "/" ? "#ffd700" : "#072448",
                    color: activeLink === "/" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/launches")}>
              <Link to="/launches" {...commonLinkProps}>
                <NavButton
                  valueOne={"Launches"}
                  valueTwo={"Launches"}
                  style={{
                    background:
                      activeLink === "/launches" ? "#ffd700" : "#072448",
                    color: activeLink === "/launches" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/picture-of-the-day")}>
              <Link to="/picture-of-the-day" {...commonLinkProps}>
                <NavButton
                  valueOne={"APOD"}
                  valueTwo={"APOD"}
                  style={{
                    background:
                      activeLink === "/picture-of-the-day"
                        ? "#ffd700"
                        : "#072448",
                    color:
                      activeLink === "/picture-of-the-day"
                        ? "#072448"
                        : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/saved-launches")}>
              <Link to="/saved-launches" {...commonLinkProps}>
                <NavButton
                  valueOne={"Saved Launches"}
                  valueTwo={"Saved Launches"}
                  style={{
                    background:
                      activeLink === "/saved-launches" ? "#ffd700" : "#072448",
                    color:
                      activeLink === "/saved-launches" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/profile")}>
              <Link to="/profile" {...commonLinkProps}>
                <NavButton
                  valueOne={"Profile"}
                  valueTwo={"Profile"}
                  style={{
                    background:
                      activeLink === "/profile" ? "#ffd700" : "#072448",
                    color: activeLink === "/profile" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>

            <li>
              <a href="/" onClick={() => Auth.logout()}>
                <NavButton valueOne={"Logout"} valueTwo={"Logout"} />
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
            <li onClick={() => handleLinkClick("/")}>
              <Link to="/" {...commonLinkProps}>
                <NavButton
                  valueOne={"Home"}
                  valueTwo={"Home"}
                  style={{
                    background: activeLink === "/" ? "#ffd700" : "#072448",
                    color: activeLink === "/" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/launches")}>
              <Link to="/launches" {...commonLinkProps}>
                <NavButton
                  valueOne={"Launches"}
                  valueTwo={"Launches"}
                  style={{
                    background:
                      activeLink === "/launches" ? "#ffd700" : "#072448",
                    color: activeLink === "/launches" ? "#072448" : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/picture-of-the-day")}>
              <Link to="/picture-of-the-day">
                <NavButton
                  valueOne={"APOD"}
                  valueTwo={"APOD"}
                  style={{
                    background:
                      activeLink === "/picture-of-the-day"
                        ? "#ffd700"
                        : "#072448",
                    color:
                      activeLink === "/picture-of-the-day"
                        ? "#072448"
                        : "#ffd700",
                  }}
                />
              </Link>
            </li>
            <li onClick={() => handleLinkClick("/login-signup")}>
              <Link to="/login-signup" {...commonLinkProps}>
                <NavButton
                  valueOne={"Login/Signup"}
                  valueTwo={"Login/Signup"}
                  style={{
                    background:
                      activeLink === "/login-signup" ? "#ffd700" : "#072448",
                    color:
                      activeLink === "/login-signup" ? "#072448" : "#ffd700",
                  }}
                />
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
            <img className={`logo`} src={Logo} alt="Logo" />
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
