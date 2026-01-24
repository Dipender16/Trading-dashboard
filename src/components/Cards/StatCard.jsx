import React from 'react'

function StatCard({label, value}) {
  return(
  <div className="w-full sm:w-auto rounded-2xl bg-gray-100 md:p-4 p-2 text-center">
  <p className="text-[7px] sm:text-[9px] text-gray-800">{label}</p>
  <p className="text-sm sm:text-xl font-semibold mt-1 sm:mt-2">{value}</p>
</div>

)
}

export default StatCard