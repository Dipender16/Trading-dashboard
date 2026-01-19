import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-8 py-3 rounded-lg font-semibold text-white
         bg-linear-to-r from-purple-500 to-pink-500
         shadow-md hover:shadow-xl hover:shadow-gray-300 transition-all duration-300 hover:cursor-pointer ${className}`} {...props}>
            {children}
        </button>
    );
}