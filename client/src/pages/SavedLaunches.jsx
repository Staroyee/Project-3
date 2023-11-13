import { useQuery, useMutation } from "@apollo/client";
import { motion } from "framer-motion";
import { Container, Card, Row, Col } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import { QUERY_ME } from "../utils/queries";
import { REMOVE_LAUNCH } from "../utils/mutations";
import Auth from "../utils/auth";

function SavedLaunches() {
  const { loading, data } = useQuery(QUERY_ME);
  const [removeLaunch] = useMutation(REMOVE_LAUNCH);

  const handleRemoveLaunch = async (launchId) => {
    try {
      await removeLaunch({
        variables: { launchId },
        refetchQueries: [{ query: QUERY_ME }],
      });
      console.log("Launch removed");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const { me } = data;

  // Check if the user is logged in
  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view your saved launches.</div>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Your Launches</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {me.savedLaunches.map((launch) => (
              <motion.div
                key={launch.launchId}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="card">
                  <Container>
                    <Row>
                      <Col>
                        <Card.Img
                          className="cardImg"
                          variant="top"
                          src={launch.image}
                        />
                      </Col>
                      <Col>
                        <Card.Body>
                          <Card.Title className="cardTitle">
                            {launch.name}
                          </Card.Title>
                          <Card.Text>{launch.provider}</Card.Text>
                          <Card.Text>{launch.status}</Card.Text>
                          <Card.Text>{launch.date}</Card.Text>
                          <Row className="buttonContainer">
                            <button className="button">WATCH LIVE</button>
                          </Row>
                          <Tooltip title="Info" arrow placement="left">
                            <button className="button infoButton">
                              <InfoIcon />
                            </button>
                          </Tooltip>
                          <Tooltip title="Remove" arrow placement="right">
                            <button
                              className="button removeButton"
                              onClick={() =>
                                handleRemoveLaunch(launch.launchId)
                              }
                            >
                              <ClearIcon />
                            </button>
                          </Tooltip>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </motion.div>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SavedLaunches;
