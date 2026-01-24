import React from "react";

function CheckBtn({checked, onChange}) {
  return (
    <>
     <label className="relative inline-flex items-center cursor-pointer">
  <input
    type="checkbox"
    className="sr-only peer"
    checked={checked}
    onChange={onChange}
  />

  
  <div
    className="w-12 sm:w-14 h-6 sm:h-8 rounded-full
               bg-gray-300
               peer-checked:bg-linear-to-r peer-checked:from-purple-500 peer-checked:to-pink-500
               transition-colors duration-300"
  ></div>

  
  <span
    className="absolute left-0.5 sm:left-1 top-0.5 sm:top-1 w-5 sm:w-6 h-5 sm:h-6 bg-white rounded-full
               transition-transform duration-300
               peer-checked:translate-x-5 sm:peer-checked:translate-x-6"
  ></span>
</label>

    </>
  );
}

export default CheckBtn;
