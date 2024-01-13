import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../../utils/auth.js";
// Import Components
import SaveButton from "../../components/Buttons/SaveButton.jsx";
import CountdownTimer from "../../components/Countdown/Countdown.jsx";
import DateParser from "../../components/DateParser/DateParser.jsx";
import Loading from "../../components/Loading/Loading.jsx";
// Import Styling
import { Container, Row, Col, Card } from "react-bootstrap";
import AddIcon from "@mui/icons-material/Add";
import "./SingleLaunch.css";
// Import queries and mutations
import { SAVE_LAUNCH } from "../../utils/mutations.js";
import { QUERY_ME } from "../../utils/queries.js";

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
        setAgencyData(agencyData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLaunchDetails();
  }, [launchId]);

  // Handle the saving of a launch to the users profile
  const handleSaveLaunch = async () => {
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
            launchId: launchData.id,
            name: launchData.name,
            status: launchData.status.abbrev,
            provider: launchData.launch_service_provider.name,
            location: launchData.location,
            date: launchData.window_start,
            image: launchData.image,
            webcastLive: launchData.webcast_live ? "true" : "false",
          },
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // If data has not been loaded return loading component
  if ((!launchData, !agencyData)) {
    return <Loading />;
  }

  // Prepare token for use in page rendering
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  // If user is logged in, return the first page, else return the following page.
  if (token) {
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
                          <DateParser dateString={launchData.window_start} />
                          <Card.Text>{launchData.status.description}</Card.Text>
                          {/* Countdown timer component to display the countdown for each launch */}
                          <CountdownTimer
                            targetDate={new Date(
                              launchData.window_start
                            ).getTime()}
                          />
                          <SaveButton
                            value={<AddIcon />}
                            onClick={() => handleSaveLaunch(launchData.id)}
                          />
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
                    <Row>
                      <Col md={12}>
                        <a href={agencyData.info_url} target="blank">
                          <Card.Img
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
                          <Card.Text>{agencyData.type}</Card.Text>
                          <Card.Text>
                            Founded - {agencyData.founding_year}
                          </Card.Text>
                          <Card.Text>{agencyData.administrator}</Card.Text>
                          <Card.Text>{agencyData.description}</Card.Text>
                          <Card.Text>
                            Successful Landings:{" "}
                            {agencyData.successful_landings}
                          </Card.Text>
                          <Card.Text>
                            Successful Launches:{" "}
                            {agencyData.successful_launches}
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
  } else {
    // If user is not logged in load this page
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
                          <DateParser dateString={launchData.window_start} />
                          <Card.Text>{launchData.status.description}</Card.Text>
                          {/* Countdown timer component to display the countdown for each launch */}
                          <CountdownTimer
                            targetDate={new Date(
                              launchData.window_start
                            ).getTime()}
                          />
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
                    <Row>
                      <Col md={12}>
                        <a href={agencyData.info_url} target="blank">
                          <Card.Img
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
                          <Card.Text>{agencyData.type}</Card.Text>
                          <Card.Text>
                            Founded - {agencyData.founding_year}
                          </Card.Text>
                          <Card.Text>{agencyData.administrator}</Card.Text>
                          <Card.Text>{agencyData.description}</Card.Text>
                          <Card.Text>
                            Successful Landings:{" "}
                            {agencyData.successful_landings}
                          </Card.Text>
                          <Card.Text>
                            Successful Launches:{" "}
                            {agencyData.successful_launches}
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
  }
};
// Export page
export default SingleLaunch;
