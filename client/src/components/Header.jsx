// Import necessary components and modules.
import { useState } from "react";
import { PropTypes } from "prop-types";
import { Navbar, Nav, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import the logo image.
import logo from "../assets/images/rocketIcon.png"

// Define custom styles for the header.
const styles = {
  navStyle: {
    marginBottom: "20px",
    padding: "1rem 1rem",
    textAlign: "center",
  },
  logoStyle: {
    
    margin: "10px",
  },
  titleStyle: {
    margin: "10px",
  },
  dropdownStyle: {
    margin: "10px",
  },
};

// Define the 'Header' component.
function Header({ links }) {
  
  // Use state to manage the collapsed state of the navigation menu.
  const [collapsed, setCollapsed] = useState(false);

  // Function to toggle the collapsed state of the menu.
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    console.log("Collapsed state:", collapsed);
  };

  return (
    <>
      <Navbar style={styles.navStyle} variant="dark" expand="lg">
        <a href="http://localhost:3000/" className="href">
          <Image
            style={styles.logoStyle}
            alt="Skyward Logo"
            src={logo}
            roundedCircle
          />
        </a>
        <Navbar.Toggle onClick={toggleCollapsed} style={styles.dropdownStyle} />
        <Navbar.Collapse
          className={`justify-content-${collapsed ? "center" : "end"}`}
        >
          <Nav>
            {/* Map through the 'links' prop and display navigation links. */}
            {links.map((link, index) => (
              <Nav.Item key={index}>
                <Link to={link.to} className="nav-link">
                  {link.label}
                </Link>
              </Nav.Item>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}

Header.propTypes = {
  links: PropTypes.array.isRequired,
};

export default Header;
