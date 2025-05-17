// import React, { useState } from "react";
// import TextInput from "../../../components/users/TextInput/TextInput";
// import SelectInput from "../../../components/users/SelectInput/SelectInput";

// export default function SectionFSenior({ formData, handleChange }) {
//   const [showAddEmployer, setShowAddEmployer] = useState(false);

//   const monthOptions = [
//     { value: "", label: "Month" },
//     ...[
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//     ].map((month, index) => ({
//       value: String(index + 1).padStart(2, "0"),
//       label: month
//     }))
//   ];

//   const currentYear = new Date().getFullYear();
//   const yearOptions = [
//     { value: "", label: "Year" },
//     ...Array.from({ length: 40 }, (_, i) => {
//       const year = currentYear - i;
//       return { value: year.toString(), label: year.toString() };
//     })
//   ];

//   const handleAddEmployer = () => {
//     const current = formData.senior_employment_history || [];
//     const newEmployer = {
//       employer_name: "",
//       position_held: "",
//       from_month: "",
//       from_year: "",
//       to_month: "",
//       to_year: "",
//       reason_for_leaving: "",
//       contact_person: "",
//       contact_number: ""
//     };

//     handleChange({
//       target: {
//         name: "senior_employment_history",
//         value: [...current, newEmployer]
//       }
//     });

//     setShowAddEmployer(false);
//   };

//   const handleRemoveEmployer = (index) => {
//     const updated = [...formData.senior_employment_history];
//     updated.splice(index, 1);
//     handleChange({ target: { name: "senior_employment_history", value: updated } });
//   };

//   const handleEmployerChange = (index, field, value) => {
//     const updated = [...(formData.senior_employment_history || [])];
//     updated[index] = { ...updated[index], [field]: value };
//     handleChange({ target: { name: "senior_employment_history", value: updated } });
//   };

//   return (
//     <div className="section-container">
//       <h2 className="section-title">F. EMPLOYMENT RECORD</h2>

//       <p className="text-sm text-gray-600 mb-4">
//         Please list your employment record, starting with the most recent. Include senior management roles relevant to this application.
//       </p>

//       {(formData.senior_employment_history || []).map((employer, index) => (
//         <div
//           key={index}
//           className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm"
//         >
//           <div className="flex justify-between items-center mb-3">
//             <h4 className="text-gray-700 font-medium">Employer {index + 1}</h4>
//             <button
//               type="button"
//               onClick={() => handleRemoveEmployer(index)}
//               className="text-sm font-medium text-red-600 hover:text-red-800"
//             >
//               Remove
//             </button>
//           </div>

//           <div className="grid-two-columns gap-4 mb-4">
//             <TextInput
//               label="Employer Name"
//               value={employer.employer_name}
//               onChange={(e) =>
//                 handleEmployerChange(index, "employer_name", e.target.value)
//               }
//               required
//             />
//             <TextInput
//               label="Position Held"
//               value={employer.position_held}
//               onChange={(e) =>
//                 handleEmployerChange(index, "position_held", e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="grid-two-columns mb-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 From
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 <SelectInput
//                   value={employer.from_month}
//                   onChange={(e) =>
//                     handleEmployerChange(index, "from_month", e.target.value)
//                   }
//                   options={monthOptions}
//                 />
//                 <SelectInput
//                   value={employer.from_year}
//                   onChange={(e) =>
//                     handleEmployerChange(index, "from_year", e.target.value)
//                   }
//                   options={yearOptions}
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 To
//               </label>
//               <div className="grid grid-cols-2 gap-2">
//                 <SelectInput
//                   value={employer.to_month}
//                   onChange={(e) =>
//                     handleEmployerChange(index, "to_month", e.target.value)
//                   }
//                   options={monthOptions}
//                 />
//                 <SelectInput
//                   value={employer.to_year}
//                   onChange={(e) =>
//                     handleEmployerChange(index, "to_year", e.target.value)
//                   }
//                   options={yearOptions}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="grid-two-columns gap-4 mb-4">
//             <TextInput
//               label="Reason for Leaving"
//               value={employer.reason_for_leaving}
//               onChange={(e) =>
//                 handleEmployerChange(index, "reason_for_leaving", e.target.value)
//               }
//               required
//             />
//             <TextInput
//               label="Contact Person"
//               value={employer.contact_person}
//               onChange={(e) =>
//                 handleEmployerChange(index, "contact_person", e.target.value)
//               }
//               required
//             />
//           </div>

//           <TextInput
//             label="Contact Number"
//             value={employer.contact_number}
//             onChange={(e) =>
//               handleEmployerChange(index, "contact_number", e.target.value)
//             }
//             type="tel"
//             required
//           />
//         </div>
//       ))}

//       {showAddEmployer ? (
//         <div className="flex flex-wrap gap-3 mt-4">
//           <button
//             type="button"
//             onClick={handleAddEmployer}
//             className="btn btn-primary"
//           >
//             + Confirm Add Employer
//           </button>
//           <button
//             type="button"
//             onClick={() => setShowAddEmployer(false)}
//             className="btn btn-secondary"
//           >
//             Cancel
//           </button>
//         </div>
//       ) : (
//         <button
//           type="button"
//           onClick={() => setShowAddEmployer(true)}
//           className="mt-4 btn btn-outline"
//         >
//           + Add Employment Record
//         </button>
//       )}

//       <div className="section-note mt-6">
//         <p className="text-sm text-blue-800">
//           <span className="font-bold">Note:</span> Include senior and strategic roles with verifiable contact persons.
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import RadioGroup from "../../../components/users/RadioGroup/RadioGroup";
import TextInput from "../../../components/users/TextInput/TextInput";

export default function SectionFSenior({ formData, handleChange }) {
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="pt-4 pb-10 mb-10 border-b border-gray-200">
      <h2 className="text-xl font-bold text-blue-900 mb-6">
        F. CRIMINAL / DISCIPLINARY RECORD
      </h2>

      {/* Main Yes/No */}
      <div className="mb-6">
        <RadioGroup
          label="Have you ever been convicted of a criminal offence, been dismissed, or faced disciplinary action in any employment?"
          name="has_criminal_or_disciplinary_record"
          value={formData.has_criminal_or_disciplinary_record}
          onChange={handleChange}
          options={yesNoOptions}
          required
          tooltip="Indicate if you have ever been criminally convicted or disciplined in a prior role"
        />
      </div>

      {/* Details if Yes */}
      {formData.has_criminal_or_disciplinary_record === "yes" && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Please provide full details of any convictions, disciplinary actions, or dismissals:
          </h3>
          <textarea
            name="criminal_or_disciplinary_details"
            value={formData.criminal_or_disciplinary_details}
            onChange={handleChange}
            rows={5}
            required
            placeholder="Include details such as the offence or misconduct, date, outcome, and institution involved."
            className="w-full min-h-[140px] resize-y border border-gray-300 rounded-lg bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
          />
        </div>
      )}

      {/* Final Note */}
      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Declaration:</span> False or omitted information may lead to disqualification
          or immediate termination. Your background will be subject to verification.
        </p>
      </div>
    </div>
  );
}
