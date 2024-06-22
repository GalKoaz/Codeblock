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

const socket = io("http://localhost:4000");

export default function Lobby({ setCurrentPage, setSelectedCodeBlockId }) {
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
      <div className="titles-container">
        {codeBlocks.map((block) => (
          <ol key={block.id}>
            <Link
              to={`/block/${block.id}`}
              onClick={() => setSelectedCodeBlockId(block.id)}
            >
              {block.title}
            </Link>
          </ol>
        ))}
      </div>
    </>
  );
}
