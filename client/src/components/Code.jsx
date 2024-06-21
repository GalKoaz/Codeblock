import React, { useEffect, useState } from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const Code = ({ code, setCode, role, handleChange }) => {
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  return (
    <div>
      {role !== "mentor" && (
        <textarea
          value={currentCode}
          onChange={(e) => {
            setCurrentCode(e.target.value);
            handleChange(e);
          }}
          rows="10"
          cols="80"
          style={{ marginBottom: "10px", fontFamily: "monospace", fontSize: "14px" }}
        />
      )}
      <SyntaxHighlighter language="javascript" style={darcula}>
        {currentCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
