import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";
import RadioGroup from "../../../components/users/RadioGroup/RadioGroup";
import DateInput from "../../../components/users/DateInput/DateInput";
import SelectInput from "../../../components/users/SelectInput/SelectInput";
export default function SectionBSenior({ formData, handleChange }) {
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
        <div className="grid-two-columns">
          <RadioGroup
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            options={genderOptions}
            inline
            required
          />

          <RadioGroup
            label="Race"
            name="race"
            value={formData.race}
            onChange={handleChange}
            options={raceOptions}
            inline
            required
          />
        </div>
      </div>

      <div className="my-6">
        <RadioGroup
          label="Are you a South African citizen?"
          name="is_south_african"
          value={formData.is_south_african ? "true" : "false"}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
          required
        />

        {!formData.is_south_african && (
          <div className="grid-two-columns mt-4">
            <SelectInput
              label="If No, what is your nationality?"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              required
              options={[
                { label: "South Africa", value: "South Africa" },
                { label: "Nigeria", value: "Nigeria" },
                { label: "Kenya", value: "Kenya" },
                { label: "Ghana", value: "Ghana" },
                { label: "United States", value: "United States" },
                { label: "United Kingdom", value: "United Kingdom" },
                { label: "India", value: "India" },
                { label: "China", value: "China" },
                { label: "Zimbabwe", value: "Zimbabwe" },
                { label: "Namibia", value: "Namibia" },
                // You can expand this list or load dynamically
              ]}
              tooltip="Select your nationality if you're not a South African citizen"
            />

            <TextInput
              label="Work Permit Number (if applicable)"
              name="work_permit_number"
              value={formData.work_permit_number}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="my-6">
        <RadioGroup
          label="Do you have a disability?"
          name="has_disability"
          value={formData.has_disability ? "true" : "false"}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
          required
        />

        {formData.has_disability && (
          <TextInput
            label="If yes, please specify"
            name="disability_details"
            value={formData.disability_details}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="my-6">
        <RadioGroup
          label="Do you have a criminal record?"
          name="has_criminal_record"
          value={formData.has_criminal_record ? "true" : "false"}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
          required
        />

        {formData.has_criminal_record && (
          <TextInput
            label="If yes, please provide details"
            name="criminal_record_details"
            value={formData.criminal_record_details}
            onChange={handleChange}
          />
        )}
      </div>

      <div className="my-6">
        <RadioGroup
          label="Are you registered with any professional body?"
          name="has_professional_membership"
          value={formData.has_professional_membership ? "true" : "false"}
          onChange={handleYesNoChange}
          options={yesNoOptions}
          inline
        />

        {formData.has_professional_membership && (
          <div className="grid-three-columns mt-4">
            <TextInput
              label="Professional Body"
              name="professional_body"
              value={formData.professional_body}
              onChange={handleChange}
              required
            />
            <TextInput
              label="Membership Number"
              name="membership_number"
              value={formData.membership_number}
              onChange={handleChange}
              required
            />
            <DateInput
              label="Expiry Date"
              name="expiry_date"
              value={formData.expiry_date}
              onChange={handleChange}
              required
            />
          </div>
        )}
      </div>

      <div className="section-note mt-6">
        <p className="text-sm text-blue-800">
          <span className="font-bold">Note:</span> Please ensure all personal and compliance information is complete and truthful. Falsification may lead to disqualification.
        </p>
      </div>
    </div>
  );
}
