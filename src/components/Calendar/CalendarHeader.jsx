import React from 'react'

function CalendarHeader({currentDate, setCurrentDate}) {
  const prevMonth = ()=>{
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth()-1));
  }

  const nextMonth = ()=>{
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }
  return (
     <div className="flex items-center justify-center gap-6 mb-4">
      <button className='text-2xl' onClick={prevMonth}>←</button>

      <h2 className="text-xl font-semibold">
        {currentDate.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <button className='text-2xl' onClick={nextMonth}>→</button>
    </div>
  )
}

export default CalendarHeader