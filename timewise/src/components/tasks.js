import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { db } from "../firebase"; // Adjust the path based on your project structure
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);

  // Fetch the authenticated user
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null); // Handle user not logged in
      }
    });
    return () => unsubscribeAuth();
  }, []);

  // Fetch tasks from Firestore for the specific user when the component mounts
  useEffect(() => {
    if (!user) return; // Wait until the user is available

    const userTasksCollection = collection(db, "tasks", user.uid, "userTasks");

    const unsubscribe = onSnapshot(userTasksCollection, (snapshot) => {
      setTasks(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [user]);

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = async (event) => {
    event.preventDefault();
    const newTaskTitle = event.target.elements.taskTitle.value;
    const newTaskDueDate = event.target.elements.taskDueDate.value;
    if (newTaskTitle.trim() && newTaskDueDate && user) {
      try {
        await addDoc(collection(db, "tasks", user.uid, "userTasks"), {
          title: newTaskTitle,
          dueDate: newTaskDueDate,
          completed: false,
        });
        event.target.reset();
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      <Card
        style={{ width: "24rem" }}
        className="text-center p-3 shadow card-bg"
      >
        <Card.Body>
          <Card.Title>My Tasks</Card.Title>
          <ListGroup className="my-3">
            {tasks.map((task) => (
              <ListGroup.Item
                key={task.id}
                variant={task.completed ? "success" : "light"}
                className="d-flex justify-content-between align-items-center"
              >
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <br />
                <small>Due: {task.dueDate || "No due date"}</small>
                <Button
                  variant={task.completed ? "secondary" : "primary"}
                  onClick={() => toggleTaskCompletion(task.id)}
                  size="sm"
                >
                  {task.completed ? "Undo" : "Complete"}
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Form onSubmit={addTask} className="d-flex">
            <Form.Control
              type="text"
              name="taskTitle"
              placeholder="New Task"
              className="me-2"
            />
            <Form.Control type="date" name="taskDueDate" className="mb-2" />
            <Button type="submit" variant="primary">
              Add
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Tasks;
