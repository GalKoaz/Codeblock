import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Code({ code, setCode, role, handleChange }){
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  return (
    <>
      {role !== "mentor" && (
        <textarea
          value={currentCode}
          onChange={(e) => {
            setCurrentCode(e.target.value);
            handleChange(e);
          }}
          rows="10"
          cols="100"
          style={{
            width: "99%",
            marginBottom: "10px",
            fontFamily: "monospace",
            fontSize: "14px",
          }}
        />
      )}
      <div className="code">
        <SyntaxHighlighter language="javascript" style={darcula}>
          {currentCode}
        </SyntaxHighlighter>
      </div>
    </>
  );
};
