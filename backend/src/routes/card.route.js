import express from "express";
import { createCards } from "../controllers/card.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/create", createCards);


export default router;

