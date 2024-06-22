import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams, useNavigate } from "react-router-dom";
import Code from "./Code";
import Modal from "./Modal";
import SolutionConfirm from "./SolutionConfirm";

/*
  CodeBlock component description:
  This component is rendered when a user selects a code block from the lobby.
  It displays the code block title, code editor, and a button to return to the lobby.
  It also listens for changes to the code editor and emits the updated code to the server.
  The CodeBlock component uses the useParams and useNavigate hooks from react-router-dom.
  The useParams hook is used to access the id parameter from the URL.
*/

const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:4000';

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
    socketRef.current = io(BASE_URL);

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
