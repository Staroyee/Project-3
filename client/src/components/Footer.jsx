// Import necessary components and images.
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "../assets/css/Footer.css"

// Define the 'Footer' component.
function Footer() {
  return (
    <>
      <Navbar className="footerContainer" variant="dark">
        <Container>
          {/* Create links to social media profiles with respective icons. */}
          <a
            className="footerItem"
            href="https://github.com/Staroyee"
            rel="noreferrer"
            target="_blank"
          >
            <h4 className="footerLink">GitHub</h4>
          </a>
          <Link to="/donate" >
            <h4 className="footerLink">
              Donate
            </h4>
          </Link>
          <a
            className="footerItem"
            href="https://thespacedevs.com/llapi"
            rel="noreferrer"
            target="_blank"
          >
            <h4 className="footerLink">Sources</h4>
          </a>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
