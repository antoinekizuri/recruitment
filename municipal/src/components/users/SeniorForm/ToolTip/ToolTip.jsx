import React, { useState } from "react";
import "./ToolTip.css";

export default function Tooltip({ text }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="tooltip-wrapper">
      <div
        className="tooltip-icon"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        ?
      </div>

      {isVisible && (
        <div className="tooltip-content">
          <div className="tooltip-arrow"></div>
          {text}
        </div>
      )}
    </div>
  );
}
