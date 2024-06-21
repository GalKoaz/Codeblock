import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import CodeBlock from "./components/Codeblock";
import NotFound from "./components/NotFound";
import Lobby from "./components/Lobby";

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