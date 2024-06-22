const {
    handleGetTitles,
    handleGetCodeBlock,
    handleUpdateCode,
    handleDisconnect,
  } = require("./socketHandlers");
  
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
  