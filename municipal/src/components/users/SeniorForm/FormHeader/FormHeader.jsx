import React from "react";
import "./FormHeader.css";
import logo from "../../../../assets/Logo.jpg"; // adjust path as needed

export default function FormHeader() {
  return (
    <div className="form-header sticky-header">
      <img src={logo} alt="City of Polokwane Logo" className="municipal-logo" />

      <h1>
        CITY OF POLOKWANE APPLICATION FORM FOR EMPLOYMENT
      </h1>

      <p className="subtitle">
        (POLOKWANE LOCAL MUNICIPALITY IS AN EQUAL-OPPORTUNITY EMPLOYER)
      </p>

      <div className="notice-box">
        <p>
          <span className="font-bold">Note:</span> This form must be completed in 
          full, accurately and legibly. All substantial information relevant to a 
          candidate must be provided on this form.
        </p>
        <p>
          All information received will be treated with strict confidentiality and 
          will not be used for any other purpose other than to assess the suitability 
          of the applicant.
        </p>
      </div>
    </div>
  );
}
