// Import necessary components and modules.
import { useState } from "react";
import { PropTypes } from "prop-types";
import { Navbar, Nav, Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import the logo image.

// Define custom styles for the header.
const styles = {
  navStyle: {
    marginBottom: "20px",
    padding: "0rem 2rem",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  logoStyle: {
    width: 120,
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
  };

  return (
    <Col>
      <Navbar style={styles.navStyle} variant="dark" expand="lg">
        <a href="http://localhost:3000/" className="href">
          <Image
            style={styles.logoStyle}
            alt="Avatar"
            roundedCircle
          />
        </a>
        <Navbar.Brand style={styles.titleStyle}>
          Staroye Web Development
        </Navbar.Brand>
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
    </Col>
  );
}

Header.propTypes = {
  links: PropTypes.string.isRequired,
};

export default Header;
