import React from "react";

function CheckBtn({checked, onChange}) {
  return (
    <>
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" className="sr-only peer" checked={checked} onChange={onChange} />

        <div
          className="w-14 h-8 rounded-full
           bg-gray-300
           peer-checked:bg-linear-to-r peer-checked:from-purple-500 peer-checked:to-pink-500
           transition-colors duration-300"
        ></div>

        <span
          className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full
           transition-transform duration-300
           peer-checked:translate-x-6"
        ></span>
      </label>
    </>
  );
}

export default CheckBtn;
