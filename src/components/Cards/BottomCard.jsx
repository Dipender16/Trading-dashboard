import React from 'react'

function BottomCard({label, value}) {
  return  (
  <div className="rounded-3xl p-6 bg-gray-200">
    <p className="text-sm text-gray-700">{label}</p>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);
}

export default BottomCard