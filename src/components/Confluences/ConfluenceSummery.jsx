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
    <section className="m-4 sm:m-10 bg-gray-200 w-full sm:w-5/6 lg:w-2/3 p-4 sm:p-5 rounded-xl flex flex-col items-center shadow">
  
  <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
    Confluence Summary
  </h2>

  
  <div className="flex flex-wrap justify-center gap-4 sm:gap-6 w-full">
    <div className="flex-1 min-w-30 sm:min-w-37.5 p-4 bg-gray-100 rounded-xl text-center">
      <h3 className="text-lg">Weekly</h3>
      <p className="mt-2 text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
        {weekly}%
      </p>
    </div>
    <div className="flex-1 min-w-30 sm:min-w-37.5 p-4 bg-gray-100 rounded-xl text-center">
      <h3 className="text-lg">Daily</h3>
      <p className="mt-2 text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
        {daily}%
      </p>
    </div>
    <div className="flex-1 min-w-30 sm:min-w-37.5 p-4 bg-gray-100 rounded-xl text-center">
      <h3 className="text-lg">4H</h3>
      <p className="mt-2 text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
        {fourHour}%
      </p>
    </div>
    <div className="flex-1 min-w-30 sm:min-w-37.5 p-4 bg-gray-100 rounded-xl text-center">
      <h3 className="text-lg">Entry Signal</h3>
      <p className="mt-2 text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
        {entrySignal}%
      </p>
    </div>
  </div>

  
  <div className="mt-6 sm:mt-8 w-full bg-gray-100 rounded-xl p-6 sm:p-10 text-center">
    <h3 className="text-2xl sm:text-3xl">Total Overall Score</h3>
    <p className="text-5xl sm:text-7xl my-4 sm:my-5 font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
      {totalConfluence}%
    </p>
    <p className={`text-xl sm:text-2xl font-bold ${strengthColor}`}>{setupStrength}</p>
  </div>
</section>

  )
}

export default ConfluenceSummery