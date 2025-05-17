import React from "react";
import "./ProgressIndicator.css";

export default function ProgressIndicator({ progress }) {
  return (
    <div className="progress-container">
      <div className="progress-bar-background">
        <div
          className="progress-bar-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="progress-labels">
        <span>Start</span>
        <span>{Math.round(progress)}% Complete</span>
        <span>Finish</span>
      </div>
    </div>
  );
}
