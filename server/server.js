const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlocks");
const connectDB = require("./db");
const setupSocket = require("./socket/setupSocket");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

connectDB();

app.use(cors());
app.use(express.json());
app.use("/", codeBlockRoutes);

setupSocket(io);

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server is running on http://localhost:${process.env.PORT || 5000}`)
);
