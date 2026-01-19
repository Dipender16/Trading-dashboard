import React from 'react'
import { useState } from 'react';
import CheckBtn from './CheckBtn';

function ChecklistSection({heading, value, setValue, signal = false}) {
    const[trend, setTrend] = useState(0);
    const[aoi, setAoi] = useState(0);
    const[entrySignal, setEntrySignal] = useState(0);

    const localSetter = (isChecked, localSetter)=>{
      localSetter(isChecked);
      setValue((prev) => prev + (isChecked? 15: -15));
    }

  return (
    <section className='p-5 shadow  rounded-xl mt-5  bg-gray-200 w-2/3'>
          <div className='flex items-center justify-between'>

            <div>
             <h2 className='bold font-sans text-lg'>{heading}</h2>
             <p className='text-sm text-gray-600'>{value}% confluence</p>
            </div>
            <p className='text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent'>{value}%</p>
          </div>
             {
              signal?(
                <div className='flex justify-between items-center my-5 shadow p-4 rounded-xl'>
            <h3 className='font-semibold font-sans text-xl'>Sos / Strong entry</h3>
            <div className='flex items-center gap-3'>
                <p className='text-xs'>15%</p>
                <CheckBtn checked={entrySignal} onChange={(e)=> localSetter(e.target.checked, setEntrySignal)}/>
            </div>
          </div>
              ):(<>
              
                <div className='flex justify-between items-center my-5 shadow p-4 rounded-xl'>
            <h3 className='font-semibold font-sans text-xl'>Trend</h3>
            <div className='flex items-center gap-3'>
                <p className='text-xs'>15%</p>
                <CheckBtn checked={trend} onChange={(e)=> localSetter(e.target.checked, setTrend)}/>
            </div>
          </div>
          <div className='flex justify-between items-center my-5 shadow p-4 rounded-xl'>
            <h3 className='font-semibold font-sans text-xl'>At AOI / Rejected</h3>
            <div className='flex items-center gap-3'>
                <p className='text-xs'>15%</p>
                <CheckBtn checked={aoi} onChange={(e)=> localSetter(e.target.checked, setAoi)}/>
            </div>
          </div>
              </>
              )
             }
          

          
            
          
        </section>
  )
}

export default ChecklistSection