import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import AddIcon from '@mui/icons-material/Add';

const styles = {
  cardStyles: {
    padding: "12px 0px",
    backgroundColor: "#FF4D00",
    margin: "24px",
    color: "black",
  },
  imgStyles: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  titleStyles: {
    color: "FF4D00",
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonStyles: {
    width: '180px',
    backgroundColor: "#120401",
    border: "1px solid #FF4D00",
    color: "#FF4D00",
    borderRadius: '15px'
  },
};

function Launch() {
  const [launchData, setLaunchData] = useState([]);

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

  return (
    <Container>
      <Row>
        <Col>
          {launchData.length > 0 &&
            launchData.map((launch) => (
              <Card style={styles.cardStyles} key={launch.id}>
                <Container>
                  <Row>
                    <Col>
                      <Card.Img
                        style={styles.imgStyles}
                        variant="top"
                        src={launch.image}
                      ></Card.Img>
                    </Col>
                    <Col>
                      <Card.Body>
                        <Card.Title style={styles.titleStyles}>
                          {launch.name}
                        </Card.Title>
                        <Card.Text>
                          {launch.launch_service_provider.name}
                        </Card.Text>
                        <Card.Text>{launch.status.abbrev}</Card.Text>
                        <Card.Text>{launch.window_start}</Card.Text>
                        <Row style={styles.buttonContainer}>
                          <button style={styles.buttonStyles}>
                            {launch.webcast_live ? (
                              <>
                                <PlayCircleFilledIcon /> WATCH LIVE
                              </>
                            ) : (
                              "NO LIVESTREAM"
                            )}
                          </button>
                        </Row>
                        <Row style={styles.buttonContainer}>
                          <button style={styles.buttonStyles}>MORE INFO</button>
                        </Row>
                        <Row style={styles.buttonContainer}>
                          <button style={styles.buttonStyles}>
                            <AddIcon />
                          </button>
                        </Row>
                      </Card.Body>
                    </Col>
                  </Row>
                </Container>
              </Card>
            ))}
        </Col>
      </Row>
    </Container>
  );
}

export default Launch;