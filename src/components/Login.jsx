import { useState } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";
import Input from "./Input";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      try {
        const existingUser = await authService.getCurrentUser();
        if (existingUser) {
          dispatch(authLogin(existingUser));
          navigate("/");
          return;
        }
      } catch {}

      const session = await authService.login(data);

      if (!session) {
        throw new Error("Invalid email or password");
      }
      const userData = await authService.getCurrentUser();
      dispatch(authLogin(userData));

      navigate("/");
    } catch (err) {
      setError(err?.message || "Login failed");
    }
  };

  return (
   <div className="flex items-start justify-center mt-10 min-h-screen px-4 sm:px-6 lg:px-36">
  <div className="w-full max-w-md sm:max-w-lg bg-gray-200 rounded-xl p-8 sm:p-10 border border-black/10 mx-auto">
    
    
    <div className="mb-4 flex justify-center">
      <Logo
        width="150px"
        src="https://app.tradezella.com/static/media/tradezella-logo.db71bfd13dce99dd3e33.png"
      />
    </div>

    
    <h2 className="text-center text-2xl sm:text-3xl my-1 font-sans font-semibold">
      Welcome Back
    </h2>
    <p className="text-center text-gray-700 text-sm sm:text-base">
      Sign in to access your trading journal
    </p>

    
    {error && <p className="text-red-500 mt-4 sm:mt-6 text-center">{error}</p>}

   
    <form onSubmit={handleSubmit(login)} className="mt-6 sm:mt-8">
      <div className="space-y-4 sm:space-y-5">
        <Input
          placeholder="Email"
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
          type="password"
          placeholder="Password"
          {...register("password", {
            required: true,
          })}
        />
        <Button type="submit" className="w-full bg-green-600 py-2 sm:py-3">
          Sign in
        </Button>
        <p className="mt-2 text-center text-sm sm:text-base">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 bg-gradient-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  </div>
</div>

  );
}

export default Login;
