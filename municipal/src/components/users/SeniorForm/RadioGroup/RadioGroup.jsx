import React from "react";
import Tooltip from "../ToolTip/ToolTip";
import "./RadioGroup.css";

export default function RadioGroup({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  tooltip = "",
  inline = false,
  disabled = false,
  error = "",
  className = ""
}) {
  const handleRadioChange = (e) => {
    if (disabled) return;
    
    onChange({
      target: {
        name,
        value: e.target.value,
        type: "radio"
      }
    });
  };

  return (
    <div className={`radio-group ${error ? 'radio-group-error' : ''} ${className}`}>
      <div className="radio-label-row">
        <label className="radio-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
        {tooltip && <Tooltip text={tooltip} />}
      </div>

      <div className={`radio-options ${inline ? "radio-inline" : "radio-stacked"}`}>
        {options.map((option) => (
          <label
            key={option.value}
            htmlFor={`${name}-${option.value}`}
            className={`radio-option ${disabled || option.disabled ? 'disabled' : ''}`}
          >
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={handleRadioChange}
              className="radio-input"
              disabled={disabled || option.disabled}
              aria-describedby={error ? `${name}-error` : undefined}
            />
            <span className="radio-text">{option.label}</span>
          </label>
        ))}
      </div>
      
      {error && (
        <div className="radio-error-message" id={`${name}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}