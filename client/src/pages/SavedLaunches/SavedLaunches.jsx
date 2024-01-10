import { useQuery, useMutation } from "@apollo/client";
// Import Comonents
import CountdownTimer from "../../components/Countdown/Countdown.jsx";
import DateParser from "../../components/DateParser/DateParser.jsx";
import Loading from "../../components/Loading/Loading.jsx";
// Import Styling
import { motion } from "framer-motion";
import { Container, Card, Row, Col } from "react-bootstrap";
import ClearIcon from "@mui/icons-material/Clear";
import Tooltip from "@mui/material/Tooltip";
import "./SavedLaunches.css";
// Import Queries and Mutations
import { QUERY_ME } from "../../utils/queries";
import { REMOVE_LAUNCH } from "../../utils/mutations";
// Import Auth
import Auth from "../../utils/auth";
import SaveButton from "../../components/Buttons/SaveButton.jsx";

// Define SavedLaunches page
function SavedLaunches() {
  // Use query to fetch data
  const { loading, data } = useQuery(QUERY_ME);
  // Use mutation to remove launch data
  const [removeLaunch] = useMutation(REMOVE_LAUNCH);

  // Function to remove launches from a logged in users profile
  const handleRemoveLaunch = async (launchId) => {
    try {
      await removeLaunch({
        variables: { launchId },
        refetchQueries: [{ query: QUERY_ME }],
      });
    } catch (error) {
      console.error(error);
    }
  };

  // If loading return loading component
  if (loading) {
    return <Loading />;
  }

  const { me } = data;
  // Check if the user is logged in
  if (!Auth.loggedIn()) {
    return <div>You must be logged in to view your saved launches.</div>;
  } else if (me.savedLaunches.length === 0) {
    return (
      <>
        <svg
          height="100"
          stroke="#072448"
          strokeWidth="1.25"
          className="SVL-text-line"
          width="100%"
        >
          <text x="50%" dominantBaseline="middle" textAnchor="middle" y="50%">
            NO SAVED LAUNCHES
          </text>
        </svg>
      </>
    );
  }

  // Else return page data
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className="SVL-Title">Your Launches</h1>
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
                <Card className="SVL-Card">
                  <Container>
                    <Row>
                      <Col md={12} lg={4}>
                        <Card.Img
                          className="SVL-Img"
                          variant="top"
                          src={launch.image}
                        />
                      </Col>
                      <Col md={12} lg={8}>
                        <Card.Body>
                          <Card.Title className="SVL-CardTitle">
                            {launch.name}
                          </Card.Title>
                          <Card.Text>{launch.provider}</Card.Text>
                          <Card.Text>{launch.status}</Card.Text>
                          <Card.Text>
                            <DateParser dateString={launch.date} />
                          </Card.Text>
                          <CountdownTimer
                            targetDate={new Date(launch.date).getTime()}
                          />
                          <Tooltip title="Remove" arrow placement="right">
                            <SaveButton
                              value={<ClearIcon />}
                              onClick={() =>
                                handleRemoveLaunch(launch.launchId)
                              }
                            >
                              <ClearIcon />
                            </SaveButton>
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

// Export page
export default SavedLaunches;
