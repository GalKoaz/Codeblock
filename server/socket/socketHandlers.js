const Block = require("../models/codeBlocksModel");

/*
  socketHandlers.js description:
  This file contains the event handlers for the socket events.
  It defines the logic to handle the different events that occur on the socket connection.
*/

const Connections = {};

/*
  handleGetTitles function description:
  This function fetches the code block titles from the database and emits them to the client.
  It sends the titles to the client when the client requests them.
*/
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

/*
  handleGetCodeBlock function description:
  This function fetches the code block with the specified id from the database and emits it to the client.
  It sends the code block to the client when the client requests it.
*/
const handleGetCodeBlock = async (socket, id) => {
  try {
    const connections = Connections[id] || [];

    if (connections.length === 0) {
      Connections[id] = [socket.id];
      socket.emit("role", "mentor");
    } else {
      Connections[id].push(socket.id);
      socket.emit("role", "student");
    }

    console.log("User joined code block", id, Connections[id]);

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

/*
    handleUpdateCode function description:
    This function updates the code block with the specified id in the database and emits the updated code to the client.
    It sends the updated code to the client when the client updates it.
*/

const handleUpdateCode = (io, socket, { id, newCode }) => {
  console.log(`Code updated for block ${id}: ${newCode}`);
  io.to(id).emit("codeUpdated", newCode);
};

/*
    handleDisconnect function description:
    This function removes the socket id from the code block connections when a user disconnects.
    It removes the socket id from the code block connections when the user disconnects.
*/

const handleDisconnect = (socket) => {
  Object.keys(Connections).forEach((id) => {
    const index = Connections[id].indexOf(socket.id);
    if (index !== -1) {
      Connections[id].splice(index, 1);
      if (Connections[id].length === 0) {
        delete Connections[id];
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
