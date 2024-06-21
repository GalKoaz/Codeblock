import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";

const socket = io("http://localhost:4000");

const Lobby = ({ setCurrentPage, setSelectedCodeBlockId }) => {
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
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block.id}>
            <Link to={`/code/${block.id}`} onClick={() => setSelectedCodeBlockId(block.id)}>
              {block.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Lobby;
