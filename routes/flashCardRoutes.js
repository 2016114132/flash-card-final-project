import express from "express"
import { getHome, getEditStack, postSaveStack, getCards } from "../controllers/flashCardController.js";

const router = express.Router();

router.get("/", getHome);
router.get("/edit", getEditStack);
router.post("/save-stack", postSaveStack);

router.get("/get-cards", getCards); 

export default router