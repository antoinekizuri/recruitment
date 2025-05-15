import { useState } from "react";
import FormStepper from "../FormStepper/FormStepper";
import FormHeader from "../FormHeader/FormHeader";
import SectionA from "../../../sections/SectionA/SectionA";
import SectionB from "../../../sections/SectionB/SectionB";
import SectionC from "../../../sections/SectionC/SectionC";
import SectionD from "../../../sections/SectionD/SectionD";
import SectionE from "../../../sections/SectionE/SectionE";
import SectionF from "../../../sections/SectionF/SectionF";
import SectionG from "../../../sections/SectionG/SectionG";
import SectionH from "../../../sections/SectionH/SectionH";
import SectionI from "../../../sections/SectionI/SectionI";
import SectionJ from "../../../sections/SectionJ/SectionJ";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import './FormContainer.css';

export default function FormContainer() {
  const [currentSection, setCurrentSection] = useState(0);
  const [formData, setFormData] = useState({
    // Section A - Details of Advertised Post
    advertised_post: "",
    reference_number: "",
    notice_service_period: "",
    
    // Section B - Personal Details
    surname: "",
    first_names: "",
    id_number: "",
    race: "",
    gender: "",
    has_disability: false,
    disability_details: "",
    is_south_african: true,
    nationality: "",
    work_permit_number: "",
    has_professional_membership: false,
    professional_body: "",
    membership_number: "",
    expiry_date: "",
    
    // Section C - Contact Details
    preferred_language: "",
    cell_phone: "",
    alternative_number: "",
    email: "",
    residential_address: "",
    postal_address: "",
    
    // Section D - Driver's License
    license_codes: "",
    license_expiry_date: "",
    has_pdp: false,
    pdp_expiry_date: "",
    
    // Section E - Qualifications
    highest_school_qualification: "",
    school_name: "",
    school_completion_year: "",
    highest_tertiary_qualification: "",
    institution_name: "",
    nqf_level: "",
    qualification_year: "",
    
    // Section F - Work Experience
    is_currently_employed: false,
    current_employer: "",
    employment_period: "",
    current_city_employee: false,
    designation: "",
    pay_number: "",
    previous_employers: [],
    previous_local_govt_condition: false,
    previous_municipality: "",
    
    // Section G - Disciplinary Record
    dismissed_for_misconduct: false,
    misconduct_municipality: "",
    misconduct_type: "",
    misconduct_date: "",
    misconduct_sanction: "",
    resigned_pending_disciplinary: false,
    
    // Section H - Criminal Record
    has_criminal_record: false,
    criminal_act_type: "",
    criminal_case_date: "",
    criminal_outcome: "",
    
    // Section I - References
    references: [{ name: "", relationship: "", telephone: "", cell_phone: "", email: "" }],
    
    // Section J - Declaration
    declaration_accepted: false
  });

  const sections = [
    { id: "section-a", title: "Details of Advertised Post", component: SectionA },
    { id: "section-b", title: "Personal Details", component: SectionB },
    { id: "section-c", title: "Contact Details", component: SectionC },
    { id: "section-d", title: "Driver's License", component: SectionD },
    { id: "section-e", title: "Qualifications", component: SectionE },
    { id: "section-f", title: "Work Experience", component: SectionF },
    { id: "section-g", title: "Disciplinary Record", component: SectionG },
    { id: "section-h", title: "Criminal Record", component: SectionH },
    { id: "section-i", title: "References", component: SectionI },
    { id: "section-j", title: "Declaration", component: SectionJ }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Form submitted successfully!");
  };

  const CurrentSectionComponent = sections[currentSection].component;
  const progress = ((currentSection + 1) / sections.length) * 100;

  return (
    <div className="form-container">
      <FormHeader />
      <FormStepper 
        sections={sections} 
        currentSection={currentSection} 
        setCurrentSection={setCurrentSection} 
      />
      {/* <ProgressIndicator progress={progress} /> */}
      
      <div className="mt-8">
        <CurrentSectionComponent 
          formData={formData} 
          handleChange={handleChange} 
        />
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className={`px-4 py-2 rounded ${
              currentSection === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          
          {currentSection === sections.length - 1 ? (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Application
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}