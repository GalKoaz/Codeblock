// Imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const codeBlockSchema = new mongoose.Schema({
  title: String,
  code: String,
  solution: String,
  blockid: int,
});


const CodeBlock = mongoose.model('CodeBlock', codeBlockSchema);

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Database connection
dotenv.config();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;
