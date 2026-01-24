import { useState, useEffect } from "react";
import { useTrade } from "../../custom hooks/useTrade";
import CalendarHeader from "./CalendarHeader";
import CalendarGrid from "./CalendarGrid";
import WeeklySummary from "./WeeklySummary";

function TradingCalendar() {
  const [loading, setLoading] = useState(true)
  const [currentDate, setCurrentDate] = useState(new Date());
  const [trades, setTrades] = useState([]);
  const { fetchMonthlyTrades } = useTrade();

  useEffect(() => {
    setLoading(true)
    fetchMonthlyTrades(currentDate).then((data) => {
      console.log("MONTH TRADES:", data);
      setTrades(data);
    }).catch((err)=>{ console.error(err);
      setTrades([])}).finally(setLoading(false))
  }, [currentDate]);
  return (
   <div >
  <div className="flex justify-center sm:justify-start gap-2 mb-4 mt-8 items-center">
    <svg
      className="mt-1 w-5 h-5 text-slate-800"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M8 2v4"></path>
      <path d="M16 2v4"></path>
      <rect width="18" height="18" x="3" y="4" rx="2"></rect>
      <path d="M3 10h18"></path>
    </svg>
    <h1 className="text-xl sm:text-2xl font-bold text-gray-700 text-center sm:text-left">
      Trading Calendar
    </h1>
  </div>

  <div className="flex flex-col lg:flex-row gap-0 lg:gap-6 bg-gray-200 p-4 sm:p-6 rounded-2xl">
    
    <div className="flex-1">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid currentDate={currentDate} trades={trades} />
    </div>

    
    <div className="mt-4 lg:mt-0 lg:w-60 xl:w-80">
      <WeeklySummary currentDate={currentDate} trades={trades} loading={loading} />
    </div>
  </div>
</div>

  );
}

export default TradingCalendar;
