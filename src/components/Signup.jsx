import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../store/authSlice'
import Button from './Button.jsx'
import Input from './Input.jsx'
import Logo from './Logo.jsx'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-start justify-center mt-10 min-h-screen px-4 sm:px-6 lg:px-36">
  <div className="w-full max-w-md sm:max-w-lg bg-gray-200 rounded-xl p-6 sm:p-10 border border-black/10 mx-auto">
    
    
    <div className="mb-4 flex justify-center">
      <Logo
        width="150px"
        src="https://app.tradezella.com/static/media/tradezella-logo.db71bfd13dce99dd3e33.png"
      />
    </div>

    
    <h2 className="text-center text-2xl sm:text-3xl my-2 font-sans font-semibold">
      Sign up to create account
    </h2>
    <p className="mt-1 text-center text-sm sm:text-base text-black/60">
      Already have an account?&nbsp;
      <Link
        to="/login"
        className="font-medium text-primary transition-all duration-200 hover:underline"
      >
        Sign In
      </Link>
    </p>

    
    {error && <p className="text-red-600 mt-4 sm:mt-6 text-center">{error}</p>}

    
    <form onSubmit={handleSubmit(create)} className="mt-4 sm:mt-6">
      <div className="space-y-4 sm:space-y-5">
        <Input
          label="Full Name: "
          placeholder="Enter your full name"
          {...register("name", { required: true })}
        />
        <Input
          label="Email: "
          placeholder="Enter your email"
          type="email"
          {...register("email", {
            required: true,
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                "Email address must be a valid address",
            },
          })}
        />
        <Input
          label="Password: "
          type="password"
          placeholder="Enter your password"
          {...register("password", { required: true })}
        />
        <Button type="submit" className="w-full py-2 sm:py-3">
          Create Account
        </Button>
      </div>
    </form>
  </div>
</div>

  )
}

export default Signup