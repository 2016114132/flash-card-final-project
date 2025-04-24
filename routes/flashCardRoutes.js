import express from "express"
import { getHome, getEditStack } from "../controllers/flashCardController.js"

const router = express.Router();

router.get("/", getHome);
router.get("/edit", getEditStack);

export default router