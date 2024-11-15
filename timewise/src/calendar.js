import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Calendar() {
  const [date, setDate] = useState(new Date());

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (month, year) =>
    new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null); // Add empty cells before the first day
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day); // Add days of the current month
  }
  while (calendarDays.length % 7 !== 0) {
    calendarDays.push(null); // Fill the remaining cells to complete the last week
  }

  // Break days into weeks (arrays of 7)
  const weeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    weeks.push(calendarDays.slice(i, i + 7));
  }

  const handlePrevMonth = () => {
    setDate(new Date(currentYear, currentMonth - 1));
  };

  const handleNextMonth = () => {
    setDate(new Date(currentYear, currentMonth + 1));
  };

  return (
    <Container fluid className="min-vh-100 d-flex flex-column p-2 card-bg">
      <Row className="my-3 justify-content-between align-items-center">
        <Col xs="auto">
          <Button onClick={handlePrevMonth} variant="outline-primary">
            Previous
          </Button>
        </Col>
        <Col className="text-center">
          <h4>
            {date.toLocaleString("default", { month: "long", year: "numeric" })}
          </h4>
        </Col>
        <Col xs="auto">
          <Button onClick={handleNextMonth} variant="outline-primary">
            Next
          </Button>
        </Col>
      </Row>

      <Row className="text-center fw-bold card-bg">
        {daysOfWeek.map((day) => (
          <Col key={day} className="border p-2">
            {day}
          </Col>
        ))}
      </Row>

      <div className="card-bg flex-grow-1 d-flex flex-column">
        {weeks.map((week, index) => (
          <Row key={index} className="flex-fill text-center">
            {week.map((day, idx) => (
              <Col
                key={idx}
                className="border p-3 d-flex align-items-center justify-content-center card-bg"
                style={{
                  minHeight: "100px", // Ensure consistent height
                  backgroundColor: "#f8f9fa", // Same background for all cells
                  color: day ? "black" : "transparent", // Hide text for empty cells
                }}
              >
                {day || ""}
              </Col>
            ))}
          </Row>
        ))}
      </div>
    </Container>
  );
}

export default Calendar;
