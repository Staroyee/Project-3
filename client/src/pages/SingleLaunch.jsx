import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
// Import Components
import CountdownTimer from "../components/Countdown";
import DateParser from "../components/DateParser.jsx";
import Loading from "../components/Loading.jsx";
// Import Styling
import { Container, Row, Col, Card } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import "../assets/css/SingleLaunch.css";
// Import queries and mutations
import { SAVE_LAUNCH } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

// Define SingleLaunch page
const SingleLaunch = () => {
  // Use state to set and access launch data
  const [launchData, setLaunchData] = useState(null);
  // Use state to set and access agency data
  const [agencyData, setAgencyData] = useState(null);
  // Use mutation to fetch a user and save launch to user profile
  const [saveLaunch] = useMutation(SAVE_LAUNCH, {
    refetchQueries: [{ query: QUERY_ME }],
  });
  // Set launch id to use theParams
  const { launchId } = useParams();

  // Use effect to fetch the data from the launch and agency API urls
  useEffect(() => {
    const fetchLaunchDetails = async () => {
      try {
        const response = await fetch(
          `https://lldev.thespacedevs.com/2.2.0/launch/${launchId}/`
        );
        const data = await response.json();
        setLaunchData(data);

        const agencyUrl = data.launch_service_provider.url;

        const agencyResponse = await fetch(agencyUrl);
        const agencyData = await agencyResponse.json();
        console.log(agencyData);
        setAgencyData(agencyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLaunchDetails();
  }, [launchId]);

  // Handle the saving of a launch to the users profile
  const handleSaveLaunch = async (launchId) => {
    const launchToSave = launchData.find((launch) => launch.id === launchId);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    // If not logged in return false
    if (!token) {
      return false;
    }
    // Define the data to be saved to a users profile
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

  // If data has not been loaded return loading component
  if ((!launchData, !agencyData)) {
    return <Loading />;
  }

  // Else return page data
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="SL-Title">Spacecraft</h1>
          </Col>
        </Row>
        <Row>
          <Card className="SL-Card">
            <Container>
              <Row>
                <Col md={12} lg={6}>
                  <Card.Img
                    className="SL-Img"
                    src={launchData.image}
                  ></Card.Img>
                </Col>
                <Col md={12} lg={6}>
                  <Row>
                    <Col>
                      <Card.Body>
                        <Card.Title>{launchData.name}</Card.Title>
                        <Card.Text>
                          {launchData.launch_service_provider.name}
                        </Card.Text>
                        <Card.Text></Card.Text>
                        <Card.Text>
                          STATUS - {launchData.status.abbrev}
                        </Card.Text>
                        <Card.Text>
                          <DateParser dateString={launchData.window_start} />
                        </Card.Text>
                        <Card.Text>{launchData.status.description}</Card.Text>
                        {/* Countdown timer component to display the countdown for each launch */}
                        <CountdownTimer
                          targetDate={new Date(
                            launchData.window_start
                          ).getTime()}
                        />
                        <Row className="SL-ButtonContainer">
                          <button className="SL-Button">
                            {launchData.webcast_live ? (
                              <>WATCH LIVE</>
                            ) : (
                              "NO LIVESTREAM"
                            )}
                          </button>
                        </Row>
                        <Tooltip title="Save" arrow placement="right">
                          <button
                            onClick={() => handleSaveLaunch(launchData.id)}
                            className="SL-Button"
                          >
                            <AddIcon />
                          </button>
                        </Tooltip>
                      </Card.Body>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Card>
        </Row>
        <Row>
          <Col>
            <h1 className="SL-Title">Organisation</h1>
          </Col>
        </Row>
        <Row>
          <Card className="SL-Card">
            <Container>
              <Row>
                <Col md={12}>
                  <Row><Col md={12}>
                  <a href={agencyData.info_url} target="blank"><Card.Img
                    className="SL-Img"
                    src={agencyData.logo_url}
                  ></Card.Img>
                  </a>
                </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title className="SL-CardTitle">
                          {agencyData.name}
                        </Card.Title>
                        <Card.Text>
                            {agencyData.type}
                        </Card.Text>
                        <Card.Text>
                          Founded - {agencyData.founding_year}
                        </Card.Text>
                        <Card.Text>{agencyData.administrator}</Card.Text>
                        <Card.Text>{agencyData.description}</Card.Text>
                        <Card.Text>
                            Successful Landings: {agencyData.successful_landings}
                        </Card.Text>
                        <Card.Text>
                            Successful Launches: {agencyData.successful_launches}
                        </Card.Text>
                        <Card.Text>
                            Failed Landings: {agencyData.failed_landings}
                        </Card.Text>
                        <Card.Text>
                            Failed Launches:{agencyData.failed_launches}
                        </Card.Text>
                      </Card.Body>
                    </Col>
                  </Row>
                </Col>
                
              </Row>
            </Container>
          </Card>
        </Row>
      </Container>
    </>
  );
};

// Export page
export default SingleLaunch;
