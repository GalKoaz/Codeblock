import { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Lobby from "./components/Lobby";

export default function App() {
  const [currentPage, setCurrentPage] = useState("Lobby");
  const [selectedBlock, setSelectedBlock] = useState(null);

  
  // const routeDefinitions = createRoutesFromElements(
  //   <Route>
  //     <Route path="/" element={<Lobby />} />
  //     <Route path="/code/:id"  />
  //   </Route>
  // );

 // const router = createBrowserRouter(RouterProvider);


  return (
    <>
      <h1>Welcome</h1>
    </>
  );
};