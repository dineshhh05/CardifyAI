import React, { useEffect } from 'react'
import Navbar from './components/Navbar';

import HomePage from "./pages/HomePage.jsx"
import LoginPage from "./pages/LoginPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import SettingsPage from "./pages/SettingsPage"
import DeckInfoPage from './pages/DeckInfoPage';
import DeckQuizPage from './pages/DeckQuizPage';

import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore} from './store/useAuthStore';

import { LoaderCircle } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useFlashCardStore } from './store/useFlashcardStore';
import CreateDeckPage from './pages/CreateDeckPage';


const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const {isGettingDecks} = useFlashCardStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser && isGettingDecks) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <LoaderCircle className='size-10 animate-spin' />
      </div>
    );
  }
  

  return (
    <div>
      <div className='flex items-center flex-col justify-evenly'> <Navbar /></div>

      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" /> } />
        <Route path='/create-deck' element={authUser ? <CreateDeckPage /> : <Navigate to="/login" /> } />
        <Route path='/deck-info/:deckTopic' element={authUser ? <DeckInfoPage /> : <Navigate to="/login" />} />
        <Route path='/deck-quiz/:deckTopic' element={authUser ? <DeckQuizPage /> : <Navigate to="/login" />} />

      </Routes>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

    </div>
  );
};

export default App