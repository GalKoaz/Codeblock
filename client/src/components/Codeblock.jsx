import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Code from "./Code";
import Modal from "./Modal";
import SolutionConfirm from "./SolutionConfirm";

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
  const [ModalOpen, setModalOpen] = useState(false);
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
    if (codeBlock.solution === newCode) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  };

  return (
    <>
      {codeBlock.title ? (
        <>
          <h1>{codeBlock.title}</h1>
          <h2 className="role">Role: {role}</h2>
          <Modal open={ModalOpen} onClose={() => setModalOpen(false)}>
            <SolutionConfirm onConfirm={() => setModalOpen(false)} />
          </Modal>
          <Code
            code={userCode}
            setCode={setUserCode}
            role={role}
            handleChange={handleChange}
          />
          <div className="button-container">
            <button
              className="back-to-lobby-button"
              onClick={() => navigate("/")}
            >
              Back to Lobby
            </button>
          </div>
        </>
      ) : (
        <h1>Loading code block...</h1>
      )}
    </>
  );
}
