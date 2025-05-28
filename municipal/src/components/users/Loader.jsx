import React from "react";
import "./Loader.css"; // Optional: for custom spinner styles

export default function Loader({ message = "Loading..." }) {
  return (
    <div className="loader-container">
      <div className="spinner" />
      <p className="loader-message">{message}</p>
    </div>
  );
}
