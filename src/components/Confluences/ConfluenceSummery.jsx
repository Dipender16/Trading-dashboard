import React from 'react'

function ConfluenceSummery({weekly, daily, fourHour, entrySignal, totalConfluence}) {
    let setupStrength = "";
    let strengthColor = ""
    if(totalConfluence <= 40){
      setupStrength = "Weak"
      strengthColor = "text-red-500"
    }else if (totalConfluence > 40 && totalConfluence < 80){
      setupStrength = "Moderate"
      strengthColor = "text-orange-400"
    }else if(totalConfluence > 80 && totalConfluence <= 100){
      setupStrength = "Acceptable"
      strengthColor = "text-yellow-500"
    }else{
      setupStrength = "Perfect"
      strengthColor = "text-green-500"
    }

  return (
    <section className='m-10 bg-gray-200 w-2/3 p-5 rounded-xl flex flex-col items-center shadow'>
    <h2 className=' text-3xl font-bold text-center mb-2'>Confluence Summary</h2>
    <div className='flex justify-center al gap-6'>
      <div className='p-5 bg-gray-100 rounded-xl px-8'>
       <h3 className='text-lg text-center'>Weekly</h3>
       <p className='text-center mt-2 text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{weekly}%</p>
      </div>
      <div className='p-5 bg-gray-100 rounded-xl px-8'>
       <h3 className='text-lg text-center'>Daily</h3>
       <p className='text-center mt-2 text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{daily}%</p>
      </div>
      <div className='p-5 bg-gray-100 rounded-xl px-8'>
       <h3 className='text-lg text-center'>4H</h3>
       <p className='text-center mt-2 text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{fourHour}%</p>
      </div>
      <div className='p-5 bg-gray-100 rounded-xl px-8'>
       <h3 className='text-lg text-center'>Entry Signal</h3>
       <p className='text-center mt-2 text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{entrySignal}%</p>
      </div>
    </div>
    <div className='mb-5 mt-8 w-full bg-gray-100 rounded-xl p-5 py-10'>
      <h3 className='text-center text-3xl'>Total Overall Score</h3>
      <p className='text-center text-7xl my-5 font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{totalConfluence}%</p>
      <p className={`text-center text-xl font-bold ${strengthColor}`}>{setupStrength}</p>
    </div>
    </section>
  )
}

export default ConfluenceSummery