import React, { useState } from "react";
import Tooltip from "../ToolTip/ToolTip";
import "./DateInput.css";

export default function DateInput({
  label,
  name,
  value,
  onChange,
  required = false,
  tooltip = "",
  min = "",
  max = "",
  className = ""
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`date-input-group ${className}`}>
      <div className="flex items-center mb-1">
        <label htmlFor={name} className="date-input-label">
          {label}
          {required && <span className="required ml-1">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <input
        type="date"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`date-input-field ${isFocused ? "focused" : ""}`}
      />
    </div>
  );
}
