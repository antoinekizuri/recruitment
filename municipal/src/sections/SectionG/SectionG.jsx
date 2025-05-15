import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../components/users/DateInput/DateInput";

export default function SectionG({ formData, handleChange }) {
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="pt-4 pb-10 mb-10 border-b border-gray-200">
      <h2 className="text-xl font-bold text-blue-900 mb-6">G. DISCIPLINARY RECORD</h2>

      {/* Question 1 */}
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

      {/* Misconduct Details */}
      {formData.dismissed_for_misconduct === "yes" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Misconduct Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* Question 2 */}
      <div className="mb-6">
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

      {/* Additional Textarea for Explanation */}
      {formData.resigned_pending_disciplinary === "yes" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Please provide details about the resignation and pending disciplinary proceedings:
          </h3>
          <textarea
            name="disciplinary_details"
            value={formData.disciplinary_details}
            onChange={handleChange}
            rows={4}
            required
            placeholder="Provide details about the circumstances..."
            className="w-full min-h-[120px] resize-y border border-gray-300 rounded-lg bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
          />
        </div>
      )}

      {/* Final Note */}
      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Important:</span> It is crucial that you provide accurate
          information regarding your disciplinary history. The City of Polokwane reserves the
          right to verify this information, and any false declarations may lead to disqualification
          from the recruitment process or termination of employment if discovered after appointment.
        </p>
      </div>
    </div>
  );
}
