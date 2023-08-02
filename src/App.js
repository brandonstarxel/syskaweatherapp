import * as React from "react";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Main from "./pages/Main.jsx";
import Results from "./pages/Results.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Main />
      ),
    },
    {
      path: "results",
      element: <Results />,
    },
  ]);

  return (
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Syska Hennessy Group</Navbar.Brand>
        </Container>
      </Navbar>
    <RouterProvider router={router} />
    <footer className="footer mt-auto py-3 bg-dark text-white">
        <Container className="text-center">
          <span>2023 by M2x.AI</span>
        </Container>
      </footer>
    </div>
  );
}

export default App;