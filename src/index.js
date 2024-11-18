import dotenv from "dotenv";
import express, { query } from "express";
import cors from "cors";
import { rootRouter } from "./routes/index.js";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Méthodes autorisées
    allowedHeaders: ["Content-Type"], // En-têtes autorisés
  })
);

app.use(express.json());

app.use("/api", rootRouter);

export const prismaClient = new PrismaClient({
  log: [query],
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
