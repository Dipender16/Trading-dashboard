import Stat from "./Stat";
import ChartImage from "./ChartImage";
import trades from "../../appwrite/tradeManagement";

function TradePreview({ open, onClose, trade }) {
  if (!open || !trade) return null;
  console.log(trade)

  const beforeImageUrl = trade.beforeChart
    ? trades.getImagePreview(trade.beforeChart)
    : null;

  const afterImageUrl = trade.afterChart
    ? trades.getImagePreview(trade.afterChart)
    : null;

    console.log(afterImageUrl, " ", beforeImageUrl)
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0f172a] text-white shadow-2xl p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold">{trade.currencyPair}</h2>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  trade.tradeDirection === "Long"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {trade.tradeDirection}
              </span>
            </div>

            <button
              onClick={onClose}
              className="text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <Stat label="Confluence" value={`${trade.totalConfluence}%`} />
            <Stat label="Direction" value={trade.tradeDirection} />
            <Stat label="Outcome" value={trade.tradeResult} />
            <Stat label="Date" value={trade.date} />
          </div>

          {/* PnL */}
          <div className="mb-5 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <p className="text-sm text-emerald-400">TOTAL</p>
            <p className="text-2xl font-semibold text-emerald-300">
              ${trade.outcome}
            </p>
          </div>

          {/* Chart Images */}
          <div>
            <p className="text-sm text-gray-400 mb-3">Chart Images</p>

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
