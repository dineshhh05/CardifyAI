import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,  // Make sure to load the API key from environment variables
});

export const generateFlashcards = async (topic) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o",  
            messages: [
                {
                    role: "developer",
                    content: `Generate 5-10 flashcards randomly for the topic: ${topic}. Each flashcard should have a question and 
                              an answer in with 'question' and 'answer' keys. do not give anything except the json use emojis if you 
                              want to`
                },
                {
                    role: "user",
                    content: `Generate flashcards for the topic: ${topic}.`
                },
            ],
            response_format: { "type": "json_object" }
            }
        );

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Error generating flashcards:", error);
        throw new Error("Unable to generate flashcards");
    }
};
