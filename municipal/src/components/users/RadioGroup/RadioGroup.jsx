import React from "react";
import Tooltip from "../ToolTip/ToolTip";

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  tooltip = "",
  inline = false,
  className = ""
}) {
  const handleRadioChange = (e) => {
    onChange({
      target: {
        name: name,
        value: e.target.value,
        type: "radio"
      }
    });
  };

  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center mb-1">
        <label className="block text-gray-700 text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>
      <div className={`${inline ? "flex flex-wrap gap-4" : "space-y-2"}`}>
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleRadioChange}
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className="ml-2 text-sm text-gray-700"
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}