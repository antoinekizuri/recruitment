import React, { useState } from "react";
import Tooltip from "../ToolTip/ToolTip";

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  required = false,
  tooltip = "",
  options = [],
  placeholder = "Select an option",
  className = ""
}) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center mb-1">
        <label className="block text-gray-700 text-sm font-medium" htmlFor={name}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full px-3 py-2 border ${
          isFocused ? "border-blue-500 ring-2 ring-blue-100" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none transition-all duration-200 bg-white`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}