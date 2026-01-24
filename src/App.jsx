import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import conf from './conf/conf'
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { logout, login, authChecked } from './store/authSlice'

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
  const checkSession = async () => {
    try {
      const userData = await authService.getCurrentUser();
      dispatch(login({ userData }));
    } catch {
      dispatch(logout());
    } finally {
      dispatch(authChecked());
    }
  };

  checkSession();
}, [dispatch]);



  return (
    <>
      <div className='bg-gray-100 h-full'>
      <Header/>
       <Outlet/>
      </div>
    </>
  )
}

export default App
