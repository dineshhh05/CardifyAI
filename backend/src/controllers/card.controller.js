import { generateFlashcards } from "../lib/openaiService.js";
import Flashcard from "../models/flashcard.model.js";

export const createCards = async (promptData) => {
    try {
        const prompt = promptData.deckPrompt;

        const apiResponse = await generateFlashcards(prompt);
        
        // Check if the API response is a string (i.e., needs to be parsed)
        let parsedResponse;
        if (typeof apiResponse === "string") {
            parsedResponse = JSON.parse(apiResponse);
        } else {
            parsedResponse = apiResponse;
        }

        if (parsedResponse && parsedResponse.flashcards && Array.isArray(parsedResponse.flashcards)) {
            const flashcards = await Promise.all(
                parsedResponse.flashcards.map(async (flashcard) => {
                    return Flashcard.create({
                        question: flashcard.question,
                        answer: flashcard.answer
                    });
                })
            );

            return flashcards;
        } else {
            throw new Error("API response does not contain a valid 'flashcards' array");
        }
    } catch (error) {
        console.error("Error generating flashcards:", error);
        throw new Error("Error generating flashcards: " + error.message);
    }
};