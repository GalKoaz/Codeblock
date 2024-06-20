import React, { useState } from "react";

export default function Lobby({ setCurrentPage, setSelectedCodeBlockId }) {
  const [codeBlocks, setCodeBlocks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/codeblocks") // Replace with your backend URL
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
