const {
    handleGetTitles,
    handleGetCodeBlock,
    handleUpdateCode,
    handleDisconnect,
  } = require("./socketHandlers");


  /*
    setupSocket.js description:
    This file contains the logic to set up the socket.io server.
    It listens for incoming connections and defines the event handlers for the socket events.
  */
  
  const setupSocket = (io) => {
    io.on("connection", (socket) => {
      console.log("New client connected", socket.id);
  
      socket.on("getTitles", () => handleGetTitles(socket));
  
      socket.on("getCodeBlock", (id) => handleGetCodeBlock(socket, id));
  
      socket.on("updateCode", (data) => handleUpdateCode(io, socket, data));
  
      socket.on("disconnect", () => handleDisconnect(socket));
    });
  };
  
  module.exports = setupSocket;
  