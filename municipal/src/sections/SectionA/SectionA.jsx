import React, { useEffect, useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import SelectInput from "../../components/users/SelectInput/SelectInput";
import "./SectionA.css";
import Loader from "../../components/users/Loader";

export default function SectionA({ formData, handleChange, isJobPrepopulated }) {
  const [loadingJobData, setLoadingJobData] = useState(true);

  useEffect(() => {
    const loadJobData = async () => {
      if (isJobPrepopulated) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setLoadingJobData(false);
    };

    loadJobData();
  }, [isJobPrepopulated]);

  if (loadingJobData) {
    return <Loader message="Preparing form..." />;
  }

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
          name="position_title"
          value={formData.position_title}
          onChange={handleChange}
          required
          tooltip="Enter the exact job title as it appears in the advertisement"
          placeholder="e.g. Administrative Clerk"
          disabled={isJobPrepopulated}
        />

        <TextInput
          label="Reference Number"
          name="reference_number"
          value={formData.reference_number}
          onChange={handleChange}
          required
          tooltip="Enter the reference number for this position as mentioned in the job advertisement"
          placeholder="e.g. Ref No: DOH-01/2025"
          disabled={isJobPrepopulated}
        />

        <SelectInput
          label="Notice Service Period"
          name="notice_service_period"
          value={formData.notice_service_period}
          onChange={handleChange}
          options={[
            { label: "Immediately", value: "immediately" },
            { label: "7 Days", value: "7 days" },
            { label: "14 Days", value: "14 days" },
            { label: "1 Month", value: "1 month" },
            { label: "2 Months", value: "2 months" },
            { label: "3 Months", value: "3 months" },
          ]}
          tooltip="If currently employed, state the notice period required before you can start"
        />

        <TextInput
          label="Department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          tooltip="Enter the department you're applying to or currently belong to"
          placeholder="e.g. Human Resources, Finance, etc."
          disabled={isJobPrepopulated}
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
