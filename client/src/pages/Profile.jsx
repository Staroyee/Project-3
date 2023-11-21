import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/Profile.css";
import Loading from "../components/Loading";

function Profile() {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  const { me } = data;

  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view your profile.</div>;
  }

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
            <h5>Username:</h5>
            <h2>{me.username}</h2>
          </Col>
          <Col md={12} className="P-DetailsContainer">
            <h5>Email:</h5>
            <h2>{me.email}</h2>
          </Col>
          <Col md={12} className="P-ButtonContainer">
            <Link to={"/update-profile"}>
              <button className="P-Button">Edit Details</button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Profile;
