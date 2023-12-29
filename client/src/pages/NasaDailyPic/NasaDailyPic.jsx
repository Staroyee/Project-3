import { Container, Row, Col, Card } from "react-bootstrap";

// Import Queries
import { QUERY_APOD } from "../../utils/queries";
import { useQuery } from "@apollo/client";

// Import Components
import Loading from "../../components/Loading/Loading.jsx";

import "./NasaDailyPic.css";

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
      <svg
              height="100"
              stroke="#072448"
              strokeWidth="1.25"
              className="text-line"
              width="100%"
            >
              <text
                x="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                y="50%"
              >
                APOD
              </text>
            </svg>
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
