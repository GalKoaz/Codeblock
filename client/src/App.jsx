import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import CodeBlock from "./components/Codeblock";

import Lobby from "./components/Lobby";

export default function App() {
  const routes = [
    { path: "/", element: <Lobby /> },
    { path: "/code/:id", element: <CodeBlock /> },
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