import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";
import "./SectionC.css";

export default function SectionCSenior({ formData, handleChange }) {
  return (
    <div className="section-c">
      <h2 className="section-c-title">C. CONTACT DETAILS</h2>

      <div className="section-c-grid mb-6">
        <TextInput
          label="Cell Phone Number"
          name="cell_phone"
          value={formData.cell_phone}
          onChange={handleChange}
          required
          tooltip="Primary mobile number for urgent contact"
          type="tel"
        />

        <TextInput
          label="Alternative Number"
          name="alternative_number"
          value={formData.alternative_number}
          onChange={handleChange}
          tooltip="A secondary contact number, such as landline or assistant"
          type="tel"
        />
      </div>

      <div className="mb-6">
        <TextInput
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          tooltip="Provide a professional email address checked regularly"
          type="email"
        />
      </div>

      <div className="mb-6">
        <TextInput
          label="Residential Address"
          name="residential_address"
          value={formData.residential_address}
          onChange={handleChange}
          required
          tooltip="Your current home address"
        />
      </div>

      <div className="mb-6">
        <TextInput
          label="Postal Address (if different)"
          name="postal_address"
          value={formData.postal_address}
          onChange={handleChange}
          tooltip="Where official documents should be sent"
        />
      </div>

      <div className="section-c-note">
        <p>
          <span className="font-bold">Important:</span> Please ensure all contact information is current and monitored regularly.
          The municipality may contact you at short notice for assessments or interviews.
        </p>
      </div>
    </div>
  );
}
