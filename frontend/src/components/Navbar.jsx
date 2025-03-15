import React from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { LogOut, CircleUserRound } from 'lucide-react';

const Navbar = () => {
  
  const { logout, authUser } = useAuthStore();

  return (
    <div className='fixed top-1 w-4/5 bg-darkerGray h-20 flex justify-between items-center p-6 border-2 border-outlineGray m-8 mb-0 rounded-2xl  backdrop-filter backdrop-blur bg-opacity-0 backdrop-saturate-100 backdrop-contrast-100'>
        <div className='text-xl font-bold text-lightGray md:text-2xl'>CARDIFY<span className='text-myPurple ml-3'>AI</span></div>

      {authUser && (
        <div className='flex justify-between items-center gap-1'>
          <button className=' flex justify-between items-center gap-3 mr-5'>
            <CircleUserRound strokeWidth={2} className='size-6'/>
            <div className='text-moreLightGray md:text-lg'> {authUser.fullName}</div>
          </button>
          <button className='flex gap-2 items-center text-lightGray p-2 bg-outlineGray rounded-lg hover:bg-darkGray' onClick={logout}>
            <LogOut strokeWidth={3} className='size-4' />  
          </button>
        </div> 
      )}  
    </div>
  )
}

export default Navbar