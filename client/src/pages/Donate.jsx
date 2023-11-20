import { Container, Row, Col, Card } from "react-bootstrap";
import DonationButton from "../components/DonationButton";

function Donate() {
  return (
    <>
      <Container>
        <Card>
          <Card.Title>Donations</Card.Title>
          <Row>
            <Col>
              <DonationButton
                amount={"5.00"}
                itemID="price_1OEQrkIUYfXVTgTo6LmttAgk"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DonationButton
                amount={"10.00"}
                itemID="price_1OEQwBIUYfXVTgToHf2aOLe4"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DonationButton
                amount={"20.00"}
                itemID="price_1OEQwBIUYfXVTgTotNL3xxio"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DonationButton
                amount={"50.00"}
                itemID="price_1OEQwBIUYfXVTgToWKfT8zRf"
              />
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default Donate;
