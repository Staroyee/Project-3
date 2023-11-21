import { Container, Row, Col, Card } from "react-bootstrap";
import "../assets/css/Apis.css"

function Apis() {
  return (
    <>
      <Container>
        <Card className="A-Card">
          <h1 className="A-Title">API Usage</h1>
          <Card.Text>
              For this project, we made use of the amazing Launch Library 2 & NASA Open APIs. They provide the wealth of information and images that fill the community we have built, and we thank them for making the information open, free, and easily accessible.
              </Card.Text>
          <Row>
            <Col>
            <h2 className="A-CardTitle">Launch Library 2 API</h2>
              <Card.Text>
              The Launch Library 2 API is the official successor of the popular Launch Library API. It keeps its core features whilst also including everything the broader Space Launch Now API had to offer. The result is a large database delivering a more complete experience for each rocket launch and space event. The philosophy behind the API also remains unchanged : the entire database is accessible to everyone, for free.
              </Card.Text>
              <a
            className="footerItem"
            href="https://thespacedevs.com/llapi"
            rel="noreferrer"
            target="_blank"
          >
            <button className="A-Button">View Docs</button>
          </a>
          <h2 className="A-CardTitle">NASA Open APIs</h2>
              <Card.Text>
              Welcome to the NASA API portal. The objective of this site is to make NASA data, including imagery, eminently accessible to application developers. This catalog focuses on broadly useful and user friendly APIs and does not hold every NASA API.
              </Card.Text>
              <a
            className="footerItem"
            href="https://api.nasa.gov/"
            rel="noreferrer"
            target="_blank"
          >
            <button className="A-Button">View Docs</button>
          </a>
            </Col>
          </Row>
          
        </Card>
      </Container>
    </>
  );
}

export default Apis;
