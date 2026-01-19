import React, { useState } from 'react'
import Logo from './Logo';
import { Link, useNavigate } from 'react-router-dom';
import Button from './Button';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import Input from './Input';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {register, handleSubmit} = useForm();
  const [error, setError] = useState("");

  const login = async(data)=>{
    setError("");
    try{
      const session = await authService.login(data);
      if(!session){
        throw new Error("Invalid email or password")
      }

        const userData = await authService.getCurrentUser();
        if(userData) {dispatch(authLogin(userData));
        navigate("/");}
      

    }catch(err){
      setError(err?.message || "Login failed")
    }
  }




  return (
    <div
    className='flex items-center justify-center w-full my-10 b'
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-200 rounded-xl p-10 border border-black/10`}>
        <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-25">
                        <Logo width="100%" src='https://app.tradezella.com/static/media/tradezella-logo.db71bfd13dce99dd3e33.png'/>
                    </span>
        </div>
        <h2 className="text-center text-2xl my-1 font-sans">Welcome Back</h2>
        <p className='text-center text-gray-700'>Sign in to access your trading journal</p>
        
        {error && <p className="text-red-500 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                placeholder="Email"
                type="email"
                {...register("email", {
                    required: true,
                    validate: {
                        matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                        "Email address must be a valid address",
                    }
                })}
                />
                <Input
                type="password"
                placeholder="Password"
                {...register("password", {
                    required: true,
                })}
                />
                <Button
                type="submit"
                className="w-full bg-green-600"
                >Sign in</Button>
                <p className="mt-2 text-center text-base ">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent underline"
                    >
                        Sign Up
                    </Link>
        </p>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login;