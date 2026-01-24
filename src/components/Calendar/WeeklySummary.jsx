import React from "react";

function WeeklySummary({ trades = [], currentDate }) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First weekday of the month (0 = Sun)
  const firstDay = new Date(year, month, 1).getDay();

  const weeks = {};
  const weeksPnl = [0, 0, 0, 0, 0];

  trades.forEach((trade) => {
    const tradeDate = new Date(trade.$createdAt);
    const day = tradeDate.getDate();

    const week = Math.floor((firstDay + day - 1) / 7) + 1;

    weeksPnl[week] += trade.outcome;

    if (!weeks[week]) weeks[week] = [];
    weeks[week].push(trade);
  });

  return (
    <div className="w-72 space-y-4 mt-20">
      {[1, 2, 3, 4, 5].map((week) => {
        const weekTrades = weeks[week] || [];

        return (
          <div
            key={week}
            className="p-4 rounded-xl bg-gray-100 h-27 flex flex-col justify-center"
          >
            <p className="text-sm text-slate-400">Week {week}</p>

            <p className="text-green-400 font-semibold">
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
