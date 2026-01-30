
function CalendarDay({day, trades}) {
  const netPnL = trades.reduce((sum, t) => sum + t.outcome, 0);

  let bg = "bg-gray-100"
  if(netPnL > 0) bg = "bg-green-200"
  else if(netPnL < 0) bg = "bg-red-200";

  return (
     <div className={`h-14 sm:h-20 md:h-29 rounded-lg p-2 ${bg}`}>
      <div className="text-xs sm:text-sm">{day}</div>

      {trades.length > 0 && (
        <div className="text-[7px] sm:text-xs md:text-sm mt-2">
          {trades.length} trades
        </div>
      )}
    </div>
  )
}

export default CalendarDay