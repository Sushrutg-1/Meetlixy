import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { createServer } from "node:http";

import { Server } from "socket.io";
import { connectToSocket } from "./controllers/socketManager.js";

const app = express();
const server = createServer(app);
const io = connectToSocket(server);

const PORT = process.env.PORT || 8000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json({ limit: "40kb" }));
app.use(express.urlencoded({ limit: "40kb", extended: true }));

//Routes
app.get("/home", (req, res) => {
  return res.json({ home: "This is home route" });
});

const start = async () => {
  const connectionDB = await mongoose.connect(MONGO_URI);
  console.log(`Mongo connected DB host : ${connectionDB.connection.host}`);
  server.listen(app.get(PORT), () => {
    console.log(`LISTENING ON PORT ${PORT}`);
  });
};

start();
