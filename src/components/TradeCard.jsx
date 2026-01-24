import React from 'react'
import Button from './Button'

function TradeCard({currencyPair = "AUD/USD",outcome = 10, tradeDirection = "LONG", totalConfluence = 15, date = "1/3/26"}) {
  date = new Date(date);
  
  return (
    <div className='bg-gray-200 p-4 w-72 rounded-xl'>

     <div className='flex mb-2 items-center justify-between '>
       <div>
        <h2 className='font-bold'>{currencyPair}</h2>
        <p className='text-xs'>{tradeDirection}</p>
       </div>
       <p className={`text-xs p-1 rounded px-2 ${outcome > 0 ? "bg-green-500 text-white": "text-white bg-red-400"}`}>{outcome > 0 ? (<span>Win</span>) : (<span>Loss</span>)}</p>
     </div>
     <div>
      <div className='text-xs mb-1 flex justify-between text-gray-600'>
        <p>confluence</p>
        <p className={`${totalConfluence >= 70 ? "text-green-600" : "text-orange-600"}`}>{totalConfluence}%</p>
      </div>
      <div className='text-xs flex justify-between text-gray-600'>
        <p>Date</p>
        <p>{`${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`}</p>
      </div>
      <div className='h-px my-1 bg-gray-800'></div>
      <div className='flex justify-between'>
        <p className='font-bold text-xs'>TOTAL</p>
        <p className={`${outcome === 0 ? "text-gray-700" : ""} ${outcome > 0? "text-green-600": "text-red-500"} text-xs font-bold`}>${outcome}</p>
      </div>
     </div>
     <div>

      <Button children={"Update Trade"} className='text-xs mt-4'/>
      <Button children={"Delete" } className='text-xs mt-4 ml-2'/>
     </div>


    </div>
    
  )
}

export default TradeCard