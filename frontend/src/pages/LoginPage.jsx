import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';


const LoginPage = () => {
  const [formData, setFormData] = useState({
      email:"",
      password:""
  });
  const { login, isLoggingin } = useAuthStore();

  const validateForm = () => {
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password<6) return toast.error("Password is invalid");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const succes = validateForm();

    if(succes===true) login(formData);
  };

  

  return (
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-2xl md:mt-20 sm:max-w-md xl:p-0 bg-darkerGray border-outlineGray border-2 ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold text-lightGray md:text-3xl mb-10 flex justify-center items-center">
                  LOGIN
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-moreLightGray">Your email</label>
                      <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" name="email" id="email" class="bg-darkerGray border border-outlineGray text-lightGray placeholder-darkGray rounded-lg focus:ring-myPurple focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-moreLightGray">Password</label>
                      <input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" name="password" id="password" placeholder="••••••••" class= "bg-darkerGray border border-outlineGray text-white placeholder-darkGray rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                  </div>
                  <button type="submit" disabled={isLoggingin} class="flex justify-evenly items-center w-full text-white bg-myPurple hover:bg-myLightPurple focus:ring-2 focus:outline-none focus:ring-transparent font-bold rounded-lg text-lg px-5 py-2.5 text-center">
                  {isLoggingin ? (
                      <>
                        <Loader2 className='size-5 animate-spin' />
                      </>
                      ) : (
                          "Login"
                      )
                  }
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400 ">
                      Dont have an account? <Link to="/signup" class="font-medium text-myPurple hover:underline hover:text-myLightPurple">Signup</Link>
                  </p>
              </form>
          </div>
      </div>
    </div>
  )
}

export default LoginPage;