import { Router } from "express";
import { createMessage, readMessage } from "../controllers/message.js";

export const routeMessage = Router();
routeMessage.get("/:id", readMessage);
routeMessage.post("/create", createMessage);
