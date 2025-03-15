import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
    question:{
        type: String, 
        required: true, 
        trim: true
    },
    answer:{
        type: String, 
        required: true, 
        trim: true
    }
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

export default Flashcard;