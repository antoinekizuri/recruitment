import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import RadioGroup from "../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../components/users/DateInput/DateInput";

export default function SectionB({ formData, handleChange }) {
  // Define race options
  const raceOptions = [
    { value: "African", label: "African" },
    { value: "Coloured", label: "Coloured" },
    { value: "Indian", label: "Indian" },
    { value: "White", label: "White" }
  ];

  // Define gender options
  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" }
  ];

  // Define yes/no options for radio buttons
  const yesNoOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" }
  ];

  // Handle yes/no radio changes
  const handleYesNoChange = (e) => {
    const { name, value } = e.target;
    handleChange({
      target: {
        name,
        value: value === "true",
        type: "radio"
      }
    });
  };

  return (
    <div className="section-container">
      <h2 className="section-title">
        B. PERSONAL DETAILS
      </h2>
      
      <div className="grid-two-columns">
        <TextInput
          label="Surname"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          required
          tooltip="Your family name as it appears on your ID document"
        />
        
        <TextInput
          label="First Name(s)"
          name="first_names"
          value={formData.first_names}
          onChange={handleChange}
          required
          tooltip="Your given name(s) as they appear on your ID document"
        />
        
        <TextInput
          label="ID or Passport Number"
          name="id_number"
          value={formData.id_number}
          onChange={handleChange}
          required
          tooltip="Enter your 13-digit South African ID number or passport number for non-SA citizens"
        />
      </div>
      
      <div className="my-6">
        <h3 className="subsection-heading">Demographics</h3>
        
        <div className="grid-two-columns">
          <div className="radio-group-wrapper">
            <RadioGroup
              label="Race"
              name="race"
              value={formData.race}
              onChange={handleChange}
              options={raceOptions}
              inline
              required
              tooltip="This information is required for employment equity purposes"
            />
          </div>
          
          <div className="radio-group-wrapper">
            <RadioGroup
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              options={genderOptions}
              inline
              required
              tooltip="This information is required for employment equity purposes"
            />
          </div>
        </div>
      </div>
      
      <div className="my-6">
        <div className="radio-group-wrapper mb-4">
          <RadioGroup
            label="Do you have a disability?"
            name="has_disability"
            value={formData.has_disability ? "true" : "false"}
            onChange={handleYesNoChange}
            options={yesNoOptions}
            inline
            required
            tooltip="This information is required for employment equity purposes"
          />
        </div>
        
        {formData.has_disability && (
          <TextInput
            label="If yes, please elaborate"
            name="disability_details"
            value={formData.disability_details}
            onChange={handleChange}
            tooltip="Provide details of your disability. This information helps us ensure appropriate accommodation if needed."
          />
        )}
      </div>
      
      <div className="my-6">
        <div className="radio-group-wrapper mb-4">
          <RadioGroup
            label="Are you a South African citizen?"
            name="is_south_african"
            value={formData.is_south_african ? "true" : "false"}
            onChange={handleYesNoChange}
            options={yesNoOptions}
            inline
            required
            tooltip="Indicate if you are a South African citizen"
          />
        </div>
        
        {!formData.is_south_african && (
          <div className="grid-two-columns">
            <TextInput
              label="If no, what is your nationality?"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required={!formData.is_south_african}
              tooltip="State your country of citizenship"
            />
            
            <TextInput
              label="Work Permit Number (if any)"
              name="work_permit_number"
              value={formData.work_permit_number}
              onChange={handleChange}
              tooltip="Enter your valid work permit number if applicable"
            />
          </div>
        )}
      </div>
      
      <div className="my-6">
        <div className="radio-group-wrapper mb-4">
          <RadioGroup
            label="Do you hold a professional membership with any professional body?"
            name="has_professional_membership"
            value={formData.has_professional_membership ? "true" : "false"}
            onChange={handleYesNoChange}
            options={yesNoOptions}
            inline
            tooltip="Indicate if you are registered with any professional organization relevant to the position"
          />
        </div>
        
        {formData.has_professional_membership && (
          <div className="grid-three-columns">
            <TextInput
              label="Professional Body"
              name="professional_body"
              value={formData.professional_body}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="Name of the professional organization"
            />
            
            <TextInput
              label="Membership Number"
              name="membership_number"
              value={formData.membership_number}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="Your registration or membership number"
            />
            
            <DateInput
              label="Expiry Date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="When does your professional membership expire?"
            />
          </div>
        )}
      </div>
      
      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Why this matters:</span> The personal information provided here 
          helps the City of Polokwane comply with employment equity legislation and ensure that your 
          application is properly processed. All information is kept confidential.
        </p>
      </div>
    </div>
  );
}
