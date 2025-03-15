import { House, SparkleIcon, WandSparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFlashCardStore } from '../store/useFlashcardStore';
import { toast } from 'react-hot-toast';

const CreateDeckPage = () => {
  const navigate = useNavigate();
  const { createDeck, isCreatingDecks } = useFlashCardStore(); 
  const handleHomeClick = () => {
    navigate("/");
  };

  const [formData, setFormData] = useState({
    deckTopic:"",
    deckPrompt:""   
  });

  const validateForm = () => {
    if(!formData.deckTopic.trim()) return toast.error("Topic is required");
    if(!formData.deckPrompt.trim()) return toast.error("Prompt is required");

    return true;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    const succes = validateForm();

    if(succes===true)  await createDeck(formData);
    if(!isCreatingDecks && succes===true) await navigate("/");
  };

  return (
    <div className='min-h-screen flex flex-col items-center px-6 py-8 mx-auto lg:py-0 mt-60'>
      <div className='flex justify-between w-4/5 mb-10'>
        <span className='text-lightGray text-4xl font-bold'>Create your deck</span> 
        <button onClick={handleHomeClick} className='flex justify-evenly items-center text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'>
          <House className='size-5 mr-4' />
          Home
        </button>
      </div>

      <div className='w-3/4 flex-1 overflow-y-auto '>
        <div className='border-2 border-outlineGray w-full px-5 py-12 rounded-xl flex flex-col justify-between items-center'>
            {isCreatingDecks ? (
                <div className="flex flex-col justify-between items-center animate-pulse text-myPurple mt-24">
                  <SparkleIcon className="size-10" />
                  <p className="text-moreLightGray text-2xl text-center mt-5 animate-pulse m-32">
                      Generating flashcard
                  </p>
                </div>
            ) : (
                <>
                  <form onSubmit={handleSubmit} className="w-11/12 flex flex-col justify-between items-center">
                  <div className='mb-12 w-full'>
                      <label for="topic" className="block mb-2 text-lg font-medium text-moreLightGray">Enter deck topic</label>
                      <input value={formData.deckTopic} onChange={(e) => setFormData({...formData, deckTopic: e.target.value})} type="text" className="bg-darkerGray border border-outlineGray text-lightGray text-lg placeholder-darkGray rounded-lg focus:ring-myPurple focus:border-primary-600 w-full p-2.5 h-14" placeholder="Photosyenthesis" required="" />
                  </div>
                  <div className='mb-16 w-full'>
                      <label for="prompt" className="block mb-2 text-lg font-medium text-moreLightGray">Enter prompt to generate flashcards</label>
                      <input value={formData.deckPrompt} onChange={(e) => setFormData({...formData, deckPrompt: e.target.value})} type="text" placeholder="Create flashcards about photosyenthesis" className= "bg-darkerGray border border-outlineGray text-white text-lg placeholder-darkGray rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 h-14" required="" />
                  </div>
                  <button type="submit" className="flex justify-evenly items-center w-44 h-12 text-white bg-myPurple hover:bg-myLightPurple focus:ring-2 focus:outline-none focus:ring-transparent font-bold rounded-lg text-md px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]">
                      <WandSparkles className='mr-5' />
                      AI Generate
                  </button>
                  </form>
                </>
            )}
            

            
        </div>

      </div>
    </div>
  )
}

export default CreateDeckPage