function Loader({height = "min-h-screen"}) {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="w-10 h-10 border-4 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
    </div>
  );
}

export default Loader;
