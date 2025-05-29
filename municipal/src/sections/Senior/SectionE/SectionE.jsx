import React, { useState } from "react";
import TextInput from "../../../components/users/SeniorForm/TextInput/TextInput";
import SelectInput from "../../../components/users/SeniorForm/SelectInput/SelectInput";

export default function SectionESenior({ formData, handleChange, errors = {} }) {
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

  const yesNoOptions = [
    { value: "", label: "Select" },
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
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

  // Helper function to get error for a specific field
  const getFieldError = (index, field) => {
    return errors[`senior_employment_history[${index}].${field}`];
  };

  // Helper function to get date range error
  const getDateError = (index, dateType) => {
    return errors[`senior_employment_history[${index}].${dateType}`];
  };

  return (
    <div className="section-container">
      <h2 className="section-title">E. EMPLOYMENT RECORD</h2>

      <p className="text-sm text-gray-600 mb-6">
        Please provide details about your current and previous employment history.
      </p>

      {/* Current Employment Status */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-4">Current Employment Status</h3>
        
        <SelectInput
          label="Are you currently employed?"
          name="is_currently_employed"
          value={formData.is_currently_employed}
          onChange={handleChange}
          options={yesNoOptions}
          required
          error={errors.is_currently_employed}
        />

        {formData.is_currently_employed === 'yes' && (
          <>
            <div className="grid-two-columns gap-4 mt-4">
              <TextInput
                label="Current Employer Name"
                name="current_employer_name"
                value={formData.current_employer_name}
                onChange={handleChange}
                required
                error={errors.current_employer_name}
              />
              
              <TextInput
                label="Employment Period"
                name="current_employment_period"
                value={formData.current_employment_period}
                onChange={handleChange}
                required
                placeholder="e.g., Jan 2020 - Present"
                error={errors.current_employment_period}
                tooltip="Indicate the period you have been with your current employer"
              />
            </div>

            {/* Show additional fields if current employer is City of Polokwane */}
            {formData.current_employer_name?.toLowerCase().trim() === 'city of polokwane' && (
              <div className="grid-two-columns gap-4 mt-4">
                <TextInput
                  label="Current Designation"
                  name="current_designation"
                  value={formData.current_designation}
                  onChange={handleChange}
                  required
                  error={errors.current_designation}
                />
                
                <TextInput
                  label="Pay Number"
                  name="pay_number"
                  value={formData.pay_number}
                  onChange={handleChange}
                  required
                  error={errors.pay_number}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* Re-employment Restriction */}
      <div className="mb-6 p-4 bg-gray-50 rounded-md">
        <h3 className="text-lg font-medium mb-4">Re-employment Restriction</h3>
        
        <SelectInput
          label="Do you have any re-employment restrictions from a previous municipality?"
          name="has_reemployment_restriction"
          value={formData.has_reemployment_restriction}
          onChange={handleChange}
          options={yesNoOptions}
          required
          error={errors.has_reemployment_restriction}
          tooltip="Indicate if you have been restricted from re-employment by any municipality"
        />

        {formData.has_reemployment_restriction === 'yes' && (
          <TextInput
            label="Previous Municipality Name"
            name="previous_municipality_name"
            value={formData.previous_municipality_name}
            onChange={handleChange}
            required
            error={errors.previous_municipality_name}
            className="mt-4"
          />
        )}
      </div>

      {/* Employment History */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Senior Employment History</h3>
        <p className="text-sm text-gray-600 mb-4">
          Please list your senior management employment record, starting with the most recent.
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
                className="btn btn-danger"
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
                error={getFieldError(index, "employer_name")}
              />
              <TextInput
                label="Position Held"
                value={employer.position_held}
                onChange={(e) =>
                  handleEmployerChange(index, "position_held", e.target.value)
                }
                required
                error={getFieldError(index, "position_held")}
              />
            </div>

            <div className="grid-two-columns mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <SelectInput
                    value={employer.from_month}
                    onChange={(e) =>
                      handleEmployerChange(index, "from_month", e.target.value)
                    }
                    options={monthOptions}
                    error={getDateError(index, "from")}
                  />
                  <SelectInput
                    value={employer.from_year}
                    onChange={(e) =>
                      handleEmployerChange(index, "from_year", e.target.value)
                    }
                    options={yearOptions}
                    error={getDateError(index, "from")}
                  />
                </div>
                {getDateError(index, "from") && (
                  <p className="text-red-500 text-xs mt-1">
                    {getDateError(index, "from")}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  To *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <SelectInput
                    value={employer.to_month}
                    onChange={(e) =>
                      handleEmployerChange(index, "to_month", e.target.value)
                    }
                    options={monthOptions}
                    error={getDateError(index, "to")}
                  />
                  <SelectInput
                    value={employer.to_year}
                    onChange={(e) =>
                      handleEmployerChange(index, "to_year", e.target.value)
                    }
                    options={yearOptions}
                    error={getDateError(index, "to")}
                  />
                </div>
                {getDateError(index, "to") && (
                  <p className="text-red-500 text-xs mt-1">
                    {getDateError(index, "to")}
                  </p>
                )}
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
                error={getFieldError(index, "reason_for_leaving")}
              />
              <TextInput
                label="Contact Person"
                value={employer.contact_person}
                onChange={(e) =>
                  handleEmployerChange(index, "contact_person", e.target.value)
                }
                required
                error={getFieldError(index, "contact_person")}
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
              error={getFieldError(index, "contact_number")}
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
      </div>

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> Include senior and strategic roles with verifiable contact persons. All employment information will be verified.
        </p>
      </div>
    </div>
  );
}