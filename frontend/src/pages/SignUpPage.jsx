import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName:"",
    email:"",
    password:""
  });
  
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {

    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email");
    if(!formData.password.trim()) return toast.error("Password is required");
    if(formData.password<6) return toast.error("Password must be atleast 6 charecters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const succes = validateForm();

    if(succes===true) signup(formData);
    
  };  

  return (
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full rounded-2xl md:mt-20 sm:max-w-md xl:p-0 bg-darkerGray border-outlineGray border-2  ">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-2xl font-bold text-lightGray md:text-3xl mb-10 flex justify-center items-center">
                  SIGN UP
              </h1>
              <form onSubmit={handleSubmit} class="space-y-4 md:space-y-6">
                  <div>
                      <label for="name" class="block mb-2 text-sm font-medium text-moreLightGray">Full Name</label>
                      <input value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} type="text" name="name" id="name" class="bg-darkerGray border border-outlineGray text-lightGray placeholder-darkGray rounded-lg focus:ring-myPurple focus:border-primary-600 block w-full p-2.5" placeholder="Jhon Doe" required="" />
                  </div>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-moreLightGray">Your email</label>
                      <input value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} type="email" name="email" id="email" class="bg-darkerGray border border-outlineGray text-lightGray placeholder-darkGray rounded-lg focus:ring-myPurple focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-moreLightGray">Password</label>
                      <input value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} type="password" name="password" id="password" placeholder="••••••••" class= "bg-darkerGray border border-outlineGray text-white placeholder-darkGray rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" />
                  </div>
                  <button type="submit" disabled={isSigningUp} class=" flex justify-evenly items-center w-full text-white bg-myPurple hover:bg-myLightPurple font-bold rounded-lg text-lg px-5 py-2.5 text-center">
                    {isSigningUp ? (
                      <>
                        <Loader2 className='size-5 animate-spin' />
                      </>
                      ) : (
                          "Sign up"
                      )
                    }
                  </button>
                  <p class="text-sm font-light text-gray-500 dark:text-gray-400 ">
                      Already have an account? <Link to="/login" class="font-medium text-myLightPurple hover:underline hover:text-myPurple">Login</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
  )
} 

export default SignUpPage;