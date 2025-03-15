import FlashcardDeck from "../models/flashcardDeck.model.js";
import User from "../models/user.model.js";
import {createCards} from "../controllers/card.controller.js"


export const createDeck = async (req,res) => {
    const {promptData} = req.body;
    const topic = promptData.deckTopic;

    try {
        const userId = req.user._id;
        const flashcards = await createCards(promptData);

        if (!flashcards || flashcards.length === 0) {
            return res.status(400).json({ message: "No flashcards created" });
        }

        const newDeck = new FlashcardDeck({
            topic: topic,
            createdBy: userId,
            flashcards: flashcards
        });

        await newDeck.save();

        const user = await User.findById(userId);
        user.decks.push(newDeck._id);
        await user.save();

        res.status(201).json({
            _id: newDeck._id,
            topic: newDeck.topic,
            createdBy: newDeck.createdBy,
            flashcards: newDeck.flashcards
        });

    } catch (error) {
        console.log("Error in createDeck controller", error.message); 
        res.status(500).json({message: "Internal Server Error: " + error.message});
    }


}

export const getAllDecks = async (req,res) => {
    const userId = req.user._id;

    try {
        const userDecks = await User.findById(userId)
            .populate({
                path: 'decks',
                populate: { path: 'flashcards' } // Populate flashcards inside each deck
            })
            .then(user => user?.decks || []);

        res.status(200).json(userDecks);
    } catch (error) {
        console.log("Error in getAllDecks controller", error.message);
        res.status(500).json({message: "Error fetching decks" + error.message});
    }
}

export const getCardsByTopic = async (req, res) => {
    const { topic } = req.body; 
    const userId = req.user._id;

    try {

        const user = await User.findById(userId).populate({
            path: 'decks',
            populate: { path: 'flashcards' } // Ensure flashcards inside decks are populated
        });

        if (!user || !user.decks) {
            return res.status(404).json({ error: "User or decks not found" });
        }

        // Find the deck by topic
        const deck = user.decks.find(deck => deck.topic === topic);

        if (!deck) {
            return res.status(404).json({ error: "Deck not found for this topic" });
        }

        const questions = deck.flashcards.map(flashcard => flashcard.question);
        const answers = deck.flashcards.map(flashcard => flashcard.answer);

        return res.json({ questions, answers });
    } catch (error) {
        console.error("Error in getCardsByTopic controller:", error.message);
        return res.status(500).json({ error: "Server error: " + error.message });
    }
};

export const removeDeckByTopic = async(req, res) => {
    const { topic } = req.body; 
    const userId = req.user._id;

    try {
        // get users decks
        const user = await User.findById(userId).populate({
            path: 'decks',
            populate: { path: 'flashcards' } // Ensure flashcards inside decks are populated
        });

        // find the deck with topic 
        const deckIndex = user.decks.findIndex(deck => deck.topic === topic);

        if (deckIndex === -1) {
            return res.status(404).json({ message: "Deck not found" });
        }

        // remove that deck from users decks 
        user.decks.splice(deckIndex, 1);

        await user.save();

        res.status(200).json({ message: "Deck removed successfully", decks: user.decks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

