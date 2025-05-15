import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import SelectInput from "../../components/users/SelectInput/SelectInput";

export default function SectionF({ formData, handleChange }) {
  const [showAddEmployer, setShowAddEmployer] = useState(false);
  
  // Yes/No options
  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];
  
  // Generate month options
  const monthOptions = [
    { value: "", label: "Month" },
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" }
  ];
  
  // Generate year options (current year down to 40 years ago)
  const currentYear = new Date().getFullYear();
  const yearOptions = [
    { value: "", label: "Year" },
    ...Array.from({ length: 40 }, (_, i) => {
      const year = currentYear - i;
      return { value: year.toString(), label: year.toString() };
    })
  ];

  // Handler for adding a new employer
  const handleAddEmployer = () => {
    if (!formData.previous_employers) {
      handleChange({
        target: {
          name: "previous_employers",
          value: []
        }
      });
    }
    
    handleChange({
      target: {
        name: "previous_employers",
        value: [
          ...(formData.previous_employers || []),
          { 
            employer_name: "", 
            position: "", 
            from_month: "", 
            from_year: "",
            to_month: "",
            to_year: "",
            reason_for_leaving: "" 
          }
        ]
      }
    });
    
    setShowAddEmployer(false);
  };

  // Handler for removing an employer
  const handleRemoveEmployer = (index) => {
    const updatedEmployers = [...formData.previous_employers];
    updatedEmployers.splice(index, 1);
    
    handleChange({
      target: {
        name: "previous_employers",
        value: updatedEmployers
      }
    });
  };

  // Handler for updating a specific employer record
  const handleEmployerChange = (index, field, value) => {
    const updatedEmployers = [...(formData.previous_employers || [])];
    updatedEmployers[index] = {
      ...updatedEmployers[index],
      [field]: value
    };
    
    handleChange({
      target: {
        name: "previous_employers",
        value: updatedEmployers
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-blue-800 mb-6">
        F. WORK EXPERIENCE
      </h2>
      
      <div className="mb-6">
        <RadioGroup
          label="Are you currently employed?"
          name="is_currently_employed"
          value={formData.is_currently_employed}
          onChange={handleChange}
          options={yesNoOptions}
          required
          tooltip="Indicate whether you are currently employed"
        />
      </div>
      
      {formData.is_currently_employed === "yes" && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Current Employer Name"
              name="current_employer_name"
              value={formData.current_employer_name}
              onChange={handleChange}
              required
              tooltip="The name of your current employer"
            />
            
            <TextInput
              label="Period of Employment"
              name="current_employment_period"
              value={formData.current_employment_period}
              onChange={handleChange}
              placeholder="e.g., 2 years 3 months"
              required
              tooltip="How long you've been with your current employer"
            />
          </div>
        </div>
      )}
      
      {formData.is_currently_employed === "yes" && formData.current_employer_name?.toLowerCase() === "city of polokwane" && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextInput
              label="Current Designation"
              name="current_designation"
              value={formData.current_designation}
              onChange={handleChange}
              required
              tooltip="Your current job title within the City of Polokwane"
            />
            
            <TextInput
              label="Pay Number"
              name="pay_number"
              value={formData.pay_number}
              onChange={handleChange}
              required
              tooltip="Your employee pay number at the City of Polokwane"
            />
          </div>
        </div>
      )}
      
      <div className="mt-8 mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Previous Employment History</h3>
        
        {(formData.previous_employers || []).map((employer, index) => (
          <div key={index} className="mb-6 p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-medium text-gray-700">Employer {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveEmployer(index)}
                className="text-red-600 hover:text-red-800 text-sm font-medium"
              >
                Remove
              </button>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mb-4">
              <TextInput
                label="Employer Name"
                value={employer.employer_name}
                onChange={(e) => handleEmployerChange(index, "employer_name", e.target.value)}
                tooltip="The name of your previous employer"
              />
              
              <TextInput
                label="Position"
                value={employer.position}
                onChange={(e) => handleEmployerChange(index, "position", e.target.value)}
                tooltip="Your job title at this employer"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                  <div className="grid grid-cols-2 gap-2">
                    <SelectInput
                      label=""
                      value={employer.from_month}
                      onChange={(e) => handleEmployerChange(index, "from_month", e.target.value)}
                      options={monthOptions}
                      tooltip="The month when you started this position"
                    />
                    
                    <SelectInput
                      label=""
                      value={employer.from_year}
                      onChange={(e) => handleEmployerChange(index, "from_year", e.target.value)}
                      options={yearOptions}
                      tooltip="The year when you started this position"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <div className="grid grid-cols-2 gap-2">
                    <SelectInput
                      label=""
                      value={employer.to_month}
                      onChange={(e) => handleEmployerChange(index, "to_month", e.target.value)}
                      options={monthOptions}
                      tooltip="The month when you left this position"
                    />
                    
                    <SelectInput
                      label=""
                      value={employer.to_year}
                      onChange={(e) => handleEmployerChange(index, "to_year", e.target.value)}
                      options={yearOptions}
                      tooltip="The year when you left this position"
                    />
                  </div>
                </div>
              </div>
              
              <TextInput
                label="Reason for Leaving"
                value={employer.reason_for_leaving}
                onChange={(e) => handleEmployerChange(index, "reason_for_leaving", e.target.value)}
                tooltip="Your reason for leaving this position"
              />
            </div>
          </div>
        ))}
        
        {showAddEmployer ? (
          <div className="flex items-center space-x-2 mt-4">
            <button
              type="button"
              onClick={handleAddEmployer}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            >
              Confirm Add Employer
            </button>
            
            <button
              type="button"
              onClick={() => setShowAddEmployer(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setShowAddEmployer(true)}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Previous Employer
          </button>
        )}
      </div>
      
      <div className="mt-8 mb-6">
        <RadioGroup
          label="If you were previously employed in local government, indicate whether any condition exists that prevents your re-employment"
          name="has_reemployment_restriction"
          value={formData.has_reemployment_restriction}
          onChange={handleChange}
          options={yesNoOptions}
          tooltip="Indicate if there are any conditions that would prevent you from being re-employed in local government"
        />
      </div>
      
      {formData.has_reemployment_restriction === "yes" && (
        <div className="mb-6">
          <TextInput
            label="Name of Previous Municipality"
            name="previous_municipality_name"
            value={formData.previous_municipality_name}
            onChange={handleChange}
            required
            tooltip="The name of the municipality where you were previously employed"
          />
        </div>
      )}
      
      <div className="mt-6 p-4 bg-blue-50 rounded-md">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> The City of Polokwane reserves the right to verify 
          all employment history and contact previous employers. Please ensure all information provided 
          is accurate and complete.
        </p>
      </div>
    </div>
  );
}