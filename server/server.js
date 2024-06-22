const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlocks");
const connectDB = require("./db");
const setupSocket = require("./socket/setupSocket");
const path = require("path");
/*
  server.js description:
  This file is the entry point for the server application.
  It sets up the express server, connects to the database, and configures the socket.io server.
  It also listens for incoming connections on the specified port.
*/

dotenv.config();

const app = express();
const server = http.createServer(app);

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.resolve(__dirname, 'public')));
}else{
  const corsOptions = {
    origin: "https://codeblockfront-production.up.railway.app",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  };
  app.use(cors(corsOptions));
}

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "https://codeblockfront-production.up.railway.app", "https://code-block-front.vercel.app"],
    methods: ["GET", "POST"],
  },
});

connectDB();

app.use(express.json());
app.use("/", codeBlockRoutes);

setupSocket(io);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`)
);
