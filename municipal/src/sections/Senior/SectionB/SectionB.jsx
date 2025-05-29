import React from "react";
import TextInput from "../../../components/users/SeniorForm/TextInput/TextInput";
import RadioGroup from "../../../components/users/SeniorForm/RadioGroup/RadioGroup";
import DateInput from "../../../components/users/SeniorForm/DateInput/DateInput";
import SelectInput from "../../../components/users/SeniorForm/SelectInput/SelectInput";

export default function SectionBSenior({ formData, handleChange, errors = {} }) {
  const yesNoOptions = [
    { value: "true", label: "Yes" },
    { value: "false", label: "No" }
  ];

  const raceOptions = [
    { value: "African", label: "African" },
    { value: "Coloured", label: "Coloured" },
    { value: "Indian", label: "Indian" },
    { value: "White", label: "White" }
  ];

  const genderOptions = [
    { value: "Female", label: "Female" },
    { value: "Male", label: "Male" }
  ];

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
      <h2 className="section-title">B. PERSONAL DETAILS</h2>

      <div className="grid-two-columns">
        <TextInput
          label="Surname"
          name="surname"
          value={formData.surname || ''}
          onChange={handleChange}
          required
          tooltip="Your family name as it appears on your ID document"
          error={errors.surname}
        />

        <TextInput
          label="First Name(s)"
          name="first_names"
          value={formData.first_names || ''}
          onChange={handleChange}
          required
          tooltip="Your given name(s) as they appear on your ID document"
          error={errors.first_names}
        />

        <TextInput
          label="ID or Passport Number"
          name="id_number"
          value={formData.id_number || ''}
          onChange={handleChange}
          required
          tooltip="Enter your 13-digit South African ID number or passport number for non-SA citizens"
          error={errors.id_number}
        />
      </div>

      <div className="my-6">
        <h3 className="subsection-heading">Demographics</h3>

        <div className="grid-two-columns">
          <div className="radio-group-wrapper">
            <RadioGroup
              label="Race"
              name="race"
              value={formData.race || ''}
              onChange={handleChange}
              options={raceOptions}
              inline
              required
              tooltip="This information is required for employment equity purposes"
              error={errors.race}
            />
          </div>
          
          <div className="radio-group-wrapper">
            <RadioGroup
              label="Gender"
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
              options={genderOptions}
              inline
              required
              tooltip="This information is required for employment equity purposes"
              error={errors.gender}
            />
          </div>
        </div>
      </div>

      <div className="my-6">
        <RadioGroup
          label="Are you a South African citizen?"
          name="is_south_african"
          value={formData.is_south_african !== undefined ? (formData.is_south_african ? "true" : "false") : ''}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
          required
          error={errors.is_south_african}
        />

        {formData.is_south_african === false && (
          <div className="grid-two-columns mt-4">
            <SelectInput
              label="If No, what is your nationality?"
              name="nationality"
              value={formData.nationality || ''}
              onChange={handleChange}
              required
              options={[
                { label: "Select nationality", value: "" },
                { label: "Nigeria", value: "Nigeria" },
                { label: "Kenya", value: "Kenya" },
                { label: "Ghana", value: "Ghana" },
                { label: "United States", value: "United States" },
                { label: "United Kingdom", value: "United Kingdom" },
                { label: "India", value: "India" },
                { label: "China", value: "China" },
                { label: "Zimbabwe", value: "Zimbabwe" },
                { label: "Namibia", value: "Namibia" },
                { label: "Botswana", value: "Botswana" },
                { label: "Lesotho", value: "Lesotho" },
                { label: "Swaziland", value: "Swaziland" },
                { label: "Other", value: "Other" }
              ]}
              tooltip="Select your nationality if you're not a South African citizen"
              error={errors.nationality}
            />

            <TextInput
              label="Work Permit Number (if applicable)"
              name="work_permit_number"
              value={formData.work_permit_number || ''}
              onChange={handleChange}
              error={errors.work_permit_number}
            />
          </div>
        )}
      </div>

      <div className="my-6">
        <RadioGroup
          label="Do you have a disability?"
          name="has_disability"
          value={formData.has_disability !== undefined ? (formData.has_disability ? "true" : "false") : ''}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
          required
          error={errors.has_disability}
        />

        {formData.has_disability === true && (
          <TextInput
            label="If yes, please specify"
            name="disability_details"
            value={formData.disability_details || ''}
            onChange={handleChange}
            required={formData.has_disability}
            error={errors.disability_details}
          />
        )}
      </div>

      <div className="my-6">
        <div className="radio-group-wrapper mb-4">
          <RadioGroup
            label="Do you hold any political office in a political party, whether in a permanent, temporary or acting capacity?"
            name="has_political_membership"
            value={formData.has_political_membership !== undefined ? (formData.has_political_membership ? "true" : "false") : ''}
            onChange={handleYesNoChange}
            options={yesNoOptions}
            inline
            required
            tooltip="Indicate if you are associated with any political organization"
            error={errors.has_political_membership}
          />
        </div>

        {formData.has_political_membership === true && (
          <div className="grid-three-columns">
            <TextInput
              label="Political Party"
              name="political_body"
              value={formData.political_body || ''}
              onChange={handleChange}
              required={formData.has_political_membership}
              tooltip="Name of the political organization"
              error={errors.political_body}
            />
            
            <TextInput
              label="Political Position in Party"
              name="political_party_position"
              value={formData.political_party_position || ''}
              onChange={handleChange}
              required={formData.has_political_membership}
              tooltip="Your Position in Party"
              error={errors.political_party_position}
            />
            
            <DateInput
              label="Expiry Date"
              name="political_party_expiry_date"
              value={formData.political_party_expiry_date || ''}
              onChange={handleChange}
              required={formData.has_political_membership}
              tooltip="When does your political membership expire?"
              error={errors.political_party_expiry_date}
            />
          </div>
        )}
      </div>

      <div className="my-6">
        <div className="radio-group-wrapper mb-4">
          <RadioGroup
            label="Do you hold a professional membership with any professional body?"
            name="has_professional_membership"
            value={formData.has_professional_membership !== undefined ? (formData.has_professional_membership ? "true" : "false") : ''}
            onChange={handleYesNoChange}
            options={yesNoOptions}
            inline
            required
            tooltip="Indicate if you are registered with any professional organization relevant to the position"
            error={errors.has_professional_membership}
          />
        </div>
        
        {formData.has_professional_membership === true && (
          <div className="grid-three-columns">
            <TextInput
              label="Professional Body"
              name="professional_body"
              value={formData.professional_body || ''}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="Name of the professional organization"
              error={errors.professional_body}
            />
            
            <TextInput
              label="Membership Number"
              name="membership_number"
              value={formData.membership_number || ''}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="Your registration or membership number"
              error={errors.membership_number}
            />
            
            <DateInput
              label="Expiry Date"
              name="expiry_date"
              value={formData.expiry_date || ''}
              onChange={handleChange}
              required={formData.has_professional_membership}
              tooltip="When does your professional membership expire?"
              error={errors.expiry_date}
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