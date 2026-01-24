
function CalendarDay({day, trades}) {
  const wins = trades.filter(t => t.tradeResult === "Win").length;
  const losses = trades.filter(t => t.tradeResult === "Loss").length;

  let bg = "bg-gray-100"
  if(wins > losses) bg = "bg-green-200";
  if(wins < losses) bg = "bg-red-200";

  return (
     <div className={`h-28 rounded-lg p-2 ${bg}`}>
      <div className="text-sm">{day}</div>

      {trades.length > 0 && (
        <div className="text-xs mt-2">
          {trades.length} trades
        </div>
      )}
    </div>
  )
}

export default CalendarDay