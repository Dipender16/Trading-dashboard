import { useState } from "react";
import trades from "../appwrite/tradeManagement";
import authService from "../appwrite/auth";

function AddTrade({ open, onClose, totalConfluence }) {
  const [tradeDirection, setTradeDirection] = useState("");
  const [currencyPair, setCurrencyPair] = useState("");
  const [accountBalance, setAccountBalance] = useState("");
  const [sl, setSl] = useState("");
  const [tp, setTp] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [risk, setRisk] = useState("");
  const [lotSize, setLotSize] = useState("");
  const [outcome, setOutcome] = useState(0);
  const [tradeResult, setTradeResult] = useState("");
  const [beforeChartImage, setBeforeChartImage] = useState(null);
  const [afterChartImage, setAfterChartImage] = useState(null);

  if (!open) return null;
  
  

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const user = await authService.getCurrentUser();
    if (!user) {
      alert("User not logged in");
      return;
    }

    if (!currencyPair || !tradeDirection || !tradeResult) {
      alert("Please fill all required fields");
      return;
    }

    if (!beforeChartImage) {
      alert("Before Chart image is required");
      return;
    }
    if (!afterChartImage) {
      alert("After Chart image is required");
      return;
    }

    if (isNaN(totalConfluence)) {
      alert("Total confluence must be a number");
      return;
    }

    const beforeChartUploaded = await trades.uploadFile(beforeChartImage);
    const afterChartUploaded = await trades.uploadFile(afterChartImage);

    const tradeData = {
      userId: user.$id,
      currencyPair,
      tradeDirection,
      totalConfluence: Number(totalConfluence),
      beforeChart: beforeChartUploaded.$id,
      afterChart: afterChartUploaded.$id,
      outcome: Number(outcome),
      tradeResult,
    };

    await trades.addTrade(tradeData);

    alert("Trade saved successfully");
    onClose();
  } catch (err) {
    console.error("Appwrite Error:", err);
    alert(err.message || "Failed to save trade");
  }
};


  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-xl
                        bg-gray-200 shadow-2xl p-6"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold ">Save Trade</h2>
            <button
              onClick={onClose}
              className="hover:cursor-pointer hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          <div className="mb-5 p-4 rounded-lg bg-gray-100 text-emerald-500 font-medium">
            Confluence Score: {totalConfluence}%
          </div>

          <form className="space-y-4 " onSubmit={handleSubmit}>
            <div>
              <label className="text-sm text-gray-700">Currency Pair *</label>
              <select
                value={currencyPair}
                onChange={(e) => setCurrencyPair(e.target.value)}
                className="w-full mt-1 border text-gray-700 cursor-pointer border-slate-700 rounded-lg p-3"
              >
                <option value={""}>Select currency pair</option>
                <option>EURUSD</option>
                <option>GBPUSD</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Direction *</label>
              <div className="flex gap-3 mt-1">
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg hover:cursor-pointer border border-slate-700 ${tradeDirection === "Long" ? "bg-green-500 text-white border-green-500" : " text-black"}`}
                  onClick={() => setTradeDirection("Long")}
                >
                  Long
                </button>
                <button
                  type="button"
                  className={`flex-1 py-2 rounded-lg hover:cursor-pointer border border-slate-700 ${tradeDirection === "Short" ? "bg-red-400 text-white border-red-400" : " text-black"}`}
                  onClick={() => setTradeDirection("Short")}
                >
                  Short
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Account Balance (USD) *
              </label>
              <input
                type="number"
                value={accountBalance}
                placeholder="10,000"
                onChange={(e) => setAccountBalance(e.target.value)}
                className="w-full mt-1 border border-slate-700 rounded-lg p-3"
              />
            </div>

            <div className="flex flex-col">
              <label className=" text-gray-700">TotalConfluence</label>
              <input
                placeholder={`totalConfluence: ${totalConfluence}`}
                value={totalConfluence}
                className=" border border-slate-700 rounded-lg p-3 text-gray-700"
                disabled
              />
            </div>

            <div className="grid grid-cols-2 gap-4 ">
              <div>
                <label className="text-sm text-red-500">Stop Loss *</label>
                <input
                  value={sl}
                  onChange={(e) => setSl(e.target.value)}
                  className="w-full mt-1  border border-red-600 rounded-lg p-3"
                />
              </div>
              <div>
                <label className="text-sm text-emerald-500">
                  Take Profit *
                </label>
                <input
                  value={tp}
                  onChange={(e) => setTp(e.target.value)}
                  className="w-full mt-1 border border-emerald-600 rounded-lg p-3"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                placeholder="Entry Price"
                value={entryPrice}
                onChange={(e) => setEntryPrice(e.target.value)}
                className=" border border-slate-700 rounded-lg p-3"
              />
              <input
                placeholder="Risk %"
                value={risk}
                onChange={(e) => setRisk(e.target.value)}
                className=" border border-slate-700 rounded-lg p-3"
              />
              <input
                placeholder="Lot size"
                value={lotSize}
                onChange={(e) => setLotSize(e.target.value)}
                className=" border border-slate-700 rounded-lg p-3"
              />
              <input
                placeholder="Outcome"
                value={outcome}
                onChange={(e) => setOutcome(e.target.value)}
                className=" border border-slate-700 rounded-lg p-3"
              />
            </div>
            <p className="pt-5 text-gray-700">Trade Result</p>
            <div className="grid grid-cols-3 gap-1">
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg hover:cursor-pointer border border-slate-700 ${tradeResult === "Win" ? "bg-green-500 text-white border-green-500" : " text-gray-700"}`}
                onClick={() => setTradeResult("Win")}
              >
                Win
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg hover:cursor-pointer border border-slate-700 ${tradeResult === "Loss" ? "bg-red-500 text-white border-red-500" : " text-gray-700"}`}
                onClick={() => setTradeResult("Loss")}
              >
                Loss
              </button>
              <button
                type="button"
                className={`flex-1 py-2 rounded-lg hover:cursor-pointer border border-slate-700 ${tradeResult === "Breakeven" ? "bg-gray-500 text-white border-gray-500" : " text-gray-700"}`}
                onClick={() => setTradeResult("Breakeven")}
              >
                Breakeven
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Chart Image (Before Trade) *
              </label>

              <label
                className="mt-2 flex flex-col items-center justify-center cursor-pointer
                    border border-dashed border-black rounded-xl
                     hover:bg-slate-300/80
                    transition p-6 text-center"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => setBeforeChartImage(e.target.files[0])}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-700 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V12M12 16V8M17 16V10M3 20h18"
                  />
                </svg>

                <p className="text-sm text-gray-700">
                  {beforeChartImage
                    ? beforeChartImage.name
                    : "Click to upload before-trade chart"}
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  PNG, JPG up to 10MB (1 image only)
                </p>
              </label>
            </div>

            <div>
              <label className="text-sm text-gray-700">
                Chart Image (After Trade) *
              </label>

              <label
                className="mt-2 flex flex-col items-center justify-center cursor-pointer
                    border border-dashed border-black rounded-xl
                     hover:bg-slate-300/80
                    transition p-6 text-center"
              >
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  className="hidden"
                  onChange={(e) => setAfterChartImage(e.target.files[0])}
                />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-gray-700 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16V12M12 16V8M17 16V10M3 20h18"
                  />
                </svg>

                <p className="text-sm text-gray-700">
                  {afterChartImage
                    ? afterChartImage.name
                    : "Click to upload before-trade chart"}
                </p>

                <p className="text-xs text-gray-700 mt-1">
                  PNG, JPG up to 10MB (1 image only)
                </p>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-500 font-semibold"
            >
              Save Trade
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddTrade;
