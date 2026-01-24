import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async() => {
      try{

        await authService.logout()
          dispatch(logout())
          navigate('/')
      } catch(err){console.error("Logout failed", err);} 
    }
  return (
    <button
    className='inline-bock px-6 py-2 hover:cursor-pointer duration-200 hover:bg-gray-200 mx-1 font-sans rounded-full'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn