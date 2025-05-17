// import React from "react";
// import RadioGroup from "../../../components/users/RadioGroup/RadioGroup";
// import TextInput from "../../../components/users/TextInput/TextInput";

// export default function SectionG_Senior({ formData, handleChange }) {
//   const yesNoOptions = [
//     { value: "yes", label: "Yes" },
//     { value: "no", label: "No" }
//   ];

//   return (
//     <div className="pt-4 pb-10 mb-10 border-b border-gray-200">
//       <h2 className="text-xl font-bold text-blue-900 mb-6">
//         G. CRIMINAL / DISCIPLINARY RECORD
//       </h2>

//       {/* Main Yes/No */}
//       <div className="mb-6">
//         <RadioGroup
//           label="Have you ever been convicted of a criminal offence, been dismissed, or faced disciplinary action in any employment?"
//           name="has_criminal_or_disciplinary_record"
//           value={formData.has_criminal_or_disciplinary_record}
//           onChange={handleChange}
//           options={yesNoOptions}
//           required
//           tooltip="Indicate if you have ever been criminally convicted or disciplined in a prior role"
//         />
//       </div>

//       {/* Details if Yes */}
//       {formData.has_criminal_or_disciplinary_record === "yes" && (
//         <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
//           <h3 className="text-sm font-semibold text-gray-700 mb-3">
//             Please provide full details of any convictions, disciplinary actions, or dismissals:
//           </h3>
//           <textarea
//             name="criminal_or_disciplinary_details"
//             value={formData.criminal_or_disciplinary_details}
//             onChange={handleChange}
//             rows={5}
//             required
//             placeholder="Include details such as the offence or misconduct, date, outcome, and institution involved."
//             className="w-full min-h-[140px] resize-y border border-gray-300 rounded-lg bg-white px-4 py-3 text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all duration-200"
//           />
//         </div>
//       )}

//       {/* Final Note */}
//       <div className="section-note mt-6">
//         <p className="text-sm text-blue-800">
//           <span className="font-bold">Declaration:</span> False or omitted information may lead to disqualification
//           or immediate termination. Your background will be subject to verification.
//         </p>
//       </div>
//     </div>
//   );
// }
import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";

export default function SectionHSenior({ formData, handleChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        G. REFERENCES
      </h2>

      <p className="text-sm text-gray-700 mb-4">
        Please provide the names and contact details of at least three recent referees.
        Referees must not be relatives or friends and must be individuals you've reported to.
      </p>

      {(formData.references || []).map((ref, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Reference {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextInput
              label="Full Name"
              name={`ref_name_${index}`}
              value={ref.name}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "references",
                    value: formData.references.map((r, i) =>
                      i === index ? { ...r, name: e.target.value } : r
                    )
                  }
                })
              }
              required
            />
            <TextInput
              label="Relationship"
              name={`ref_relationship_${index}`}
              value={ref.relationship}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "references",
                    value: formData.references.map((r, i) =>
                      i === index ? { ...r, relationship: e.target.value } : r
                    )
                  }
                })
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Cell Number"
              name={`ref_cell_${index}`}
              value={ref.cell}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "references",
                    value: formData.references.map((r, i) =>
                      i === index ? { ...r, cell: e.target.value } : r
                    )
                  }
                })
              }
              type="tel"
              required
            />
            <TextInput
              label="Email Address"
              name={`ref_email_${index}`}
              value={ref.email}
              onChange={(e) =>
                handleChange({
                  target: {
                    name: "references",
                    value: formData.references.map((r, i) =>
                      i === index ? { ...r, email: e.target.value } : r
                    )
                  }
                })
              }
              type="email"
              required
            />
          </div>
        </div>
      ))}

      {(!formData.references || formData.references.length < 3) && (
        <p className="text-sm text-yellow-700 mt-4">
          <strong>Note:</strong> You must provide at least three referees.
        </p>
      )}
    </div>
  );
}
