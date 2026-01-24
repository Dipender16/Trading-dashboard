import { useState, useEffect } from 'react'
import trades from "../appwrite/tradeManagement";
import authService from "../appwrite/auth";
import StatCard from './Cards/StatCard';
import BottomCard from './Cards/BottomCard';
import TradingCalendar from './Calendar/TradingCalendar';
import { Query } from 'appwrite';


function Dashboard() {
    const [allTrades, setAllTrades] = useState([]);

     useEffect(() => {
  const fetchTrades = async () => {
    try {
      const user = await authService.getCurrentUser();
      if (!user) return;

      const result = await trades.getTrades([Query.equal("userId", user.$id)]);
      setAllTrades(result);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
    }
  };

  fetchTrades();
  }, []);

  const totalTrades = allTrades.length;
  const winningTrades = allTrades.filter((t)=> t.tradeResult === "Win");
  const lossingTrades = allTrades.filter((t)=> t.tradeResult === "Loss");
  const totalProfit = winningTrades.reduce(
  (sum, t) => sum + Number(t.outcome || 0),
  0
);
const avgConfluence = allTrades.length
  ? (
      allTrades.reduce(
        (sum, trade) => sum + Number(trade.confluence || 0),
        0
      ) / allTrades.length
    ).toFixed(2)
  : 0;


const totalLoss = lossingTrades.reduce(
  (sum, t) => sum + Number(t.outcome || 0),
  0
);

const netPnL = totalProfit + totalLoss;

const winRate = totalTrades
  ? ((winningTrades.length / totalTrades) * 100).toFixed(0)
  : 0;

const largestWin = winningTrades.length
  ? Math.max(...winningTrades.map(t => Number(t.outcome)))
  : 0;

const largestLoss = lossingTrades.length
  ? Math.min(...lossingTrades.map(t => Number(t.outcome)))
  : 0;
const grossProfit = winningTrades.reduce(
  (sum, t) => sum + Number(t.outcome || 0),
  0
);

const grossLoss = Math.abs(
  lossingTrades.reduce(
    (sum, t) => sum + Number(t.outcome || 0),
    0
  )
);

const profitFactor =
  grossLoss === 0 ? "∞" : (grossProfit / grossLoss).toFixed(2);




  return (
    <section className="min-h-screen  text-gray-700  mx-36 mt-10 mb-0 pb-10">
        
      
      <div className="mb-8">
        <h1 className="text-4xl font-semibold">Trading Dashboard</h1>
        <p className="text-sm ">
          Your trading performance at a glance
        </p>
      </div>

      
      <div className="grid grid-cols-3 gap-6">
        
        
        <div className="col-span-2 relative rounded-3xl p-8 bg-gray-200">
          
          
          <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-gray-100  flex items-center justify-center">
            <span className="text-3xl text-emerald-500">$</span>
          </div>

          <p className="text-sm text-gray-800">Net Profit & Loss</p>
          <h2 className="text-5xl font-bold text-emerald-600 mt-2">
            ${netPnL}
          </h2>
          <p className="text-sm text-emerald-600 mt-1">
            + 1 trades completed
          </p>

          
          <div className="grid grid-cols-3 gap-4 mt-8">
            <StatCard label="Win Rate" value={winRate} />
            <StatCard label="Profit Factor" value={profitFactor} />
            <StatCard label="Avg Confluence" value={avgConfluence} />
          </div>
        </div>

        
        <div className="flex flex-col gap-6">
          
          
          <div className="rounded-3xl p-6 bg-gray-200">
            <p className="text-sm text-gray-700">Total Profit</p>
            <h3 className="text-3xl font-bold mt-2">${totalProfit}</h3>
            <p className="text-sm text-emerald-600 mt-1">
              {winningTrades.length} winning trades
            </p>
          </div>

          
          <div className="rounded-3xl p-6 bg-gray-200">
            <p className="text-sm text-gray-700">Total Loss</p>
            <h3 className="text-3xl font-bold mt-2">{totalLoss}</h3>
            <p className="text-sm text-red-600 mt-1">
              {lossingTrades.length} losing trades
            </p>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-3 gap-6 mt-8">
        <BottomCard label="Largest Win" value={largestWin} />
        <BottomCard label="Largest Loss" value={largestLoss} />
        <BottomCard label="Total Trades" value={allTrades.length} />
      </div>



      
      <TradingCalendar/>
    </section>
  );
}

export default Dashboard