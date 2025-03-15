import { useNavigate, useParams } from 'react-router-dom';
import { useFlashCardStore } from '../store/useFlashcardStore';
import { House, LoaderCircle } from 'lucide-react';
import { useEffect } from 'react';

const DeckInfoPage = () => {
  const { deckTopic } = useParams(); // Access the deckTopic from the URL
  const { getCardsInDeckByTopic, numberOfCards, isGettingCards } = useFlashCardStore();
  const navigate = useNavigate(); // Initialize navigation

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleStart = (deckTitle) => {
    navigate(`/deck-quiz/${deckTitle}`, { state: { deckTitle } });
  }

  useEffect(() => {
    getCardsInDeckByTopic(deckTopic);
  }, [deckTopic]); 

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
        <div className='border-2 border-outlineGray w-full px-5 pt-24 pb-3 mt-5 mb-10 rounded-xl flex flex-col justify-between items-center min-h-96'>
          { isGettingCards ? (
            <>
              <div className='flex items-center justify-center'>
                <LoaderCircle className='size-10 animate-spin' />
              </div>
            </>
          ) : (
            <>
              {numberOfCards<1 ? (
                <div className='text-4xl px-6 text-lightGray '>No cards available</div>
              ) : (
                <>
                  <div className='text-4xl px-6 text-lightGray '>{numberOfCards} CARDS</div>
                  <button onClick={() => handleStart(deckTopic)}
                      className=' w-1/6 h-12 text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-base px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'
                  >
                    Start
                  </button>
                </>
                
              )}
            </>
          )}
          <p className='text-moreLightGray'>Results and statistics comming soon!</p>
        </div>
      </div>
      
    </div>
    
  )
};

export default DeckInfoPage;