import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

/*
  Lobby component description:
  This component is rendered when a user first visits the application.
  It displays a list of code block titles that the user can select to view the code block.
  It uses the useState and useEffect hooks to manage the state of the code blocks.
  It uses the socket.io-client library to connect to the server and retrieve the code blocks.
*/

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:4000";

const socket = io(BASE_URL);

export default function Lobby() {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    socket.emit("getTitles");

    socket.on("titles", (titles) => {
      setCodeBlocks(titles);
    });

    return () => {
      socket.off("titles");
    };
  }, []);

  return (
    <>
      <h1>Choose code block</h1>
      {codeBlocks.length === 0 ? (
        <h2>Loading...</h2>
      ) : (
        <div className="titles-container">
          {codeBlocks.map((block) => (
            <ol key={block.id}>
              <Link to={`block/${block.id}`}>{block.title}</Link>
            </ol>
          ))}
        </div>
      )}
    </>
  );
}
