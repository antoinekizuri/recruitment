// import React from "react";
// import TextInput from "../../../components/users/TextInput/TextInput";
// import SelectInput from "../../../components/users/SelectInput/SelectInput";
// import "./SectionE.css";

// export default function SectionESenior({ formData, handleChange }) {
//   const nqfLevelOptions = [
//     { value: "4", label: "NQF Level 4 (Matric/Grade 12)" },
//     { value: "5", label: "NQF Level 5 (Higher Certificate)" },
//     { value: "6", label: "NQF Level 6 (Diploma)" },
//     { value: "7", label: "NQF Level 7 (Bachelor’s Degree)" },
//     { value: "8", label: "NQF Level 8 (Honours/Postgrad Diploma)" },
//     { value: "9", label: "NQF Level 9 (Master’s Degree)" },
//     { value: "10", label: "NQF Level 10 (Doctorate)" }
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [
//     { value: "", label: "Select Year" },
//     ...Array.from({ length: currentYear - 1960 }, (_, i) => {
//       const year = currentYear - i;
//       return { value: year.toString(), label: year.toString() };
//     })
//   ];

//   return (
//     <div className="section-container">
//       <h2 className="section-title">E. ACADEMIC QUALIFICATIONS</h2>

//       <p className="text-sm text-gray-600 mb-4">
//         Please list your highest academic qualifications. Attach certified copies as required.
//       </p>

//       <div className="space-y-4">
//         <TextInput
//           label="Qualification Title"
//           name="senior_qualification"
//           value={formData.senior_qualification}
//           onChange={handleChange}
//           required
//           tooltip="E.g. Bachelor of Public Administration, Honours in Political Science"
//         />

//         <TextInput
//           label="Institution Name"
//           name="senior_institution"
//           value={formData.senior_institution}
//           onChange={handleChange}
//           required
//           tooltip="Name of the university or college"
//         />

//         <div className="grid-two-columns">
//           <SelectInput
//             label="NQF Level"
//             name="senior_nqf_level"
//             value={formData.senior_nqf_level}
//             onChange={handleChange}
//             options={nqfLevelOptions}
//             required
//             tooltip="Select the NQF level for this qualification"
//           />

//           <SelectInput
//             label="Year Obtained"
//             name="senior_year_obtained"
//             value={formData.senior_year_obtained}
//             onChange={handleChange}
//             options={yearOptions}
//             required
//             tooltip="Year you completed this qualification"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Upload Certified Qualification Document
//           </label>
//           <input
//             type="file"
//             accept=".pdf,.jpg,.jpeg,.png"
//             name="senior_qualification_file"
//             onChange={(e) =>
//               handleChange({
//                 target: {
//                   name: "senior_qualification_file",
//                   value: e.target.files[0]
//                 }
//               })
//             }
//             className="file-input"
//           />
//           {formData.senior_qualification_file && (
//             <p className="text-sm text-gray-600 mt-1 truncate">
//               Selected File:{" "}
//               <strong>{formData.senior_qualification_file.name}</strong>
//             </p>
//           )}
//         </div>
//       </div>

//       <div className="section-note mt-6">
//         <p className="text-sm text-blue-800">
//           <span className="font-bold">Note:</span> Certified copies of qualifications must be
//           submitted. Only relevant qualifications will be considered.
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import TextInput from "../../../components/users/TextInput/TextInput";
import SelectInput from "../../../components/users/SelectInput/SelectInput";

export default function SectioneESenior({ formData, handleChange }) {
  const [showAddEmployer, setShowAddEmployer] = useState(false);

  const monthOptions = [
    { value: "", label: "Month" },
    ...[
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ].map((month, index) => ({
      value: String(index + 1).padStart(2, "0"),
      label: month
    }))
  ];

  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Year" },
    ...Array.from({ length: 40 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  const handleAddEmployer = () => {
    const current = formData.senior_employment_history || [];
    const newEmployer = {
      employer_name: "",
      position_held: "",
      from_month: "",
      from_year: "",
      to_month: "",
      to_year: "",
      reason_for_leaving: "",
      contact_person: "",
      contact_number: ""
    };

    handleChange({
      target: {
        name: "senior_employment_history",
        value: [...current, newEmployer]
      }
    });

    setShowAddEmployer(false);
  };

  const handleRemoveEmployer = (index) => {
    const updated = [...formData.senior_employment_history];
    updated.splice(index, 1);
    handleChange({ target: { name: "senior_employment_history", value: updated } });
  };

  const handleEmployerChange = (index, field, value) => {
    const updated = [...(formData.senior_employment_history || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange({ target: { name: "senior_employment_history", value: updated } });
  };

  return (
    <div className="section-container">
      <h2 className="section-title">E. EMPLOYMENT RECORD</h2>

      <p className="text-sm text-gray-600 mb-4">
        Please list your employment record, starting with the most recent. Include senior management roles relevant to this application.
      </p>

      {(formData.senior_employment_history || []).map((employer, index) => (
        <div
          key={index}
          className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm"
        >
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-gray-700 font-medium">Employer {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveEmployer(index)}
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>

          <div className="grid-two-columns gap-4 mb-4">
            <TextInput
              label="Employer Name"
              value={employer.employer_name}
              onChange={(e) =>
                handleEmployerChange(index, "employer_name", e.target.value)
              }
              required
            />
            <TextInput
              label="Position Held"
              value={employer.position_held}
              onChange={(e) =>
                handleEmployerChange(index, "position_held", e.target.value)
              }
              required
            />
          </div>

          <div className="grid-two-columns mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="grid grid-cols-2 gap-2">
                <SelectInput
                  value={employer.from_month}
                  onChange={(e) =>
                    handleEmployerChange(index, "from_month", e.target.value)
                  }
                  options={monthOptions}
                />
                <SelectInput
                  value={employer.from_year}
                  onChange={(e) =>
                    handleEmployerChange(index, "from_year", e.target.value)
                  }
                  options={yearOptions}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="grid grid-cols-2 gap-2">
                <SelectInput
                  value={employer.to_month}
                  onChange={(e) =>
                    handleEmployerChange(index, "to_month", e.target.value)
                  }
                  options={monthOptions}
                />
                <SelectInput
                  value={employer.to_year}
                  onChange={(e) =>
                    handleEmployerChange(index, "to_year", e.target.value)
                  }
                  options={yearOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid-two-columns gap-4 mb-4">
            <TextInput
              label="Reason for Leaving"
              value={employer.reason_for_leaving}
              onChange={(e) =>
                handleEmployerChange(index, "reason_for_leaving", e.target.value)
              }
              required
            />
            <TextInput
              label="Contact Person"
              value={employer.contact_person}
              onChange={(e) =>
                handleEmployerChange(index, "contact_person", e.target.value)
              }
              required
            />
          </div>

          <TextInput
            label="Contact Number"
            value={employer.contact_number}
            onChange={(e) =>
              handleEmployerChange(index, "contact_number", e.target.value)
            }
            type="tel"
            required
          />
        </div>
      ))}

      {showAddEmployer ? (
        <div className="flex flex-wrap gap-3 mt-4">
          <button
            type="button"
            onClick={handleAddEmployer}
            className="btn btn-primary"
          >
            + Confirm Add Employer
          </button>
          <button
            type="button"
            onClick={() => setShowAddEmployer(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddEmployer(true)}
          className="mt-4 btn btn-outline"
        >
          + Add Employment Record
        </button>
      )}

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> Include senior and strategic roles with verifiable contact persons.
        </p>
      </div>
    </div>
  );
}
