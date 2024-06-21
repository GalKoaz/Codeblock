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

  useEffect(() => {
    const socket = io("http://localhost:4000");

    if (id) {
      socket.emit("getCodeBlock", id);

      socket.on("codeBlock", ({ title, code, solution }) => {
        setCodeBlock({ title, code, solution });
      });

      return () => {
        socket.off("codeBlock");
      };
    }
  }, [id]);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Lobby</button>
      <h1>{codeBlock ? codeBlock.title : "None"}</h1>
      <h2>Role:</h2>
      {codeBlock ? (
        <>
          <Code code={codeBlock.code} />
        </>
      ) : (
        <p>Loading code block...</p>
      )}
    </div>
  );
}
