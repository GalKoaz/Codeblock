import React, { useState, useEffect, Link } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Code from "./Code";

export default function CodeBlock() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [codeBlock, setCodeBlock] = useState({
    title: "",
    code: "",
    solution: "",
  });
  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    const socket = io("http://localhost:4000");

    if (id) {
      socket.emit("getCodeBlock", id);

      socket.on("codeBlock", ({ title, code, solution }) => {
        setCodeBlock({ title, code, solution });
        setUserCode(code);
      });

      return () => {
        socket.off("codeBlock");
      };
    }
  }, [id]);


  const handleRunCode = () => {
    if (userCode === codeBlock.solution) {
      alert("Code matches the solution!");
    } else {
      alert("Code does not match the solution.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Lobby</button>
      <h1>{codeBlock ? codeBlock.title : "None"}</h1>
      <h2>Role:</h2>
      {codeBlock ? (
        <>
          <Code code={userCode} setCode={setUserCode} />
          <button onClick={handleRunCode}>Run</button>
        </>
      ) : (
        <p>Loading code block...</p>
      )}
    </div>
  );
}
