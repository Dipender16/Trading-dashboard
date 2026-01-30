function Stat({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-lg p-3 text-center">
      <p className="text-xs text-gray-400 mb-1">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

export default Stat;