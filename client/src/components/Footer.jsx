// Import necessary components and images.
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Import social media logos.

// Define custom styles for the footer.
const styles = {
  footerStyle: {
    borderTop: '1px solid white',
    margin: 'auto',
    width: '90%',
    maxWidth: '850px',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    boxShadow: '0px 26px 75px 15px rgba(0, 0, 0, 1)',
  },
  footerbrandStyle: {
    margin: '10px 30px',
  }
}

// Define the 'Footer' component.
function Footer() {
  return (
    <>
      <Navbar style={styles.footerStyle} variant='dark'>
        <Container>
          {/* Create links to social media profiles with respective icons. */}
          <Navbar.Brand style={styles.footerbrandStyle} href="https://github.com/Staroyee" target='_blank'>
            <img
              
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Github"
            />
          </Navbar.Brand>
          <Navbar.Brand style={styles.footerbrandStyle} href="https://www.linkedin.com/in/danielmasefield03/" target='_blank'>
            <img
              
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="LinkedIn"
            />
          </Navbar.Brand>
          <Navbar.Brand style={styles.footerbrandStyle} href="https://stackoverflow.com/users/22794356/staroye" target='_blank'>
            <img
              
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Stack Overflow"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
