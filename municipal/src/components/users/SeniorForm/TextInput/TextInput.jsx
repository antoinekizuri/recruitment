import React, { useState } from "react";
import Tooltip from "../ToolTip/ToolTip";
import "./TextInput.css";

export default function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  tooltip = "",
  type = "text",
  maxLength = null,
  className = "",
  disabled = false,
  helperText = ""
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={`input-group ${className}`}>
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span className="required">*</span>}
        {tooltip && <Tooltip text={tooltip} />}
      </label>

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="input-field"
      />

      {helperText && (
        <small className="helper-text">
          {helperText}
        </small>
      )}
    </div>
  );
}
