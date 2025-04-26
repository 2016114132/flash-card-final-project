import express from "express"
import {
    getHome,
    getEditStack,
    getCards,
    addCard,
    updateCard,
    deleteCard
  } from "../controllers/flashCardController.js";

const router = express.Router();

// Web views
router.get("/", getHome);
router.get("/edit", getEditStack);

// Endpoints
router.get("/get-cards", getCards); 
router.post("/cards", addCard);
router.put("/cards/:id", updateCard);
router.delete("/card/:id", deleteCard);

export default router