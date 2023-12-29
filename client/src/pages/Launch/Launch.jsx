import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth.js";

// Import components
import CountdownTimer from "../../components/Countdown/Countdown.jsx";
import DateParser from "../../components/DateParser/DateParser.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import Button from "../../components/Button/Button.jsx";

import { Container, Row, Col, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import AddIcon from "@mui/icons-material/Add";
import InfoIcon from "@mui/icons-material/Info";
import Tooltip from "@mui/material/Tooltip";
import "./Launch.css";

// Import Queries
import { SAVE_LAUNCH } from "../../utils/mutations.js";
import { QUERY_ME } from "../../utils/queries.js";

// Define launch page
function Launch() {
  const [launchData, setLaunchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saveLaunch] = useMutation(SAVE_LAUNCH, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  // Run getLaunchData function on page load.
  useEffect(() => {
    getLaunchData();
  }, []);

  // Fetch Launch data using API url
  const getLaunchData = () => {
    let launchUrl = "https://ll.thespacedevs.com/2.2.0/launch/upcoming/";
    fetch(launchUrl)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.results);
        setLaunchData(response.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  // Handle the save launch button to allow launch data to be saved to the logged in users profile
  const handleSaveLaunch = async (launchId) => {
    const launchToSave = launchData.find((launch) => launch.id === launchId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If not logged in return false
    if (!token) {
      return false;
    }
    // Define data to save from the object data
    try {
      await saveLaunch({
        variables: {
          launch: {
            launchId: launchToSave.id,
            name: launchToSave.name,
            status: launchToSave.status.abbrev,
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
      {/* If loading return loading component */}
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          {/* If loaded return page data */}
          <Container>
            <svg
              height="100"
              stroke="#072448"
              strokeWidth="1.25"
              className="text-line L-Title"
              width="100%"
            >
              <text
                x="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                y="50%"
              >
                LAUNCHES
              </text>
            </svg>
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
                                      
                                
                                      <Button
                                        value={`${
                                          launch.webcast_live
                                            ? "WATCH LIVE"
                                            : "NO LIVESTREAM"
                                        }`}
                                      />

                                      <Link to={`/launch/${launch.id}`}>
                                        <Button value={<InfoIcon />} />
                                      </Link>
                                      <Tooltip
                                        title="Save"
                                        arrow
                                        placement="right"
                                      >
                                        <Button
                                          value={<AddIcon />}
                                          onClick={() =>
                                            handleSaveLaunch(launch.id)
                                          }
                                        />
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

// Export page
export default Launch;
