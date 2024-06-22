import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import CodeBlock from "./components/Codeblock";
import NotFound from "./components/NotFound";
import Lobby from "./components/Lobby";

/*
  App component description:
  This is the main component of the application.
  It uses the BrowserRouter, Routes, and Route components from react-router-dom to define the routes of the application.
  It renders the Lobby, CodeBlock, and NotFound components based on the current route.
*/

export default function App() {
  const routes = [
    { path: "/", element: <Lobby /> },
    { path: "/block/:id", element: <CodeBlock /> },
    { path: "*", element: <NotFound /> },
  ];

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
};