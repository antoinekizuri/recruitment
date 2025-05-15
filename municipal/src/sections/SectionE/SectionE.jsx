import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import SelectInput from "../../components/users/SelectInput/SelectInput";

export default function SectionE({ formData, handleChange }) {
  const [showAddQualification, setShowAddQualification] = useState(false);
  
  // NQF level options
  const nqfLevelOptions = [
    { value: "", label: "Select NQF Level" },
    { value: "1", label: "NQF Level 1" },
    { value: "2", label: "NQF Level 2" },
    { value: "3", label: "NQF Level 3" },
    { value: "4", label: "NQF Level 4 (Matric/Grade 12)" },
    { value: "5", label: "NQF Level 5 (Higher Certificate)" },
    { value: "6", label: "NQF Level 6 (Diploma/Advanced Certificate)" },
    { value: "7", label: "NQF Level 7 (Bachelor's Degree/Advanced Diploma)" },
    { value: "8", label: "NQF Level 8 (Honours Degree/Postgraduate Diploma)" },
    { value: "9", label: "NQF Level 9 (Master's Degree)" },
    { value: "10", label: "NQF Level 10 (Doctoral Degree)" }
  ];

  // Year options (from current year back to 1960)
  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Select Year" },
    ...Array.from({ length: currentYear - 1959 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  // Handler for adding a new qualification
  const handleAddQualification = () => {
    if (!formData.qualifications) {
      handleChange({
        target: {
          name: "qualifications",
          value: []
        }
      });
    }
    
    handleChange({
      target: {
        name: "qualifications",
        value: [
          ...(formData.qualifications || []),
          { 
            qualification: "", 
            institution: "", 
            nqf_level: "", 
            year_obtained: "" 
          }
        ]
      }
    });
    
    setShowAddQualification(false);
  };

  // Handler for removing a qualification
  const handleRemoveQualification = (index) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications.splice(index, 1);
    
    handleChange({
      target: {
        name: "qualifications",
        value: updatedQualifications
      }
    });
  };

  // Handler for updating a specific qualification
  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...(formData.qualifications || [])];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [field]: value
    };
    
    handleChange({
      target: {
        name: "qualifications",
        value: updatedQualifications
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        E. QUALIFICATIONS
      </h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Highest School Qualification</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <SelectInput
            label="Highest Grade Completed"
            name="highest_school_grade"
            value={formData.highest_school_grade}
            onChange={handleChange}
            required
            options={[
              { value: "", label: "Select Grade" },
              { value: "Grade 7", label: "Grade 7" },
              { value: "Grade 8", label: "Grade 8" },
              { value: "Grade 9", label: "Grade 9" },
              { value: "Grade 10", label: "Grade 10" },
              { value: "Grade 11", label: "Grade 11" },
              { value: "Grade 12", label: "Grade 12/Matric" }
            ]}
            tooltip="Your highest completed school grade"
          />
          
          <TextInput
            label="Name of School"
            name="school_name"
            value={formData.school_name}
            onChange={handleChange}
            required
            tooltip="The name of the school where you obtained your highest school qualification"
          />
        </div>
        
        <div className="mb-4">
          <SelectInput
            label="Year Completed"
            name="school_year_completed"
            value={formData.school_year_completed}
            onChange={handleChange}
            required
            options={yearOptions}
            tooltip="The year in which you completed your highest school qualification"
          />
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Tertiary/Technical Qualifications</h3>
        
        {(formData.qualifications || []).map((qualification, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Qualification {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveQualification(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-4">
              <TextInput
                label="Qualification Name"
                value={qualification.qualification}
                onChange={(e) => handleQualificationChange(index, "qualification", e.target.value)}
                tooltip="The name/title of your qualification"
              />
              
              <TextInput
                label="Institution Name"
                value={qualification.institution}
                onChange={(e) => handleQualificationChange(index, "institution", e.target.value)}
                tooltip="The name of the institution where you obtained this qualification"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SelectInput
                  label="NQF Level"
                  value={qualification.nqf_level}
                  onChange={(e) => handleQualificationChange(index, "nqf_level", e.target.value)}
                  options={nqfLevelOptions}
                  tooltip="The National Qualifications Framework level of your qualification"
                />
                
                <SelectInput
                  label="Year Obtained"
                  value={qualification.year_obtained}
                  onChange={(e) => handleQualificationChange(index, "year_obtained", e.target.value)}
                  options={yearOptions}
                  tooltip="The year in which you obtained this qualification"
                />
              </div>
            </div>
          </div>
        ))}
        
        {showAddQualification ? (
          <div className="flex items-center space-x-2 mt-4">
            <button
              type="button"
              onClick={handleAddQualification}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Confirm Add Qualification
            </button>
            
            <button
              type="button"
              onClick={() => setShowAddQualification(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddQualification(true)}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Qualification
          </button>
        )}
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> You may be required to provide certified copies 
          of all qualifications listed. The City of Polokwane reserves the right to verify all 
          qualifications with the relevant institutions.
        </p>
      </div>
    </div>
  );
}