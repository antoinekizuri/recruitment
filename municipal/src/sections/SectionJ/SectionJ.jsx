import React, { useState } from "react";
import DateInput from "../../components/users/DateInput/DateInput";
import TextInput from "../../components/users/TextInput/TextInput";
export default function SectionJ({ formData, handleChange }) {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const handleAgreementChange = (e) => {
    setAgreedToTerms(e.target.checked);
    handleChange({
      target: {
        name: "declaration_agreed",
        value: e.target.checked
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        J. DECLARATION
      </h2>
      
      <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-gray-800 leading-relaxed">
          I hereby declare that all the information provided in this application and any attachments 
          in support thereof are to the best of my knowledge true and correct. I understand that any 
          misrepresentation or failure to disclose any information may lead to my disqualification or 
          the termination of my employment contract, if appointed.
        </p>
      </div>
      
      <div className="mb-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="declaration_agreement"
              name="declaration_agreed"
              type="checkbox"
              checked={agreedToTerms}
              onChange={handleAgreementChange}
              className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
              required
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="declaration_agreement" className="font-medium text-gray-700">
              I agree with the above declaration
            </label>
            <p className="text-gray-500">
              By checking this box, you confirm that all information provided is true and accurate.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <DateInput
          label="Date of Declaration"
          name="declaration_date"
          value={formData.declaration_date}
          onChange={handleChange}
          required
          tooltip="Today's date to serve as your electronic signature date"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Electronic Signature</label>
        <p className="text-sm text-gray-500 mb-2">
          By submitting this form, you are electronically signing this application.
          Typing your full name below serves as your electronic signature.
        </p>
        <TextInput
          type="text"
          name="electronic_signature"
          value={formData.electronic_signature || ""}
          onChange={handleChange}
          placeholder="Type your full name"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          required
        />
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