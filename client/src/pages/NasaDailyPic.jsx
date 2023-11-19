import { Container, Row, Col } from "react-bootstrap";
import { QUERY_APOD } from "../utils/queries";
import { useQuery } from "@apollo/client";

function NasaDailyPic() {
  const { loading, error, data } = useQuery(QUERY_APOD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { apod } = data;

  console.log(apod.hdurl)

  const backgroundImageStyle = {
    height: '50vh',
    background: `url(${apod.hdurl})`,
    backgroundSize: 'cover',
  };

  return (
    <>
      <Container style={backgroundImageStyle}>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default NasaDailyPic;
