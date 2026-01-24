import { useState, useEffect } from "react";
import { useTrade } from "../../custom hooks/useTrade";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import WeeklySummary from "./WeeklySummary";

function TradingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trades, setTrades] = useState([]);
  const { fetchMonthlyTrades } = useTrade();

  useEffect(() => {
    fetchMonthlyTrades(currentDate).then((data) => {
      console.log("MONTH TRADES:", data);
      setTrades(data);
    });
  }, [currentDate]);
  return (
    <>
      <div className="flex gap-2 mb-4 mt-8 items-center ">
        <svg
          className="mt-1 lucide lucide-calendar w-5 h-5 text-slate-800"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          
        >
          <path d="M8 2v4"></path>
          <path d="M16 2v4"></path>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
        </svg>
        <h1 className="text-2xl font-bold text-gray-700">
          Trading Calendar
        </h1>
      </div>

      <div className="flex gap-6 bg-gray-200 p-6 rounded-2xl">
        <div className="flex-1">
          <CalendarHeader
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
          />
          <CalendarGrid currentDate={currentDate} trades={trades} />
        </div>

        <WeeklySummary currentDate={currentDate} trades={trades} />
      </div>
    </>
  );
}

export default TradingCalendar;
