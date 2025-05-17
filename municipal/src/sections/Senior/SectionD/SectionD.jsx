// import React from "react";
// import TextInput from "../../../components/users/TextInput/TextInput";
// import DateInput from "../../../components/users/DateInput/DateInput";

// export default function SectionDSenior({ formData, handleChange }) {
//   return (
//     <div className="section-container">
//       <h2 className="section-title">D. DRIVER'S LICENCE DETAILS</h2>

//       <div className="mb-6">
//         <TextInput
//           label="License Code(s) (e.g., B, C1, EB)"
//           name="license_codes"
//           value={formData.license_codes}
//           onChange={handleChange}
//           required
//           tooltip="Specify all driver’s license codes you currently hold"
//         />
//       </div>

//       <div className="mb-6">
//         <DateInput
//           label="Licence Expiry Date"
//           name="license_expiry_date"
//           value={formData.license_expiry_date}
//           onChange={handleChange}
//           required
//           tooltip="Provide the expiry date of your most current driver’s licence"
//         />
//       </div>

//       <div className="section-note">
//         <p className="text-sm text-blue-800">
//           <span className="font-bold">Note:</span> Senior positions may require a valid driver's licence. 
//           Ensure all licence information provided is valid and verifiable.
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";
import SelectInput from "../../../components/users/SelectInput/SelectInput";
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

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Certified Qualification Document
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            name="senior_qualification_file"
            onChange={(e) =>
              handleChange({
                target: {
                  name: "senior_qualification_file",
                  value: e.target.files[0]
                }
              })
            }
            className="file-input"
          />
          {formData.senior_qualification_file && (
            <p className="text-sm text-gray-600 mt-1 truncate">
              Selected File:{" "}
              <strong>{formData.senior_qualification_file.name}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> Certified copies of qualifications must be
          submitted. Only relevant qualifications will be considered.
        </p>
      </div>
    </div>
  );
}
