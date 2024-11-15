import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import Home from "./home";
import PomodoroTimer from "./components/pomodoro";
import Tasks from "./components/tasks";
import Calendar from "./calendar";
import ProtectedRoute from "./protectedRoute";
import Layout from "./layout"; // Import ProtectedRoute

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/pomodoro"
              element={
                <ProtectedRoute>
                  <PomodoroTimer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <Calendar />
                </ProtectedRoute>
              }
            />

            {/* Landing page for all other paths */}
            {/*<Route path="*" element={<LandingPage />} /> */}
          </Routes>
        </Layout>
      </Router>
    </>
  );
}

export default App;
