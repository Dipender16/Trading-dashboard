import Stat from "./Stat";
import ChartImage from "./ChartImage";
import trades from "../../appwrite/tradeManagement";

function TradePreview({ open, onClose, trade }) {
  if (!open || !trade) return null;

  const beforeImageUrl = trade.beforeChart
    ? trades.getImagePreview(trade.beforeChart)
    : null;

  const afterImageUrl = trade.afterChart
    ? trades.getImagePreview(trade.afterChart)
    : null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-gray-200 text-white shadow-2xl p-6">
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-700">{trade.currencyPair}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  trade.tradeDirection === "Long"
                    ? "bg-green-600/20 text-green-500"
                    : "bg-red-600/20 text-red-500"
                }`}
              >
                {trade.tradeDirection}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-2xl text-gray-700 hover:text-white"
            >
              ×
            </button>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <Stat label="Confluence" value={`${trade.totalConfluence}%`} />
            <Stat label="Direction" value={trade.tradeDirection} />
            <Stat label="Outcome" value={trade.tradeResult} />
            <Stat label="Date" value={trade.date} />
          </div>

          
          <div className="mb-5 p-4 rounded-lg bg-gray-500/10 border border-gray-500/30">
            <p className={`text-sm  ${trade.outcome > 0? "text-emerald-500":"text-red-500"}`}>TOTAL</p>
            <p className={`text-2xl font-semibold text-emerald-300 ${trade.outcome > 0? "text-emerald-500":"text-red-500"}`}>
              ${trade.outcome}
            </p>
          </div>

          
          <div>
            <p className="text-sm text-gray-700 mb-3">Chart Images</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {beforeImageUrl && (
                <ChartImage src={beforeImageUrl} label="Before Trade" />
              )}

              {afterImageUrl && (
                <ChartImage src={afterImageUrl} label="After Trade" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TradePreview;
