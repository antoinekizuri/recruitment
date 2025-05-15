import React, { useState } from "react";

export default function Tooltip({ text }) {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <div className="relative ml-2 inline-block">
      <div
        className="w-4 h-4 rounded-full bg-gray-300 text-white flex items-center justify-center text-xs cursor-pointer hover:bg-gray-400 transition-colors"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        ?
      </div>
      {isVisible && (
        <div className="absolute z-10 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg -left-60 md:-left-32 top-6">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
          {text}
        </div>
      )}
    </div>
  );
}