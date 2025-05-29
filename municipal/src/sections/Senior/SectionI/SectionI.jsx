import React, { useState, useEffect } from "react";
import DateInput from "../../../components/users/SeniorForm/DateInput/DateInput";
import TextInput from "../../../components/users/SeniorForm/TextInput/TextInput";

export default function SectionJ({ formData, handleChange }) {
  const [agreedToTerms, setAgreedToTerms] = useState(formData.declaration_accepted || false);

  useEffect(() => {
  const localDateString = new Date().toISOString().split('T')[0]; // ISO format YYYY-MM-DD

    
    if (!formData.declaration_date) {
      handleChange({
        target: {
          name: "declaration_date",
          value: localDateString
        }
      });
    }
  }, []);

  // Add CSS styles for disabled date input
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .disabled-date-input .date-input-field {
        background-color: #f3f4f6 !important;
        color: #6b7280 !important;
        cursor: not-allowed !important;
        pointer-events: none !important;
      }
      .disabled-date-input .date-input-field::-webkit-calendar-picker-indicator {
        display: none !important;
      }
      .disabled-date-input .date-input-field::-webkit-inner-spin-button,
      .disabled-date-input .date-input-field::-webkit-outer-spin-button {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleAgreementChange = (e) => {
    const isChecked = e.target.checked;
    setAgreedToTerms(isChecked);
    handleChange({
      target: {
        name: "declaration_accepted",
        value: isChecked
      }
    });
  };

  return (
    <div className="section-container">
      <h2 className="section-title">I. DECLARATION</h2>

      <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-800 leading-relaxed">
          I hereby declare that all the information provided in this application and any attachments 
          in support thereof are to the best of my knowledge true and correct. I understand that any 
          misrepresentation or failure to disclose any information may lead to my disqualification or 
          the termination of my employment contract, if appointed.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex items-start space-x-3">
          <input
            id="declaration_agreement"
            name="declaration_accepted"
            type="checkbox"
            checked={agreedToTerms}
            onChange={handleAgreementChange}
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            required
          />
          <div className="flex-1">
            <label htmlFor="declaration_agreement" className="block text-sm font-medium text-gray-700 mb-1">
              I agree with the above declaration <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-gray-500">
              By checking this box, you confirm that all information provided is true and accurate.
            </p>
          </div>
        </div>
      </div>

      <div className="grid-two-columns mb-6">
        <DateInput
          label="Date of Declaration"
          name="declaration_date"
          value={formData.declaration_date || ""}
          onChange={() => {}} // Empty function to prevent changes
          required
          tooltip="Today's date is automatically set and cannot be changed"
          className="disabled-date-input"
        />

        <TextInput
          label="Electronic Signature"
          name="electronic_signature"
          value={formData.electronic_signature || ""}
          onChange={handleChange}
          placeholder="Type your full name"
          required
          tooltip="Typing your full name serves as your electronic signature"
        />
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          <strong>Electronic Signature Note:</strong> By submitting this form, you are electronically 
          signing this application. Your typed name above serves as your legal electronic signature.
        </p>
      </div>

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Important:</span> Submission of this form constitutes your 
          formal application for employment with the City of Polokwane. The application process is 
          not complete until you have reviewed all sections, provided accurate information, and 
          agreed to the declaration. False declarations or misrepresentations may result in 
          disqualification from the recruitment process or termination of employment if discovered 
          after appointment.
        </p>
      </div>
    </div>
  );
} 