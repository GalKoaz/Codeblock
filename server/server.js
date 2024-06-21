const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const codeBlockRoutes = require("./routes/codeBlocks");
const Block = require("./models/codeBlocksModel");

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

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log(error.message));

app.use(cors());
app.use(express.json());

// Routes
app.get("/", async (req, res) => {
  try {
    console.log("Fetching code block titles");
    const codeBlocks = await Block.find({}, "blockId title");
    const titles = codeBlocks.map((block) => ({
      id: block.blockId,
      title: block.title,
    }));
    console.log(titles);
    res.json(titles);
    console.log("Fetched code block titles");
  } catch (error) {
    console.error("Error fetching code block titles:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//app.use("/", codeBlockRoutes);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);

// // Socket.io connection handler
// io.on("connection", (socket) => {
//   console.log("New client connected");

//   // Handle socket events here
//   socket.on("getBlocks", async () => {
//     try {
//       console.log("Fetching code block titles");
//       const codeBlocks = await CodeBlocks.find({}, "blockid title");
//       const titles = codeBlocks.map((codeBlock) => ({
//         id: codeBlock.blockid,
//         title: codeBlock.title,
//       }));
//       socket.emit("titles", titles);
//       console.log("Fetched code block titles");
//     } catch (error) {
//       console.error("Error fetching code block titles:", error);
//     }
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });
