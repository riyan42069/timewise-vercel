// Home.js
import React from "react";
import PomodoroTimer from "./components/pomodoro"; // Import the Pomodoro timer component
import { Container, Row, Col, Card } from "react-bootstrap";
import Tasks from "./components/tasks";
import Calendar from "./calendar";

function Home() {
  return (
    <div className="bg" fluid>
      <Container className="mt-0 " fluid>
        <Row>
          {/* Main content section */}
          <Col md={8}>
            <h1>Welcome to the Homepage</h1>
            <p>
              This is your main application page where you can access all
              features.
            </p>
          </Col>
        </Row>
        <Row>
          {/* Sidebar section with Pomodoro timer */}
          <Col md={3}>
            <Card className="shadow-sm nav-bg">
              <Card.Body>
                <PomodoroTimer />
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm nav-bg">
              <Card.Body>
                <Tasks />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm nav-bg" style={{ height: "40vh" }}>
              <Card.Body>
                <Calendar />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
