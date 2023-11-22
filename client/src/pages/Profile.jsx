import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
// Import Query
import { QUERY_ME } from "../utils/queries";
// Import Auth
import Auth from "../utils/auth";
// Import Comonents
import Loading from "../components/Loading";
// Import Styling
import { Container, Row, Col } from "react-bootstrap";
import "../assets/css/Profile.css";


// Define Profile page
function Profile() {
  // Use query to fetch data
  const { loading, error, data } = useQuery(QUERY_ME);

  // Return loading or error if either are true
  if (loading) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  // Return data as an object called me
  const { me } = data;

  // If not logged in return an error message
  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view your profile.</div>;
  }

  // Else return page data
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

// Export page
export default Profile;
