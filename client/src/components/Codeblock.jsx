import React, { useState, useEffect, useRef } from "react";
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
  const [role, setRole] = useState("");
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");

    if (id) {
      socketRef.current.emit("getCodeBlock", id);

      socketRef.current.on("codeBlock", ({ title, code, solution }) => {
        setCodeBlock({ title, code, solution });
        setUserCode(code);
      });

      socketRef.current.on("role", (role) => {
        setRole(role);
      });

      socketRef.current.on("codeUpdated", (updatedCode) => {
        setUserCode(updatedCode);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [id]);

  const handleChange = (event) => {
    const newCode = event.target.value;
    setUserCode(newCode);
    socketRef.current.emit("updateCode", { id, newCode });
  };

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
      <h1>{codeBlock.title || "None"}</h1>
      <h2>Role: {role}</h2>
      {codeBlock.title ? (
        <>
          <Code code={userCode} setCode={setUserCode} role={role} handleChange={handleChange} />
          {role !== "mentor" && <button onClick={handleRunCode}>Run</button>}
        </>
      ) : (
        <p>Loading code block...</p>
      )}
    </div>
  );
}
