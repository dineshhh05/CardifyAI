import { create } from "zustand";
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast';


export const useFlashCardStore = create((set) => ({
    deckTopics: [],
    questions: [],
    answers: [],
    numberOfCards: 0,

    isCreatingDecks: false,
    isGettingDecks: false,
    isGettingCards: false,
    isDeleteingDeck: false,
    
    createDeck: async(promptData)=>{
      set({isCreatingDecks: true});
      
      try {
        const res = await axiosInstance.post("/deck/create", {promptData});
        toast.success("Flashcards generated");
      } catch (error) {
        toast.error("Couldnt create flashcards, please try again");
      } finally {
        set({ isCreatingDecks:false });
      }
    },

    getDeckTitles: async()=>{
      set({ isGettingDecks:true });
        try {
            const res = await axiosInstance.get("/deck/get-decks");

            const topics = res.data.map(item => item.topic);
            set({ deckTopics: topics });
        } catch (error) {
            toast.error("Couldnt load deck titles");
        } finally {
          set({ isGettingDecks:false });
        }
    },

    getCardsInDeckByTopic: async(topic)=>{
      set({isGettingCards: true});

      try {
          const res = await axiosInstance.post("/deck/get-cards-by-topic", {topic});
          set({questions:res.data.questions});
          set ({answers: res.data.answers});
          set({numberOfCards: res.data.questions.length});
      } catch (error) {
          toast.error("Couldnt load questions and answers" + error);
      } finally {
          set({isGettingCards: false});
      }

    },

    deleteDeckByTopic: async(topic)=>{
      try {
        await axiosInstance.post("/deck/delete-deck", { topic });
        toast.success("Deleted deck: " + topic);
    } catch (error) {
        toast.error("Couldn't delete deck error: " + error);
        console.error(error);
    }
    }

}));