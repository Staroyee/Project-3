// Import necessary components and images.
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

// Import social media logos.

// Define custom styles for the footer.
const styles = {
  footerStyle: {
    display: 'flex',
    justifyContent: 'center',
    color: '#ff851d',
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
          <h4 style={styles.footerbrandStyle} href="https://github.com/Staroyee" target='_blank'>
            GitHub
          </h4>
          <h4 style={styles.footerbrandStyle} href="https://thespacedevs.com/llapi" target='_blank'>
            Sources
          </h4>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;
