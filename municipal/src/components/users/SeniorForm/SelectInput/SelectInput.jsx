import React, { useState } from "react";
import Tooltip from "../ToolTip/ToolTip";
import "./SelectInput.css"; // Reuse same file

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
    <div className={`input-group ${className}`}>
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
        {tooltip && <Tooltip text={tooltip} />}
      </label>

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="select-field"
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
