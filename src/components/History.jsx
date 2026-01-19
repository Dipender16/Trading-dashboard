import React, { useEffect, useState } from "react";
import TradeCard from "./TradeCard";
import trades from "../appwrite/tradeManagement";
import authService from "../appwrite/auth";
import { Query } from "appwrite"; // Add this at the top

function History() {
  const [tradesType, setTradesType] = useState("All");
  const [allTrades, setAllTrades] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const user = await authService.getCurrentUser();
        if (!user) {
          console.log("User not logged in");
          return;
        }
        let queries = [];
        if (tradesType === "Win") queries = [Query.equal("tradeResult", "Win")];
        else if (tradesType === "Loss")
          queries = [Query.equal("tradeResult", "Loss")];
        else if (tradesType === "Breakeven")
          queries = [Query.equal("tradeResult", "Breakeven")];

        const result = await trades.getTrades(queries);
        setAllTrades(result);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrades();
  }, [tradesType]);

  return (
    <section className="mx-36 my-10">
      <h1 className="text-4xl mb-1 font-thin font-sans">Trading History</h1>
      <p className="text-sm font-sans font-extralight">
        View and manage your trading journal
      </p>
      <div className="my-6 flex gap-2">
        <button
          onClick={() => setTradesType("All")}
          className={`cursor-pointer px-4 py-2 rounded-2xl ${tradesType === "All" ? "bg-linear-to-r from-purple-600 to-pink-500  text-white font-thin border-none" : " bg-gray-200 border border-gray-600"}`}
        >
          All
        </button>

        <button
          onClick={() => setTradesType("Win")}
          className={`cursor-pointer px-4 py-2 rounded-2xl ${tradesType === "Win" ? "bg-linear-to-r from-purple-600 to-pink-500  text-white font-thin border-none" : " bg-gray-200 border border-gray-600"}`}
        >
          Win
        </button>

        <button
          onClick={() => setTradesType("Loss")}
          className={`cursor-pointer px-4 py-2 rounded-2xl ${tradesType === "Loss" ? "bg-linear-to-r from-purple-600 to-pink-500  text-white font-thin border-none" : " bg-gray-200 border border-gray-600"}`}
        >
          Loss
        </button>

        <button
          onClick={() => setTradesType("Breakeven")}
          className={`cursor-pointer px-4 py-2 rounded-2xl ${tradesType === "Breakeven" ? "bg-linear-to-r from-purple-600 to-pink-500  text-white font-thin border-none" : " bg-gray-200 border border-gray-600"}`}
        >
          Breakeven
        </button>
      </div>

      <div className="grid gap-2 grid-cols-3">
        {allTrades?.map((trade) => (
          <TradeCard
            key={trade.$id}
            currencyPair={trade.currencyPair}
            outcome={trade.outcome}
            tradeDirection={trade.tradeDirection}
            totalConfluence={trade.totalConfluence}
            date={trade.date}
          />
        ))}
      </div>
    </section>
  );
}

export default History;
