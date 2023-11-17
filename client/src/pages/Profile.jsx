import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/Profile.css";

function Profile() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  return (
    <>
      <Container className="P-Container">
        <Row>
          <Col>
            <h1 className="P-Title">Account Details</h1>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="P-DetailsContainer">
            <h2>Username:</h2>
            <h3>{me.username}</h3>
          </Col>
          <Col md={12} className="P-DetailsContainer">
            <h2>Email:</h2>
            <h3>{me.email}</h3>
          </Col>
          <Col md={12} className="P-ButtonContainer">
            <button>Edit Details</button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
