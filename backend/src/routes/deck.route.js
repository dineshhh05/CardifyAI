import express from "express";
import { createDeck, getAllDecks, removeDeckByTopic, getCardsByTopic } from "../controllers/deck.controller.js";

const router = express.Router();


router.post("/create", createDeck);

router.get("/get-decks", getAllDecks);

router.post("/delete-deck", removeDeckByTopic);

router.post("/get-cards-by-topic", getCardsByTopic);


export default router;
