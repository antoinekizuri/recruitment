
import React from "react";
import TextInput from "../../../components/users/SeniorForm/TextInput/TextInput";
import SelectInput from "../../../components/users/SeniorForm/SelectInput/SelectInput";
import "./SectionD.css";

export default function SectionDSenior({ formData, handleChange }) {
  const nqfLevelOptions = [
    { value: "4", label: "NQF Level 4 (Matric/Grade 12)" },
    { value: "5", label: "NQF Level 5 (Higher Certificate)" },
    { value: "6", label: "NQF Level 6 (Diploma)" },
    { value: "7", label: "NQF Level 7 (Bachelor’s Degree)" },
    { value: "8", label: "NQF Level 8 (Honours/Postgrad Diploma)" },
    { value: "9", label: "NQF Level 9 (Master’s Degree)" },
    { value: "10", label: "NQF Level 10 (Doctorate)" }
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Select Year" },
    ...Array.from({ length: currentYear - 1960 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];
  const handleAddQualification = () => {
    handleChange({
      target: {
        name: "qualifications",
        value: [
          ...(formData.qualifications || []),
          { qualification: "", institution: "", nqf_level: "", year_obtained: "" }
        ]
      }
    });
    setShowAddQualification(false);
  };

  const handleRemoveQualification = (index) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications.splice(index, 1);
    handleChange({ target: { name: "qualifications", value: updatedQualifications } });
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...(formData.qualifications || [])];
    updatedQualifications[index] = { ...updatedQualifications[index], [field]: value };
    handleChange({ target: { name: "qualifications", value: updatedQualifications } });
  };
  return (
    <div className="section-container">
      <h2 className="section-title">D. ACADEMIC QUALIFICATIONS</h2>

      <p className="text-sm text-gray-600 mb-4">
        Please list your highest academic qualifications. Attach certified copies as required.
      </p>

      <div className="space-y-4">
        <TextInput
          label="Qualification Title"
          name="senior_qualification"
          value={formData.senior_qualification}
          onChange={handleChange}
          required
          tooltip="E.g. Bachelor of Public Administration, Honours in Political Science"
        />

        <TextInput
          label="Institution Name"
          name="senior_institution"
          value={formData.senior_institution}
          onChange={handleChange}
          required
          tooltip="Name of the university or college"
        />

        <div className="grid-two-columns">
          <SelectInput
            label="NQF Level"
            name="senior_nqf_level"
            value={formData.senior_nqf_level}
            onChange={handleChange}
            options={nqfLevelOptions}
            required
            tooltip="Select the NQF level for this qualification"
          />

          <SelectInput
            label="Year Obtained"
            name="senior_year_obtained"
            value={formData.senior_year_obtained}
            onChange={handleChange}
            options={yearOptions}
            required
            tooltip="Year you completed this qualification"
          />
        </div>
      </div>

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> You will be required to upload certified copies
          of all qualifications in Section H (Supporting Documents). The City of Polokwane reserves
          the right to verify all qualifications with the relevant institutions.
        </p>
      </div>
    </div>
  );
}
