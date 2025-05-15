import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../components/users/DateInput/DateInput";

export default function SectionG({ formData, handleChange }) {
  // Yes/No options
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        G. DISCIPLINARY RECORD
      </h2>
      
      <div className="mb-6">
        <RadioGroup
          label="Have you ever been dismissed for misconduct during the past ten (10) years?"
          name="dismissed_for_misconduct"
          value={formData.dismissed_for_misconduct}
          onChange={handleChange}
          options={yesNoOptions}
          required
          tooltip="Indicate whether you have been dismissed for misconduct in the past 10 years"
        />
      </div>
      
      {formData.dismissed_for_misconduct === "yes" && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 gap-4">
            <TextInput
              label="Name of Municipality/Institution"
              name="misconduct_institution"
              value={formData.misconduct_institution}
              onChange={handleChange}
              required
              tooltip="The name of the employer where the misconduct occurred"
            />
            
            <TextInput
              label="Type of Misconduct/Transgression"
              name="misconduct_type"
              value={formData.misconduct_type}
              onChange={handleChange}
              required
              tooltip="The nature or type of misconduct"
            />
            
            <DateInput
              label="Date of Resignation/Disciplinary Case Finalized"
              name="misconduct_date"
              value={formData.misconduct_date}
              onChange={handleChange}
              required
              tooltip="The date when you resigned or when the disciplinary case was finalized"
            />
            
            <TextInput
              label="Award/Sanction"
              name="misconduct_sanction"
              value={formData.misconduct_sanction}
              onChange={handleChange}
              required
              tooltip="The penalty or sanction imposed"
            />
          </div>
        </div>
      )}
      
      <div className="mt-6 mb-6">
        <RadioGroup
          label="Did you resign from your job pending finalization of the disciplinary proceedings?"
          name="resigned_pending_disciplinary"
          value={formData.resigned_pending_disciplinary}
          onChange={handleChange}
          options={yesNoOptions}
          required
          tooltip="Indicate whether you resigned from any position while disciplinary proceedings were ongoing"
        />
      </div>
      
      {formData.resigned_pending_disciplinary === "yes" && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Please provide details about the resignation and pending disciplinary proceedings:
            </label>
            <textarea
              name="disciplinary_details"
              value={formData.disciplinary_details}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Provide details about the circumstances..."
            />
          </div>
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Important:</span> It is crucial that you provide 
          accurate information regarding your disciplinary history. The City of Polokwane 
          reserves the right to verify this information, and any false declarations may 
          lead to disqualification from the recruitment process or termination of employment 
          if discovered after appointment.
        </p>
      </div>
    </div>
  );
}