import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";

import { SAVE_LAUNCH } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

function Launch() {
  const [launchData, setLaunchData] = useState([]);
  const [saveLaunch] = useMutation(SAVE_LAUNCH, {
    refetchQueries: [{ query: QUERY_ME }], // Optional: refetch the user data after saving a launch
  });

  useEffect(() => {
    getLaunchData();
  }, []);

  const getLaunchData = () => {
    let launchUrl = "https://lldev.thespacedevs.com/2.2.0/launch/upcoming/";
    fetch(launchUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.results);
        setLaunchData(response.results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSaveLaunch = async (launchId) => {
    const launchToSave = launchData.find((launch) => launch.id === launchId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      await saveLaunch({
        variables: {
          launch: {
            launchId: launchToSave.id,
            name: launchToSave.name,
            status: launchToSave.status.abbrev, // Assuming status is an object with an abbrev property
            provider: launchToSave.launch_service_provider.name,
            location: launchToSave.location,
            date: launchToSave.window_start,
            image: launchToSave.image,
            webcastLive: launchToSave.webcast_live ? "true" : "false",
          },
        },
      });

      console.log("Launch saved");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Launches</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            {launchData.length > 0 &&
              launchData.map((launch) => (
                <motion.div
                  key={launch.id}
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
                          ></Card.Img>
                        </Col>
                        <Col>
                          <Card.Body>
                            <Card.Title className="cardTitle">
                              {launch.name}
                            </Card.Title>
                            <Card.Text>
                              {launch.launch_service_provider.name}
                            </Card.Text>
                            <Card.Text>{launch.status.abbrev}</Card.Text>
                            <Card.Text>{launch.window_start}</Card.Text>
                            <Row className="buttonContainer">
                              <button className="button">
                                {launch.webcast_live ? (
                                  <>WATCH LIVE</>
                                ) : (
                                  "NO LIVESTREAM"
                                )}
                              </button>
                            </Row>
                            <Tooltip title="Info" arrow placement="left">
                              <button className="button infoButton">
                                <InfoIcon />
                              </button>
                            </Tooltip>
                            <Tooltip title="Save" arrow placement="right">
                              <button
                                onClick={() => handleSaveLaunch(launch.id)}
                                className="button removeButton"
                              >
                                <AddIcon />
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

export default Launch;
