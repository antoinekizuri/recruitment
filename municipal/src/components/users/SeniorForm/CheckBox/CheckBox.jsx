import React from "react";
import Tooltip from "../ToolTip/ToolTip";

export default function Checkbox({
  label,
  name,
  checked,
  onChange,
  required = false,
  tooltip = "",
  className = ""
}) {
  return (
    <div className={`mb-4 ${className}`}>
      <div className="flex items-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
        <div className="flex items-center ml-2">
          <label className="text-sm text-gray-700" htmlFor={name}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {tooltip && <Tooltip text={tooltip} />}
        </div>
      </div>
    </div>
  );
}