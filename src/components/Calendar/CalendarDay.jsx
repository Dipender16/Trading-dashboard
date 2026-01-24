
function CalendarDay({day, trades}) {
  const wins = trades.filter(t => t.tradeResult === "Win").length;
  const losses = trades.filter(t => t.tradeResult === "Loss").length;

  let bg = "bg-gray-100"
  if(wins > losses) bg = "bg-green-200";
  if(wins < losses) bg = "bg-red-200";

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