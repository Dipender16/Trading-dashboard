import React from 'react'
import Button from '../components/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
    const navigate = useNavigate();
    const authStatus = useSelector((state)=> state.auth.status)
  return (
    <div className='flex flex-col lg:flex-row items-center lg:items-start mx-6 lg:mx-36 mt-10 min-h-screen'>
  <div className='lg:mr-8 mt-4 lg:mt-0 text-center lg:text-left'>
    <h1 className='font-sans font-bold text-4xl sm:text-5xl it'>
      Everything you ever <br />
      <span className='font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>
        wanted to know
      </span> about your trading...
    </h1>
    <p className='text-2xl sm:text-3xl my-6 font-light'>
      ...but your spreadsheets never told you.
    </p>
    <p className='text-base sm:text-lg text-gray-600 lg:mr-16'>
      Edgejournal shows you the metrics that matter–and the behaviours that lead to profit with the power of journaling and analytics.
    </p>
    {authStatus ? (
      <Button
        children={"Add Trades"}
        className={"mt-8 cursor-pointer hover:text-lg"}
        onClick={() => navigate("/checklist")}
      />
    ) : (
      <Button
        children={"Get Started Now"}
        className={"mt-8 cursor-pointer hover:text-lg"}
        onClick={() => navigate("/login")}
      />
    )}
  </div>
  
  <img
    className='mt-8 lg:mt-0 w-full lg:w-2/5 h-auto'
    src="https://cdn.prod.website-files.com/630df394ff44d46a174df570/685554af255975c046578167_herolgimg-min.png"
    alt="Hero"
  />
</div>

  )
}

export default Home