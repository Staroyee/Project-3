import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

import CountdownTimer from "../components/Countdown";
import DateParser from "../components/DateParser.jsx";
import Loading from "../components/Loading.jsx";

import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import "../assets/css/Launch.css";

import { SAVE_LAUNCH } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

function Launch() {
  const [launchData, setLaunchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLaunch] = useMutation(SAVE_LAUNCH, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  useEffect(() => {
    getLaunchData();
  }, []);

  const getLaunchData = () => {
    let launchUrl = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/";
    fetch(launchUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.results)
        setLaunchData(response.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
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
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <Container>
            <h1 className="L-Title">Launches</h1>
            <Row>
              <Col>
                {launchData.length > 0 &&
                  launchData.map((launch) => (
                    <motion.div
                      key={launch.id}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card className="L-Card">
                        <Container>
                          <Row>
                            <Col md={12} lg={4}>
                              <Card.Img
                                className="L-Img"
                                src={launch.image}
                              ></Card.Img>
                            </Col>

                            <Col md={12} lg={8}>
                              <Row>
                                <Col>
                                  <Card.Body>
                                    <Card.Title className="L-Title">
                                      {launch.name}
                                    </Card.Title>
                                    <Card.Text>
                                      {launch.launch_service_provider.name}
                                    </Card.Text>
                                    <Card.Text>
                                      {launch.status.abbrev}
                                    </Card.Text>
                                    <Card.Text>
                                      <DateParser
                                        dateString={launch.window_start}
                                      />
                                    </Card.Text>
                                    <CountdownTimer
                                      targetDate={new Date(
                                        launch.window_start
                                      ).getTime()}
                                    />
                                    <Row className="L-ButtonContainer">
                                      <button className="L-Button">
                                        {launch.webcast_live ? (
                                          <>WATCH LIVE</>
                                        ) : (
                                          "NO LIVESTREAM"
                                        )}
                                      </button>
                                      <Tooltip
                                        title="Info"
                                        arrow
                                        placement="right"
                                      >
                                        <Link to={`/launch/${launch.id}`}>
                                          <button className="L-Button">
                                            <InfoIcon />
                                          </button>
                                        </Link>
                                      </Tooltip>
                                      <Tooltip
                                        title="Save"
                                        arrow
                                        placement="right"
                                      >
                                        <button
                                          onClick={() =>
                                            handleSaveLaunch(launch.id)
                                          }
                                          className="L-Button"
                                        >
                                          <AddIcon />
                                        </button>
                                      </Tooltip>
                                    </Row>
                                  </Card.Body>
                                </Col>
                              </Row>
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
      )}
    </>
  );
}

export default Launch;
