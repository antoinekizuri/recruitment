import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../components/users/DateInput/DateInput";

export default function SectionH({ formData, handleChange }) {
  // Yes/No options
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        H. CRIMINAL RECORD
      </h2>
      
      <div className="mb-6">
        <RadioGroup
          label="Were you ever convicted of a criminal offence involving financial misconduct, fraud or corruption?"
          name="has_criminal_record"
          value={formData.has_criminal_record}
          onChange={handleChange}
          options={yesNoOptions}
          required
          tooltip="Indicate whether you have been convicted of financial misconduct, fraud, or corruption"
        />
      </div>
      
      {formData.has_criminal_record === "yes" && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              label="Type of Criminal Act"
              name="criminal_act_type"
              value={formData.criminal_act_type}
              onChange={handleChange}
              required
              tooltip="The nature or type of criminal offense"
            />
            
            <DateInput
              label="Date Criminal Case Was Finalized"
              name="criminal_case_date"
              value={formData.criminal_case_date}
              onChange={handleChange}
              required
              tooltip="The date when the criminal case was concluded"
            />
            
            <TextInput
              label="Outcome/Judgment"
              name="criminal_case_outcome"
              value={formData.criminal_case_outcome}
              onChange={handleChange}
              required
              tooltip="The outcome or judgment of the criminal case"
            />
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Important:</span> The City of Polokwane may require you to 
          provide a police clearance certificate as part of the selection process. Any false 
          declaration regarding criminal records may lead to disqualification from the 
          recruitment process or termination of employment if discovered after appointment.
        </p>
      </div>
    </div>
  );
}