import { Container, Row, Col } from "react-bootstrap";

const styles = {
  textStyle: {
    padding: '20px 0px',
    fontSize: '70px',
  },
  infoStyle: {
    paddingTop: '10px',
    color: 'white',
  },
  containerStyle: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '80vh', // Ensure the container takes the full height of the viewport
  },
  colStyle: {
    color: 'rgb(57, 62, 65)',
    textAlign: 'left',
    paddingRight: '100px',
  },
}

function Home() {
  return (
    <>
      <Container style={styles.containerStyle}>
        <Row>
          <Col xs={6} style={styles.colStyle}>
            <h1 style={styles.textStyle}>SKYWARD</h1>
            <h3 style={styles.infoStyle}>Look to the sky and view the galaxy, track space launches, browse rocket information and more!</h3>
          </Col>
          <Col xs={6}></Col>
        </Row>
      </Container>
    </>
  )
}

export default Home;

