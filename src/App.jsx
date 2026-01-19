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
import { logout, login } from './store/authSlice'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser().then((userData)=>{
      if(userData){
        dispatch(login({userData}));
      }else{
        dispatch(logout())
      }
    }).finally(()=>{
      setLoading(false);
    })

  }, [])


  return (
    <>
      <div className='bg-gray-100'>
      <Header/>
       <Outlet/>
       <Footer/>
      </div>
    </>
  )
}

export default App
