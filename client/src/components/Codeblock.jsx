import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Code from "./Code";
import Modal from "./Modal";
import SolutionConfirm from "./SolutionConfirm";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:4000";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    const socket = io(BASE_URL);
    socketRef.current = socket;

    socket.emit("getCodeBlock", id);
    socket.on("codeBlock", handleCodeBlock);
    socket.on("role", handleRole);
    socket.on("codeUpdated", handleCodeUpdated);

    return () => socket.disconnect();
  }, [id]);

  const handleCodeBlock = ({ title, code, solution }) => {
    setCodeBlock({ title, code, solution });
    setUserCode(code);
  };

  const handleRole = (role) => setRole(role);

  const handleCodeUpdated = (updatedCode) => setUserCode(updatedCode);

  const handleChange = (event) => {
    const newCode = event.target.value;
    setUserCode(newCode);
    socketRef.current.emit("updateCode", { id, newCode });
    setIsModalOpen(codeBlock.solution === newCode);
  };

  if (!codeBlock.title) return <h1>Loading code block...</h1>;

  return (
    <>
      <h1>{codeBlock.title}</h1>
      <h2 className="role">Role: {role}</h2>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <SolutionConfirm onConfirm={() => setIsModalOpen(false)} />
      </Modal>
      <Code
        code={userCode}
        setCode={setUserCode}
        role={role}
        handleChange={handleChange}
      />
      <div className="button-container">
        <button className="back-to-lobby-button" onClick={() => navigate("/")}>
          Back to Lobby
        </button>
      </div>
    </>
  );
}
