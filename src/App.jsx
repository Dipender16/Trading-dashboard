import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import authService from './appwrite/auth'
import { logout, login, authChecked } from './store/authSlice'
import Loader from './components/Loader'

function App() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading)

  useEffect(() => {
  const checkSession = async () => {
    try {
      const userData = await authService.getCurrentUser();
      if(userData) dispatch(login({ userData }));
    } catch {
      dispatch(logout());
    } finally {
      setTimeout(() => {
    dispatch(authChecked());
  }, 1000);
    }
  };

  checkSession();
}, [dispatch]);

if (loading) {
  return (
    <Loader/>
  );
}


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
