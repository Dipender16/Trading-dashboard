import React from "react";
import Loader from "../Loader";

function WeeklySummary({ trades = [], currentDate, loading }) {
  if (loading) {
  return (
    <div className="w-full md:w-72 mt-20 flex justify-center items-center h-40">
      <Loader />
    </div>
  );
}
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First weekday of the month (0 = Sun)
  const firstDay = new Date(year, month, 1).getDay();

  const weeks = {};
  const weeksPnl = Array(5).fill(0);

  trades.forEach((trade) => {
    const tradeDate = new Date(trade.$createdAt);
    const day = tradeDate.getDate();

    const weekIndex = Math.floor((firstDay + day - 1) / 7);

    const outcome = Number(trade.outcome) || 0;

    weeksPnl[weekIndex] += outcome;

    if (!weeks[weekIndex]) weeks[weekIndex] = [];
    weeks[weekIndex].push(trade);
  });

  return (
    <div className="space-y-4 mt-20">
      {[0, 1, 2, 3, 4].map((week) => {
        const weekTrades = weeks[week] || [];

        return (
          <div
            key={week}
            className="p-4 rounded-xl bg-gray-100 h-27 flex flex-col justify-center"
          >
            <p className="text-xs sm:text-sm text-slate-400">Week {week}</p>

            <p className="text-gray-700 text-sm my-1 ">
              {weekTrades.length} trades
            </p>
            <p
              className={`${weeksPnl[week] > 0 ? "text-green-600" : ""} ${weeksPnl[week] < 0 ? "text-red-600" : ""}${(weeksPnl[week] == 0 ? "text-gray-600" : "")} ${weeksPnl[week] != 0 ? "font-bold" : ""}`}
            >
              ${weeksPnl[week]}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default WeeklySummary;
