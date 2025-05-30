import React , { useEffect, useState } from "react";
import TextInput from "../../../components/users/SeniorForm/TextInput/TextInput";
import "./SectionA.css";
import SelectInput from "../../../components/users/SeniorForm/SelectInput/SelectInput";
import Loader from "../../../components/users/Loader";

export default function SectionASenior({ formData, handleChange, isJobPrepopulated }) {
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
        <strong>Note:</strong> This form is used to assist the City of Polokwane in selecting
        suitable senior managers. All fields are compulsory and must be completed accurately and legibly.
        Incomplete applications will not be considered. Information provided will be treated with strict confidentiality.
      </div>

      <div className="section-fields">

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
