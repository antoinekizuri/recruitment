import React from "react";
import TextInput from "../../../components/users/TextInput/TextInput";
import "./SectionA.css";

export default function SectionASenior({ formData, handleChange }) {

  return (
    <div className="section-wrapper">
      <h2 className="section-title">A. DETAILS OF ADVERTISED POST</h2>

      <div className="section-note">
        <strong>Note:</strong> This form is used to assist the City of Polokwane in selecting
        suitable senior managers. All fields are compulsory and must be completed accurately and legibly.
        Incomplete applications will not be considered. Information provided will be treated with strict confidentiality.
      </div>

      <div className="section-fields">
        <TextInput
          label="Municipality/Entity"
          name="municipality_entity"
          value={formData.municipality_entity || ''}
          onChange={handleChange}
          required
          tooltip="Enter the name of the municipality or entity offering the position"

        />

        <TextInput
          label="Advertised Post Being Applied For"
          name="position_title"
          placeholder="e.g. Senior Manager: Human Resources"
          value={formData.position_title}
          onChange={handleChange}
          required
          tooltip="Enter the job title exactly as advertised"

        />

        <TextInput
          label="Reference Number"
          name="reference_number"
          value={formData.reference_number}
          onChange={handleChange}
          required
          tooltip="Enter the official reference number of the advertised post"

        />

        <TextInput
          label="Notice Period Required"
          name="notice_service_period"
          value={formData.notice_service_period}
          onChange={handleChange}
          tooltip="State your current employment notice period, if applicable"
        />
      </div>

      <div className="section-tip">
        <p>
          <strong>Reminder:</strong> Ensure the position title and reference number match the official advertisement.
        </p>
      </div>
    </div>
  );
}
