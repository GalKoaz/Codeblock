import React, { useEffect, useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

/*
  Code component description:
  This component displays the code block that the user is working on.
  It accepts props for code, setCode, role, and handleChange.
  The code prop is the code block that the user is working on.
  The setCode prop is a function to update the code block.
  The role prop is the user's role.
  The handleChange prop is a function to handle changes to the code block.
*/

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
