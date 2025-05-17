import { useState } from "react";
import FormStepper from "../FormStepper/FormStepper";
import FormHeader from "../FormHeader/FormHeader";
import SectionA from "../../../../sections/Senior/SectionA/SectionA";
import SectionB from "../../../../sections/Senior/SectionB/SectionB";
import SectionC from "../../../../sections/Senior/SectionC/SectionC";
import SectionD from "../../../../sections/Senior/SectionD/SectionD";
import SectionE from "../../../../sections/Senior/SectionE/SectionE";
import SectionF from "../../../../sections/Senior/SectionF/SectionF";
import SectionG from "../../../../sections/Senior/SectionG/SectionG";
import SectionH from "../../../../sections/Senior/SectionH/SectionH";
import SectionI from "../../../../sections/Senior/SectionI/SectionI";
import ProgressIndicator from "../ProgressIndicator/ProgressIndicator";
import './FormContainer.css';

export default function FormContainer() {
    const [currentSection, setCurrentSection] = useState(0);
    const [formData, setFormData] = useState({
        // Section A - Details of Advertised Post
        advertised_post: "",
        reference_number: "",
        notice_service_period: "",
        municipality_entity: "",
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
        { id: "section-d", title: "Qualifications", component: SectionD },
        { id: "section-e", title: "Work Experience", component: SectionE },
        { id: "section-f", title: "Disciplinary Record", component: SectionF },
        { id: "section-g", title: "Criminal Record", component: SectionG },
        { id: "section-h", title: "References", component: SectionH },
        { id: "section-i", title: "Declaration", component: SectionI },
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

                <div className="form-navigation">
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentSection === 0}
                        className={`btn-previous ${currentSection === 0 ? 'disabled' : ''}`}
                    >
                        Previous
                    </button>

                    {currentSection === sections.length - 1 ? (
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="btn-submit"
                        >
                            Submit Application
                        </button>
                    ) : (
                        <button
                            type="button"
                            onClick={handleNext}
                            className="btn-next"
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}