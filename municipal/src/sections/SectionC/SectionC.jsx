import React from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import SelectInput from "../../components/users/SelectInput/SelectInput";
import "./SectionC.css";

export default function SectionC({ formData, handleChange }) {
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Afrikaans", label: "Afrikaans" },
    { value: "isiZulu", label: "isiZulu" },
    { value: "isiXhosa", label: "isiXhosa" },
    { value: "Sepedi", label: "Sepedi" },
    { value: "Setswana", label: "Setswana" },
    { value: "Sesotho", label: "Sesotho" },
    { value: "Xitsonga", label: "Xitsonga" },
    { value: "Tshivenda", label: "Tshivenda" },
    { value: "isiNdebele", label: "isiNdebele" },
    { value: "Siswati", label: "Siswati" }
  ];

  return (
    <div className="section-c">
      <h2 className="section-c-title">C. CONTACT DETAILS</h2>

      <div className="mb-6">
        <SelectInput
          label="Preferred Language of Correspondence"
          name="preferred_language"
          value={formData.preferred_language}
          onChange={handleChange}
          options={languageOptions}
          required
          tooltip="Select the language you prefer for all communications regarding your application"
        />
      </div>

      <div className="section-c-grid">
        <TextInput
          label="Cell Phone Number"
          name="cell_phone"
          value={formData.cell_phone}
          onChange={handleChange}
          required
          tooltip="Your primary contact number that you can be reached on"
          type="tel"
        />

        <TextInput
          label="Alternative Number"
          name="alternative_number"
          value={formData.alternative_number}
          onChange={handleChange}
          tooltip="A secondary contact number (optional)"
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
          tooltip="Provide a valid email address that you check regularly"
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
          tooltip="Your current physical address"
        />
      </div>

      <div className="mb-6">
        <TextInput
          label="Postal Address (if different)"
          name="postal_address"
          value={formData.postal_address}
          onChange={handleChange}
          tooltip="Your mailing address, if different from your residential address"
        />
      </div>

      <div className="section-c-note">
        <p>
          <span className="font-bold">Important:</span> Please ensure your contact details are 
          accurate and up-to-date. The City of Polokwane will use these details to communicate 
          with you regarding your application. If your contact information changes, please notify 
          us as soon as possible.
        </p>
      </div>
    </div>
  );
}
