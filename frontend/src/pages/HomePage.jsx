import { WandSparkles, Frown, LoaderCircle, Trash2 } from 'lucide-react'
import React, { useEffect } from 'react'
import { useFlashCardStore } from '../store/useFlashcardStore'
import DeckInfoPage from './DeckInfoPage';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { deckTopics, getDeckTitles, isGettingDecks, deleteDeckByTopic } = useFlashCardStore(); 
  const navigate = useNavigate();

  useEffect(() => {
    getDeckTitles();
  }, []);

  const handleDeckClick = ( deckTitle) => {
    navigate(`/deck-info/${deckTitle}`, { state: { deckTitle } });
  };

  const handleDeleteDeck = async ( deckTitle ) => {
    // Call the delete function
    await deleteDeckByTopic(deckTitle);
    
    // Refresh the deck list
    getDeckTitles();
  };

  return (
    <div className='min-h-screen flex flex-col items-center px-6 py-8 mx-auto lg:py-0 mt-60'>
      {/* Title + generate new deck */}
      <div className='flex justify-between w-4/5 mb-5'>
        <span className='text-lightGray text-4xl font-bold'>DECKS</span> 
        <button 
            className='flex justify-evenly items-center text-white bg-myPurple hover:bg-myLightPurple rounded-lg text-sm px-5 py-2.5 text-center shadow-[0px_10px_51px_-4px_rgba(85,_0,_255,_0.7)]'
            onClick={() => navigate("/create-deck")}
          >
          <WandSparkles className='size-5 mr-4' />
          Generate New
        </button>
      </div>

      {/* Flashcard decks */}
      <div className='w-3/4 flex-1 overflow-y-auto'>
        {isGettingDecks ? (
          <div className='flex items-center justify-center'>
            <LoaderCircle className='size-10 animate-spin' />
          </div>
        ) : (
          <>
            {deckTopics.length > 0 ? (
                deckTopics.map((topic, index) => (
                    <div
                        key={index}
                        onClick={() => handleDeckClick(topic)}
                        className='group border-2 border-outlineGray w-full px-5 pr-6 py-10 mt-5 mb-10 rounded-xl hover:bg-highlitedGray hover:cursor-pointer hover:border-darkGray flex justify-between items-center'
                    >
                      <div className='text-2xl px-6 text-lightGray'>{topic}</div>
                      <div className='opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-900 rounded-md p-2 hover:bg-red-800'
                           onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering `handleDeckClick`
                            handleDeleteDeck(topic);
                            console.log(topic);
                        }}
                      >
                        <Trash2 color='#d13333' className='size-6'/>
                      </div>
                    </div>
                ))
            ) : (
                <div className='flex flex-col justify-between items-center mt-32'>
                  <Frown className='size-10'/>
                  <p className="text-moreLightGray text-2xl text-center mt-5">No decks available</p>
                </div>
                
            )}
          </>
        )}
        
        
      </div>
    </div>
  )
}

export default HomePage
