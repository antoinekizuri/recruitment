import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";

export default function SectionI({ formData, handleChange }) {
  const [showAddReference, setShowAddReference] = useState(false);
  
  // Handler for adding a new reference
  const handleAddReference = () => {
    if (!formData.references) {
      handleChange({
        target: {
          name: "references",
          value: []
        }
      });
    }
    
    handleChange({
      target: {
        name: "references",
        value: [
          ...(formData.references || []),
          { 
            name: "", 
            relationship: "", 
            telephone: "",
            cell_phone: "",
            email: "" 
          }
        ]
      }
    });
    
    setShowAddReference(false);
  };

  // Handler for removing a reference
  const handleRemoveReference = (index) => {
    const updatedReferences = [...formData.references];
    updatedReferences.splice(index, 1);
    
    handleChange({
      target: {
        name: "references",
        value: updatedReferences
      }
    });
  };

  // Handler for updating a specific reference
  const handleReferenceChange = (index, field, value) => {
    const updatedReferences = [...(formData.references || [])];
    updatedReferences[index] = {
      ...updatedReferences[index],
      [field]: value
    };
    
    handleChange({
      target: {
        name: "references",
        value: updatedReferences
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        I. REFERENCES
      </h2>
      
      <p className="mb-4 text-gray-700">
        Please provide at least three professional references who can attest to your work performance and character.
        It is preferable to include current or previous supervisors or managers.
      </p>
      
      {(formData.references || []).map((reference, index) => (
        <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-700">Reference {index + 1}</h4>
            <button
              type="button"
              onClick={() => handleRemoveReference(index)}
              className="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              Remove
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextInput
              label="Full Name"
              value={reference.name}
              onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
              required={index < 3} // First three references are required
              tooltip="Full name of your reference"
            />
            
            <TextInput
              label="Relationship"
              value={reference.relationship}
              onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
              required={index < 3}
              tooltip="Your professional relationship with this reference (e.g., Manager, Supervisor, Colleague)"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <TextInput
              label="Telephone Number (Office Hours)"
              value={reference.telephone}
              onChange={(e) => handleReferenceChange(index, "telephone", e.target.value)}
              type="tel"
              required={index < 3}
              tooltip="Office telephone number where this reference can be reached during business hours"
            />
            
            <TextInput
              label="Cell Phone Number"
              value={reference.cell_phone}
              onChange={(e) => handleReferenceChange(index, "cell_phone", e.target.value)}
              type="tel"
              tooltip="Mobile number of your reference"
            />
          </div>
          
          <div className="mb-4">
            <TextInput
              label="Email Address"
              value={reference.email}
              onChange={(e) => handleReferenceChange(index, "email", e.target.value)}
              type="email"
              required={index < 3}
              tooltip="Email address of your reference"
            />
          </div>
        </div>
      ))}
      
      {showAddReference ? (
        <div className="flex items-center space-x-2 mt-4">
          <button
            type="button"
            onClick={handleAddReference}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Confirm Add Reference
          </button>
          
          <button
            type="button"
            onClick={() => setShowAddReference(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddReference(true)}
          className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          Add Reference
        </button>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> References may be contacted as part of the 
          selection process. Please ensure that you have obtained permission from your references 
          before including their details. Providing inaccurate reference information may affect 
          your application.
        </p>
      </div>
      
      {(formData.references || []).length === 0 && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <span className="font-bold">Important:</span> You must provide at least three professional 
            references. Please click "Add Reference" to begin adding references.
          </p>
        </div>
      )}
    </div>
  );
}