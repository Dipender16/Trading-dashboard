import React from "react";

function BottomCard({ label, value }) {
  return (
    <div className="w-full sm:w-auto rounded-3xl p-2 sm:p-6 bg-gray-200 text-center">
      <p className="text-[9px] sm:text-xs md:text-sm text-gray-700">{label}</p>
      <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2">{value}</p>
    </div>
  );
}

export default BottomCard;
