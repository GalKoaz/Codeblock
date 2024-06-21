import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:4000");


export default function Lobby({ setCurrentPage, setSelectedCodeBlockId }) {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/")
      .then((response) => response.json())
      .then((data) => setCodeBlocks(data));
  }, []);

  const handleItemClick = (id) => {
    setSelectedCodeBlockId(id);
    setCurrentPage("CodeBlock");
  };

  return (
    <div>
      <h1>Choose code block</h1>
      <ul>
        {codeBlocks.map((block) => (
          <li key={block._id} onClick={() => handleItemClick(block._id)}>
            {block.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
