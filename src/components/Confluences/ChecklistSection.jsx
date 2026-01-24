
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
  <section className="p-4 sm:p-5 shadow rounded-xl mt-5 bg-gray-200 w-full sm:w-5/6 lg:w-2/3 mx-auto">
  
  <div className="flex sm:flex-row items-start sm:items-center justify-between">
    <div className="mb-2 sm:mb-0">
      <h2 className="font-bold font-sans text-sm sm:text-lg">{heading}</h2>
      <p className="text-xs sm:text-base text-gray-600">{value}% confluence</p>
    </div>
    <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-purple-600 via-violet-500 to-pink-500 bg-clip-text text-transparent">
      {value}%
    </p>
  </div>

  
  {signal ? (
    <div className="flex sm:flex-row justify-between items-center my-4 sm:my-5 shadow p-3 sm:p-4 rounded-xl">
      <h3 className="font-semibold font-sans text-sm sm:text-lg mb-2 sm:mb-0">Sos / Strong entry</h3>
      <div className="flex items-center gap-3">
        <p className="text-xs sm:text-sm">15%</p>
        <CheckBtn checked={entrySignal} onChange={(e) => localSetter(e.target.checked, setEntrySignal)} />
      </div>
    </div>
  ) : (
    <>
      <div className="flex  sm:flex-row justify-between items-center my-4 sm:my-5 shadow p-3 sm:p-4 rounded-xl">
        <h3 className="font-semibold font-sans text-sm sm:text-lg mb-2 sm:mb-0">Trend</h3>
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm">15%</p>
          <CheckBtn checked={trend} onChange={(e) => localSetter(e.target.checked, setTrend)} />
        </div>
      </div>
      <div className="flex sm:flex-row justify-between items-center my-4 sm:my-5 shadow p-3 sm:p-4 rounded-xl">
        <h3 className="font-semibold font-sans text-sm sm:text-lg mb-2 sm:mb-0">At AOI / Rejected</h3>
        <div className="flex items-center gap-3">
          <p className="text-xs sm:text-sm">15%</p>
          <CheckBtn checked={aoi} onChange={(e) => localSetter(e.target.checked, setAoi)} />
        </div>
      </div>
    </>
  )}
</section>

  )
}

export default ChecklistSection