import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useFlashCardStore } from '../store/useFlashcardStore';
import { House } from 'lucide-react';

const DeckQuizPage = () => {
  const navigate = useNavigate();

  const { deckTopic } = useParams(); // Access the deckTopic from the URL
  const { questions, answers, getCardsInDeckByTopic } = useFlashCardStore();
  useEffect(() => {
    getCardsInDeckByTopic(deckTopic);
  }, [deckTopic]); 

  // State management
  const [index, setIndex] = useState(0);
  const [isRevealAnswer, setIsRevealAnswer] = useState(false);

  const handleNextQuestion = () => {
    if (index < questions.length - 1) {
      setIsRevealAnswer(false);
      setIndex(prevIndex => prevIndex + 1);
    }
  };

  const handleRevealAnswer = () => {
    setIsRevealAnswer(true);
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className='min-h-screen flex flex-col items-center px-6 py-8 mx-auto lg:py-0 mt-60'>
      <div className='flex justify-between w-4/5 mb-5'>
        <span className='text-lightGray text-4xl font-bold'>{deckTopic}</span> 
        <button onClick={handleHomeClick} className='flex justify-evenly items-center text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'>
          <House className='size-5 mr-4' />
          Home
        </button>
      </div>

      <div className='w-3/4 flex-1 overflow-y-auto'>
        {isRevealAnswer ? (
          // Answer
          <div className='border-2 border-outlineGray w-full px-5 pt-12 pb-16 mt-5 mb-10 rounded-xl flex flex-col justify-between items-center min-h-96'>
            <div className='text-3xl px-6 text-moreLightGray font-bold'>Answer</div>
            <div className='text-2xl px-6 mt-28 text-lightGray text-center'>{answers[index]}</div>          
            <button 
                onClick={index >= questions.length-1 ? handleHomeClick : handleNextQuestion }
                className=' w-1/6 h-12 mt-28 text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-base px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'
            >
                {index >= questions.length - 1 ? "Return To Home" : "Next Question"}
            </button>
          </div>
        ) : (
          // Question 
          <div className='border-2 border-outlineGray w-full px-5 pt-12 pb-16 mt-5 mb-10 rounded-xl flex flex-col justify-between items-center min-h-96'>
            <div className='text-4xl pt-12 px-6 text-lightGray text-center'>{questions[index]}</div>          
            <button onClick={() => handleRevealAnswer()} className=' w-1/6 h-12 mt-20 text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-base px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'>
                Reveal Answer
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DeckQuizPage