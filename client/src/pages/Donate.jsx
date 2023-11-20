import { Container, Row, Col, Card } from "react-bootstrap";
import DonationButton from "../components/DonationButton";
import "../assets/css/Donation.css";

function Donate() {
  return (
    <>
      <Container>
        <Card className="D-Card">
          <h1 className="D-Title">Donations</h1>
          <Row>
            <Col>
              <Card.Text>
                🤠 Howdy! Thank you for being a part of our community. We work
                hard to bring you some of our favourite space themed information
                and data, provided from by APIs from NASA and Launch Library 2.
              </Card.Text>
              <Card.Text>
                By donating to support our project, you allow us to continue
                developing and expanding our space platform ⭐. We appreciate
                all who take the time to use our application and those who
                donate! 💙
              </Card.Text>
            </Col>
          </Row>
          <Container className="D-ButtonContainer">
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
                  itemID="price_1OETdYIUYfXVTgToTBF1oNId"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DonationButton
                  amount={"20.00"}
                  itemID="price_1OETduIUYfXVTgTowVXKmFMR"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <DonationButton
                  amount={"50.00"}
                  itemID="price_1OETeIIUYfXVTgToH59NAeH7"
                />
              </Col>
            </Row>
          </Container>
        </Card>
      </Container>
    </>
  );
}

export default Donate;
