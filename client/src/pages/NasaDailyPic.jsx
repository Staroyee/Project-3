import { Container, Row, Col, Card } from "react-bootstrap";
import { QUERY_APOD } from "../utils/queries";
import { useQuery } from "@apollo/client";
import "../assets/css/NasaDailyPic.css";

function NasaDailyPic() {
  const { loading, error, data } = useQuery(QUERY_APOD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { apod } = data;

  console.log(apod);

  return (
    <>
      <Container className="NDP-Container">
        <h1 className="NDP-CardTitle">Astronomy Picture of the Day</h1>
        <Card className="NDP-Card">
          <Row>
            <Col>
              <Card.Img className="NDP-Img" src={apod.hdurl}></Card.Img>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1 className="NDP-PicTitle">{apod.title}</h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <p className="NDP-Copyright">
                Image Credit & Copyright: {apod.copyright}
              </p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{apod.explanation}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>{apod.date}</p>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

export default NasaDailyPic;
