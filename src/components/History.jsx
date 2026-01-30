import { useEffect, useState } from "react";
import TradeCard from "./TradeCard";
import trades from "../appwrite/tradeManagement";
import authService from "../appwrite/auth";
import { Query } from "appwrite";
import Loader from "./Loader";


function History() {
  const [tradesType, setTradesType] = useState("All");
  const [allTrades, setAllTrades] = useState([]);
  const [loading, setLoading] = useState(true);
  
  
  
  useEffect(() => {
    setLoading(true);
    const fetchTrades = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          console.log("User not logged in");
          return;
        }
        let queries = [Query.equal("userId", user.$id)];
        if (tradesType === "Win") queries = [Query.equal("tradeResult", "Win"), Query.equal("userId", user.$id)];
        else if (tradesType === "Loss")
          queries = [Query.equal("tradeResult", "Loss"), Query.equal("userId", user.$id)];
        else if (tradesType === "Breakeven")
          queries = [Query.equal("tradeResult", "Breakeven"), Query.equal("userId", user.$id)];

        const result = await trades.getTrades(queries);
        setAllTrades(result);
      } catch (err) {
        console.error(err);
      } finally{ setLoading(false) }
    };

    fetchTrades();
  }, [tradesType]);



  if(loading) return (
    <section className="mx-4 sm:mx-6 lg:mx-36 mt-10 min-h-screen">
    <h1 className="text-2xl text-center md:text-start sm:text-3xl md:text-4xl mb-1 font-thin font-sans">Trading History</h1>
  <p className="text-xs sm:text-sm font-sans text-center md:text-start font-extralight">
    View and manage your trading journal
  </p>

  
  <div className="my-4 sm:my-6 flex justify-center md:justify-start flex-wrap gap-2">
    {["All", "Win", "Loss", "Breakeven"].map((type) => (
      <button
        key={type}
        onClick={() => setTradesType(type)}
        className={`cursor-pointer px-3 sm:px-4 py-2 rounded-2xl 
          ${tradesType === type
            ? "bg-linear-to-r from-purple-600 to-pink-500 text-white font-thin border-none"
            : "bg-gray-200 border border-gray-600"
          }`}
      >
        {type}
      </button>
    ))}
  </div>
  <Loader height="min-h-72"/>
    </section>
  )

  return (
  <section className="mx-4 sm:mx-6 lg:mx-36 mt-10 min-h-screen">
    <h1 className="text-2xl text-center md:text-start sm:text-3xl md:text-4xl mb-1 font-thin font-sans">Trading History</h1>
  <p className="text-xs sm:text-sm font-sans text-center md:text-start font-extralight">
    View and manage your trading journal
  </p>

  
  <div className="my-4 sm:my-6 flex justify-center md:justify-start flex-wrap gap-2">
    {["All", "Win", "Loss", "Breakeven"].map((type) => (
      <button
        key={type}
        onClick={() => setTradesType(type)}
        className={`cursor-pointer px-3 sm:px-4 py-2 rounded-2xl 
          ${tradesType === type
            ? "bg-linear-to-r from-purple-600 to-pink-500 text-white font-thin border-none"
            : "bg-gray-200 border border-gray-600"
          }`}
      >
        {type}
      </button>
    ))}
  </div>
  
  

  
  <div className="grid grid-cols-1 justify-items-center md:justify-items-start sm:grid-cols-2 md:grid-cols-3 gap-4">
    {allTrades?.map((trade) => (
      <TradeCard
        key={trade.$id}
        currencyPair={trade.currencyPair}
        outcome={trade.outcome}
        tradeDirection={trade.tradeDirection}
        totalConfluence={trade.totalConfluence}
        date={trade.$createdAt}
        beforeChart={trade.beforeChart}
        afterChart={trade.afterChart}
        tradeResult={trade.tradeResult}
      />
    ))}
  </div>
</section>

  );
}

export default History;
