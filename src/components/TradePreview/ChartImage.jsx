function ChartImage({ src, label }) {
  return (
    <div className="bg-slate-800 rounded-lg p-2">
      <p className="text-xs text-gray-400 mb-2">{label}</p>
      <img
        src={src}
        alt={label}
        className="rounded-lg w-full object-contain max-h-64 bg-black"
      />
    </div>
  );
}

export default ChartImage