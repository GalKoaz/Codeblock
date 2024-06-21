import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

const Code = ({ code, setCode }) => {
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const handleChange = (event) => {
    setCurrentCode(event.target.value);
    setCode(event.target.value);
  };

  return (
    <div>
      <textarea
        value={currentCode}
        onChange={handleChange}
        rows="10"
        cols="80"
        style={{
          marginBottom: "10px",
          fontFamily: "monospace",
          fontSize: "14px",
        }}
      />
      <SyntaxHighlighter language="javascript" style={darcula}>
        {currentCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
