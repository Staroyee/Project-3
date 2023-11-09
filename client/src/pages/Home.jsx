import { Container, Row, Col } from "react-bootstrap";

const styles = {
    textStyle: {
        color: 'white',
    },
    containerStyle: {
        display: 'flex',
    }
}


function Home() {
    return (
        <>
        <Container style={styles.textStyle}>
            <Row>
                <Col xs={6} style={styles.textStyle}>Hey</Col>
                <Col xs={6} style={styles.textStyle}>Hey</Col>
            </Row>
        </Container>
        </>
    )
}

export default Home;