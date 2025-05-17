import React, { useState } from "react";
import Tooltip from "../ToolTip/ToolTip";

export default function FileUpload({
  label,
  name,
  onChange,
  required = false,
  tooltip = "",
  accept = "*",
  multiple = false,
  className = ""
}) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
    
    // Create a synthetic event for the parent component
    onChange({
      target: {
        name,
        value: selectedFiles,
        type: "file"
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
    
    // Create a synthetic event for the parent component
    onChange({
      target: {
        name,
        value: droppedFiles,
        type: "file"
      }
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    
    // Create a synthetic event for the parent component
    onChange({
      target: {
        name,
        value: newFiles,
        type: "file"
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
      
      <div
        className={`border-2 border-dashed p-4 rounded-md text-center cursor-pointer transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={name}
          name={name}
          onChange={handleFileChange}
          accept={accept}
          multiple={multiple}
          className="hidden"
        />
        <label htmlFor={name} className="cursor-pointer block">
          <div className="mb-2">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p className="text-sm text-gray-600">
            Drag and drop {multiple ? "files" : "a file"} here, or click to select {multiple ? "files" : "a file"}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {multiple ? "Files" : "File"} should be of type: {accept.replace(/,/g, ', ')}
          </p>
        </label>
      </div>
      
      {files.length > 0 && (
        <div className="mt-2">
          <p className="text-sm text-gray-600 mb-1">Selected {files.length > 1 ? `${files.length} files` : 'file'}:</p>
          <ul className="space-y-1">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                <div className="text-sm truncate max-w-xs">
                  {file.name} <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                </div>
                <button 
                  type="button" 
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 ml-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}