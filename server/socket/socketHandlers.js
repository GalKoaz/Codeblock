const Block = require("../models/codeBlocksModel");

const codeBlockConnections = {};

const handleGetTitles = async (socket) => {
  try {
    console.log("Fetching code block titles");
    const codeBlocks = await Block.find({}, "blockId title");
    const titles = codeBlocks.map((block) => ({
      id: block.blockId,
      title: block.title,
    }));
    socket.emit("titles", titles);
    console.log("Fetched code block titles");
  } catch (error) {
    console.error("Error fetching code block titles:", error);
  }
};

const handleGetCodeBlock = async (socket, id) => {
  try {
    const connections = codeBlockConnections[id] || [];

    if (connections.length === 0) {
      codeBlockConnections[id] = [socket.id];
      socket.emit("role", "mentor");
    } else {
      codeBlockConnections[id].push(socket.id);
      socket.emit("role", "student");
    }

    console.log('User joined code block', id, codeBlockConnections[id]);

    console.log(`Fetching code block with id ${id}`);
    const codeBlock = await Block.findOne({ blockId: id }).lean();
    socket.emit("codeBlock", {
      code: codeBlock.code,
      title: codeBlock.title,
      solution: codeBlock.solution,
    });
    console.log(`Fetched code block with id ${id}`);

    socket.join(id);
  } catch (error) {
    console.error(`Error fetching code block with id ${id}:`, error);
  }
};

const handleUpdateCode = (io, socket, { id, newCode }) => {
  console.log(`Code updated for block ${id}: ${newCode}`);
  io.to(id).emit("codeUpdated", newCode);
};

const handleDisconnect = (socket) => {
  Object.keys(codeBlockConnections).forEach((id) => {
    const index = codeBlockConnections[id].indexOf(socket.id);
    if (index !== -1) {
      codeBlockConnections[id].splice(index, 1);
      if (codeBlockConnections[id].length === 0) {
        delete codeBlockConnections[id];
      }
    }
  });
  console.log("User disconnected", socket.id);
};

module.exports = {
  handleGetTitles,
  handleGetCodeBlock,
  handleUpdateCode,
  handleDisconnect,
};
