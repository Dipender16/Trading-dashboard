import CalendarDay from "./CalendarDay"

function CalendarGrid({currentDate, trades = []}) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month+1, 0).getDate();

  const cells = [];

  for(let i = 0; i < firstDay; i++){
    cells.push(<div key={`empty-${i}`}/>)
  }

  for(let day = 1; day <= daysInMonth; day++){
    const date = new Date(year, month, day);
    const dayTrades = trades.filter((t)=>{
      return new Date(t.$createdAt).toDateString() === date.toDateString();
    })

    cells.push(
      <CalendarDay key={day} day={day} trades={dayTrades}/>
    )
  }
  return (
    <>
     <div className="grid grid-cols-7 text-center gap-3 text-xs sm:text-sm text-gray-700 mb-2">
      <p>Sun</p>
      <p>Mon</p>
      <p>Tue</p>
      <p>Wed</p>
      <p>Thu</p>
      <p>Fri</p>
      <p>Sat</p>
     </div>
     <div className="grid grid-cols-7 gap-0.5 sm:gap-2">
      {cells}
    </div>
    </>
  )
}

export default CalendarGrid