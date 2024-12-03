import dotenv from "dotenv";
import express, { query } from "express";
import cors from "cors";
import { rootRouter } from "./routes/index.js";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server } from "socket.io";
import { createFichier, uploadFichier } from "./controllers/fichierPDF.js";
import { createVideos, uploadVideo } from "./controllers/video.js";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.urlencoded({ extended: true }));

app.post("/createFichier", uploadFichier.single("file"), createFichier);
app.post("/createVideo", uploadVideo.single("file"), createVideos);

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: [query],
});

const PORT = process.env.PORT || 5001;

let users = [];

const addUser = (id, socketId) => {
  !users.some((user) => user.id === id) && users.push({ id, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  // Envoyer et recevoir des messages
  socket.on("sendMessage", ({ id_sender, id_conversation, text }) => {
    const recipient = getUser(id_conversation);
    if (recipient) {
      io.to(recipient.socketId).emit("getMessage", {
        id_sender,
        text,
        createdAt: new Date().toISOString(),
      });
    }
  });

  // Gérer la déconnexion
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
