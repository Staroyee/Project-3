import { Container, Row, Col, Card } from "react-bootstrap";

// Import Queries
import { QUERY_APOD } from "../utils/queries";
import { useQuery } from "@apollo/client";

// Import Components
import Loading from "../components/Loading";

import "../assets/css/NasaDailyPic.css";

// Define NasaDailyPic page
function NasaDailyPic() {
  // Fetch data using query
  const { loading, error, data } = useQuery(QUERY_APOD);

  // Return loading or error if either are true
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // Else return data and set it as an object called apod
  const { apod } = data;

  // Return page data
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

// Export page
export default NasaDailyPic;
