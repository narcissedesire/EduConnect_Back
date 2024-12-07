import { Router } from "express";
import {
  createConversation,
  getUsersWithStatusAndConversation,
  readConversation,
} from "../controllers/conversation.js";

export const routeConversation = Router();

routeConversation.get("/:id", readConversation);
routeConversation.post("/create", createConversation);
routeConversation.get("/getUserEnligne/:id", getUsersWithStatusAndConversation);
