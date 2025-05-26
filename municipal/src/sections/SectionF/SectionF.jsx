import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import SelectInput from "../../components/users/SelectInput/SelectInput";

export default function SectionF({ formData, handleChange }) {
  const [showAddEmployer, setShowAddEmployer] = useState(false);

  const yesNoOptions = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

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
    const current = formData.previous_employers || [];
    const newEmployer = {
      employer_name: "", position: "", from_month: "", from_year: "",
      to_month: "", to_year: "", reason_for_leaving: ""
    };

    handleChange({
      target: {
        name: "previous_employers",
        value: [...current, newEmployer]
      }
    });

    setShowAddEmployer(false);
  };

  const handleRemoveEmployer = (index) => {
    const updated = [...formData.previous_employers];
    updated.splice(index, 1);
    handleChange({ target: { name: "previous_employers", value: updated } });
  };

  const handleEmployerChange = (index, field, value) => {
    const updated = [...(formData.previous_employers || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange({ target: { name: "previous_employers", value: updated } });
  };

  return (
    <div className="section-container">
      <h2 className="section-title">F. WORK EXPERIENCE</h2>

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
        <div className="grid-two-columns mb-6">
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
            name="employment_period"
            value={formData.employment_period}
            onChange={handleChange}
            placeholder="e.g., 2 years 3 months"
            required
            tooltip="How long you've been with your current employer"
          />
        </div>
      )}

      {formData.is_currently_employed === "yes" &&
        formData.current_employer_name?.toLowerCase() === "city of polokwane" && (
          <div className="grid-two-columns mb-6">
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
        )}

      <div className="mt-8 mb-6">
        <h3 className="subsection-heading">Previous Employment History</h3>

        {(formData.previous_employers || []).map((employer, index) => (
          <div
            key={index}
            className="mb-6 p-4 border border-gray-200 rounded-md shadow-sm"
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-gray-700 font-medium">
                Employer {index + 1}
              </h4>
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
                tooltip="The name of your previous employer"
              />
              <TextInput
                label="Position"
                value={employer.position}
                onChange={(e) =>
                  handleEmployerChange(index, "position", e.target.value)
                }
                tooltip="Your job title at this employer"
              />
            </div>

            <div className="grid-two-columns mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <SelectInput
                    label=""
                    value={employer.from_month}
                    onChange={(e) =>
                      handleEmployerChange(index, "from_month", e.target.value)
                    }
                    options={monthOptions}
                  />
                  <SelectInput
                    label=""
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
                    label=""
                    value={employer.to_month}
                    onChange={(e) =>
                      handleEmployerChange(index, "to_month", e.target.value)
                    }
                    options={monthOptions}
                  />
                  <SelectInput
                    label=""
                    value={employer.to_year}
                    onChange={(e) =>
                      handleEmployerChange(index, "to_year", e.target.value)
                    }
                    options={yearOptions}
                  />
                </div>
              </div>
            </div>

            <TextInput
              label="Reason for Leaving"
              value={employer.reason_for_leaving}
              onChange={(e) =>
                handleEmployerChange(index, "reason_for_leaving", e.target.value)
              }
              tooltip="Your reason for leaving this position"
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
            + Add Previous Employer
          </button>
        )}
      </div>

      <div className="mt-8 mb-6">
        <RadioGroup
          label="Have you ever been employed in local government and have any re-employment restrictions?"
          name="has_reemployment_restriction"
          value={formData.has_reemployment_restriction}
          onChange={handleChange}
          options={yesNoOptions}
          tooltip="If yes, please state the municipality"
        />
      </div>

      {formData.has_reemployment_restriction === "yes" && (
        <TextInput
          label="Name of Previous Municipality"
          name="previous_municipality_name"
          value={formData.previous_municipality_name}
          onChange={handleChange}
          required
          tooltip="The municipality that may have re-employment restrictions"
        />
      )}

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> The City of Polokwane reserves the right to verify
          all employment history and contact previous employers. Please ensure
          all information provided is accurate and complete.
        </p>
      </div>
    </div>
  );
}
