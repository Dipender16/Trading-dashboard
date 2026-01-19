import React from 'react'

function StatCard({label, value}) {
  return(
  <div className="rounded-2xl bg-gray-100 p-6">
    <p className="text-xs text-gray-800">{label}</p>
    <p className="text-xl font-semibold mt-1">{value}</p>
  </div>
)
}

export default StatCard