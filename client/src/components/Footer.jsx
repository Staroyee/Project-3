// Import necessary components and images.
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
            <h4>GitHub</h4>
          </a>
          <a
            className="footerItem"
            href="https://thespacedevs.com/llapi"
            rel="noreferrer"
            target="_blank"
          >
            <h4>Sources</h4>
          </a>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
