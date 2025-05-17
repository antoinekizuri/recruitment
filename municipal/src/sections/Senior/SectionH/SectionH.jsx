// import React from "react";
// import TextInput from "../../../components/users/TextInput/TextInput";

// export default function SectionH_Senior({ formData, handleChange }) {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
//       <h2 className="text-xl font-bold text-blue-800 mb-6">
//         H. REFERENCES
//       </h2>

//       <p className="text-sm text-gray-700 mb-4">
//         Please provide the names and contact details of at least three recent referees.
//         Referees must not be relatives or friends and must be individuals you've reported to.
//       </p>

//       {(formData.references || []).map((ref, index) => (
//         <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm">
//           <h4 className="text-sm font-semibold text-gray-700 mb-2">Reference {index + 1}</h4>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <TextInput
//               label="Full Name"
//               name={`ref_name_${index}`}
//               value={ref.name}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "references",
//                     value: formData.references.map((r, i) =>
//                       i === index ? { ...r, name: e.target.value } : r
//                     )
//                   }
//                 })
//               }
//               required
//             />
//             <TextInput
//               label="Relationship"
//               name={`ref_relationship_${index}`}
//               value={ref.relationship}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "references",
//                     value: formData.references.map((r, i) =>
//                       i === index ? { ...r, relationship: e.target.value } : r
//                     )
//                   }
//                 })
//               }
//               required
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <TextInput
//               label="Cell Number"
//               name={`ref_cell_${index}`}
//               value={ref.cell}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "references",
//                     value: formData.references.map((r, i) =>
//                       i === index ? { ...r, cell: e.target.value } : r
//                     )
//                   }
//                 })
//               }
//               type="tel"
//               required
//             />
//             <TextInput
//               label="Email Address"
//               name={`ref_email_${index}`}
//               value={ref.email}
//               onChange={(e) =>
//                 handleChange({
//                   target: {
//                     name: "references",
//                     value: formData.references.map((r, i) =>
//                       i === index ? { ...r, email: e.target.value } : r
//                     )
//                   }
//                 })
//               }
//               type="email"
//               required
//             />
//           </div>
//         </div>
//       ))}

//       {(!formData.references || formData.references.length < 3) && (
//         <p className="text-sm text-yellow-700 mt-4">
//           <strong>Note:</strong> You must provide at least three referees.
//         </p>
//       )}
//     </div>
//   );
// }
import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";

export default function SectionHSenior({ formData, handleChange }) {
  const updateRef = (index, field, value) => {
    const updated = [...(formData.references || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange({ target: { name: "references", value: updated } });
  };

  const ensureThreeRefs = () => {
    if (!formData.references || formData.references.length < 3) {
      const filled = formData.references || [];
      const blanks = Array.from({ length: 3 - filled.length }, () => ({
        name: "", relationship: "", cell: "", email: ""
      }));
      handleChange({
        target: {
          name: "references",
          value: [...filled, ...blanks]
        }
      });
    }
  };

  React.useEffect(() => {
    ensureThreeRefs();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">H. REFERENCES</h2>

      <p className="mb-6 text-sm text-gray-700">
        Please list three contactable references from your recent employment history who are not relatives or friends. These individuals should have supervised your work or be familiar with your performance.
      </p>

      {formData.references.map((ref, index) => (
        <div key={index} className="mb-6 p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
          <h4 className="text-base font-semibold text-gray-700 mb-4">Reference {index + 1}</h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextInput
              label="Full Name"
              value={ref.name}
              onChange={(e) => updateRef(index, "name", e.target.value)}
              required
              tooltip="Full name of the referee"
            />
            <TextInput
              label="Relationship"
              value={ref.relationship}
              onChange={(e) => updateRef(index, "relationship", e.target.value)}
              required
              tooltip="Relationship (e.g., Supervisor, Manager)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Cell Number"
              value={ref.cell}
              onChange={(e) => updateRef(index, "cell", e.target.value)}
              type="tel"
              required
              tooltip="Mobile number of the referee"
            />
            <TextInput
              label="Email Address"
              value={ref.email}
              onChange={(e) => updateRef(index, "email", e.target.value)}
              type="email"
              required
              tooltip="Email address of the referee"
            />
          </div>
        </div>
      ))}

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> The City of Polokwane reserves the right to contact any reference listed. Ensure all referees have consented to be contacted and that their details are up to date.
        </p>
      </div>
    </div>
  );
}
