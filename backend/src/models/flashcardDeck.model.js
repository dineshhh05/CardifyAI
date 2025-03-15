import mongoose from "mongoose";

const flashcardDeckSchema = new mongoose.Schema(
    {
        topic:{
            type: String,
            required: true, 
            trim: true
        },
        createdBy: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "User", 
            required: true 
        },
        flashcards: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Flashcard' 
        }]
    },
    { timestamps: true }
);

const FlashcardDeck = mongoose.model("FlashcardDeck", flashcardDeckSchema);

export default FlashcardDeck;