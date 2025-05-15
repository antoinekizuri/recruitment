import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import "./SectionA.css";

export default function SectionA({ formData, handleChange }) {
  return (
    <div className="section-wrapper">
      <h2 className="section-title">A. DETAILS OF ADVERTISED POST</h2>

      <div className="section-note">
        <strong>Note:</strong> The purpose of this form is to assist the City of Polokwane in
        selecting suitable candidates for advertised posts. No applications will be
        accepted after the stipulated closing date. This form must be completed in full,
        accurately and legibly. All information received will be treated with strict
        confidentiality.
      </div>

      <div className="section-fields">
        <TextInput
          label="Advertised Post Being Applied For"
          name="advertised_post"
          value={formData.advertised_post}
          onChange={handleChange}
          required
          tooltip="Enter the exact job title as it appears in the advertisement"
        />

        <TextInput
          label="Reference Number"
          name="reference_number"
          value={formData.reference_number}
          onChange={handleChange}
          required
          tooltip="Enter the reference number for this position as mentioned in the job advertisement"
        />

        <TextInput
          label="Notice Service Period"
          name="notice_service_period"
          value={formData.notice_service_period}
          onChange={handleChange}
          tooltip="If currently employed, state the notice period required before you can start"
        />
      </div>

      <div className="section-tip">
        <p>
          <strong>Tip:</strong> Double-check your job details before proceeding to ensure correct matching.
        </p>
      </div>
    </div>
  );
}
