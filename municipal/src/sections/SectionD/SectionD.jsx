import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../components/users/DateInput/DateInput";

export default function SectionD({ formData, handleChange }) {
  const pdpOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="section-container">
      <h2 className="section-title">D. DRIVER'S LICENCE(S)</h2>

      <div className="mb-6">
        <TextInput
          label="License Code(s) (e.g., C1, EB, etc.)"
          name="license_codes"
          value={formData.license_codes}
          onChange={handleChange}
          tooltip="Enter all driver's license codes you hold, separated by commas"
        />
      </div>

      <div className="mb-6">
        <DateInput
          label="Expiry Date of License(s)"
          name="license_expiry_date"
          value={formData.license_expiry_date}
          onChange={handleChange}
          tooltip="The date your driver's license expires"
        />
      </div>

      <div className="radio-group-wrapper mb-6">
        <RadioGroup
          label="Do you have a Professional Driving Permit (PDP)?"
          name="has_pdp"
          value={formData.has_pdp}
          onChange={handleChange}
          options={pdpOptions}
          tooltip="Indicate whether you hold a Professional Driving Permit"
        />
      </div>

      {formData.has_pdp === "yes" && (
        <div className="mb-6">
          <DateInput
            label="PDP Expiry Date"
            name="pdp_expiry_date"
            value={formData.pdp_expiry_date}
            onChange={handleChange}
            tooltip="The date your Professional Driving Permit expires"
          />
        </div>
      )}

      <div className="section-note">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> If the position you are applying for requires specific 
          driving qualifications, please ensure all license information is accurate and up-to-date. 
          You may be required to provide copies of your license and permits during the selection process.
        </p>
      </div>
    </div>
  );
}
