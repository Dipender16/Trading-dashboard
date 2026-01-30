function Stat({ label, value }) {
  return (
    <div className="bg-slate-100 rounded-lg p-3 text-center">
      <p className="text-xs text-gray-700 mb-1">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}

export default Stat;