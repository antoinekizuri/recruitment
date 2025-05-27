import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
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
import { validateSectionE, validateSectionF, validateSectionG, validateSectionH, validateSectionJ } from "../../../utils/validators";
export default function FormContainer() {
    const navigate = useNavigate();
    const [currentSection, setCurrentSection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [formData, setFormData] = useState({
        // Section A - Details of Advertised Post
        position_title: "",
        reference_number: "",
        notice_service_period: "",
        municipality_entity: "",
        directorate: "",
        department: "",
        division: "",
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
        highest_school_grade: "",           // Changed from highest_school_qualification
        school_name: "",
        school_year_completed: "",          // Changed from school_completion_year
        qualifications: [],

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

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('applicationFormData', JSON.stringify(formData));
    }, [formData]);

    // Load form data from localStorage on component mount
    useEffect(() => {
        const savedData = localStorage.getItem('applicationFormData');
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData);
            } catch (error) {
                console.error('Error parsing saved form data:', error);
            }
        }
    }, []);

    // Transform FormContainer data structure to match Server expected format
    const transformFormDataForServer = (formData) => {
        return {
            sectionA: {
                position_title: formData.position_title,
                reference_number: formData.reference_number,
                directorate: formData.directorate,
                department: formData.department,
                division: formData.division,
                notice_service_period: formData.notice_service_period,
                municipality_entity: formData.municipality_entity,
            },
            sectionB: {
                surname: formData.surname,
                first_names: formData.first_names,
                id_number: formData.id_number,
                race: formData.race,
                gender: formData.gender,
                has_disability: formData.has_disability ? 'Yes' : 'No', // Fixed field name
                disability_details: formData.disability_details,
                is_south_african: formData.is_south_african ? 'Yes' : 'No',
                nationality: formData.nationality,
                work_permit_number: formData.work_permit_number,
                has_professional_membership: formData.has_professional_membership ? 'Yes' : 'No',
                professional_body: formData.professional_body,
                membership_number: formData.membership_number,
                expiry_date: formData.expiry_date, // Fixed field name
            },
            sectionC: {
                preferred_language: formData.preferred_language,
                cell_phone: formData.cell_phone,
                alternative_number: formData.alternative_number,
                email: formData.email,
                residential_address: formData.residential_address,
                postal_address: formData.postal_address,
                postal_code: formData.postal_code, // Added missing field
            },
            sectionD: {
                license_codes: formData.license_codes,
                license_expiry_date: formData.license_expiry_date,
                has_pdp: formData.has_pdp ? 'Yes' : 'No',
                pdp_expiry_date: formData.pdp_expiry_date,
            },
            sectionE: {
                highest_school_grade: formData.highest_school_grade,
                school_name: formData.school_name,
                school_year_completed: formData.school_year_completed,
                // Handle multiple tertiary qualifications - concatenate with semicolons
                highest_tertiary_qualification: formData.qualifications?.map(q => q.qualification).filter(Boolean).join('; ') || '',
                tertiary_institution: formData.qualifications?.map(q => q.institution).filter(Boolean).join('; ') || '',
                nqf_level: formData.qualifications?.map(q => q.nqf_level).filter(Boolean).join('; ') || '',
                tertiary_qualification_year: formData.qualifications?.map(q => q.year_obtained).filter(Boolean).join('; ') || '',
                // Added current study fields
                current_study_institution: formData.current_study_institution || '',
                current_study_qualification: formData.current_study_qualification || '',
            },
            sectionF: {
                is_currently_employed: formData.is_currently_employed === 'yes' ? 'Yes' : 'No',
                current_employer: formData.current_employer_name,
                current_employer_address: formData.current_employer_address || '',
                employment_period: formData.employment_period || '', // This is correct
                current_designation: formData.current_designation, // Fixed: was formData.designation
                current_pay_number: formData.pay_number,
                reasons_for_leaving: formData.reason_for_leaving || '',

                // Handle multiple previous employers - concatenate with semicolons
                previous_employer_1: formData.previous_employers?.map(emp => emp.employer_name).filter(Boolean).join('; ') || '',
                position_1: formData.previous_employers?.map(emp => emp.position).filter(Boolean).join('; ') || '',

                // Fix date mapping - combine month and year into proper dates
                start_date: formData.previous_employers?.map(emp => {
                    if (emp.from_month && emp.from_year) {
                        return `${emp.from_month}/${emp.from_year}`;
                    }
                    return '';
                }).filter(Boolean).join('; ') || '',

                end_date: formData.previous_employers?.map(emp => {
                    if (emp.to_month && emp.to_year) {
                        return `${emp.to_month}/${emp.to_year}`;
                    }
                    return '';
                }).filter(Boolean).join('; ') || '',

                reason_to_leave: formData.previous_employers?.map(emp => emp.reason_for_leaving).filter(Boolean).join('; ') || '',

                // Fix field name mismatch
                has_reemployment_restriction: formData.has_reemployment_restriction === 'yes' ? 'Yes' : 'No',
                previous_municipality: formData.previous_municipality_name || '',
            },
            sectionG: {
                dismissed_for_misconduct: formData.dismissed_for_misconduct ? 'Yes' : 'No',
                misconduct_institution: formData.misconduct_institution,
                misconduct_type: formData.misconduct_type,
                misconduct_date: formData.misconduct_date,
                misconduct_sanction: formData.misconduct_sanction,
                resigned_pending_disciplinary: formData.resigned_pending_disciplinary ? 'Yes' : 'No',
            },
            sectionH: {
                has_criminal_record: formData.has_criminal_record ? 'Yes' : 'No',
                criminal_act_type: formData.criminal_act_type,
                criminal_case_date: formData.criminal_case_date,
                criminal_case_outcome: formData.criminal_case_outcome,
            },
            sectionI: {
                // Handle multiple references - concatenate with semicolons
                referee_name: formData.references?.map(ref => ref.name).filter(Boolean).join('; ') || '',
                referee_relationship: formData.references?.map(ref => ref.relationship).filter(Boolean).join('; ') || '',
                referee_office_phone: formData.references?.map(ref => ref.office_phone).filter(Boolean).join('; ') || '',
                referee_cell_phone: formData.references?.map(ref => ref.cell_phone).filter(Boolean).join('; ') || '',
                referee_email: formData.references?.map(ref => ref.email).filter(Boolean).join('; ') || '',
            },
            sectionJ: {
                declaration_agreed: formData.declaration_accepted ? 'Yes' : 'No',
                declaration_date: new Date().toISOString().split('T')[0],
                electronic_signature: `${formData.first_names} ${formData.surname}`
            }
        };
    };

    // Comprehensive form validation
    const validateCurrentSection = () => {
        const currentSectionId = sections[currentSection].id;
        const errors = {};

        switch (currentSectionId) {
            case 'section-a':
                if (!formData.position_title.trim()) errors.position_title = 'Advertised post is required';
                if (!formData.reference_number.trim()) errors.reference_number = 'Reference number is required';
                break;

            case 'section-b':
                if (!formData.surname.trim()) errors.surname = 'Surname is required';
                if (!formData.first_names.trim()) errors.first_names = 'First names are required';
                if (!formData.id_number.trim()) errors.id_number = 'ID number is required';
                if (!formData.race) errors.race = 'Race is required';
                if (!formData.gender) errors.gender = 'Gender is required';
                if (!formData.is_south_african && !formData.nationality.trim()) {
                    errors.nationality = 'Nationality is required for non-South African citizens';
                }
                break;

            case 'section-c':
                if (!formData.preferred_language) errors.preferred_language = 'Preferred language is required';
                if (!formData.cell_phone.trim()) errors.cell_phone = 'Cell phone is required';
                if (!formData.email.trim()) errors.email = 'Email is required';
                if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
                    errors.email = 'Please enter a valid email address';
                }
                if (!formData.residential_address.trim()) errors.residential_address = 'Residential address is required';
                break;

            case 'section-d':
                // Driver's license validation (optional section)
                if (formData.license_codes && !formData.license_expiry_date) {
                    errors.license_expiry_date = 'License expiry date is required when license codes are provided';
                }
                break;

            case 'section-e':
                const sectionEValidation = validateSectionE(formData);
                if (!sectionEValidation.isValid) {
                    Object.assign(errors, sectionEValidation.errors);
                }
                break;

            case 'section-f':
                const sectionFValidation = validateSectionF(formData);

                if (!sectionFValidation.isValid) {
                    Object.assign(errors, sectionFValidation.errors);
                }
                break;

            case 'section-g':
                const sectionGValidation = validateSectionG(formData);

                if (!sectionGValidation.isValid) {
                    Object.assign(errors, sectionGValidation.errors);
                }
                break;

            case 'section-h':
                const sectionHValidation = validateSectionH(formData);

                if (!sectionHValidation.isValid) {
                    Object.assign(errors, sectionHValidation.errors);
                }
                break;

            case 'section-i':
                if (!formData.references || formData.references.length === 0) {
                    errors.references = 'At least one reference is required';
                } else {
                    formData.references.forEach((ref, index) => {
                        if (!ref.name.trim()) errors[`reference_${index}_name`] = `Reference ${index + 1} name is required`;
                        if (!ref.relationship.trim()) errors[`reference_${index}_relationship`] = `Reference ${index + 1} relationship is required`;
                        if (!ref.telephone.trim() && !ref.cell_phone.trim()) {
                            errors[`reference_${index}_contact`] = `Reference ${index + 1} must have either telephone or cell phone`;
                        }
                    });
                }
                break;

            case 'section-j':
                const sectionJValidation = validateSectionJ(formData);

                if (!sectionJValidation.isValid) {
                    Object.assign(errors, sectionJValidation.errors);
                } break;

            default:
                break;
        }

        setFormErrors({ ...formErrors, [currentSectionId]: errors });
        return Object.keys(errors).length === 0;
    };

    // Validate entire form before submission
    const validateEntireForm = () => {
        const allErrors = {};
        let isValid = true;

        // Validate all sections
        sections.forEach((section, index) => {
            const previousSection = currentSection;
            setCurrentSection(index);

            if (!validateCurrentSection()) {
                isValid = false;
            }

            setCurrentSection(previousSection);
        });

        return isValid;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value
        });

        // Clear specific field error when user starts typing
        if (formErrors[sections[currentSection].id] && formErrors[sections[currentSection].id][name]) {
            const sectionErrors = { ...formErrors[sections[currentSection].id] };
            delete sectionErrors[name];
            setFormErrors({
                ...formErrors,
                [sections[currentSection].id]: sectionErrors
            });
        }
    };

    const handleNext = () => {
        if (validateCurrentSection()) {
            if (currentSection < sections.length - 1) {
                setCurrentSection(currentSection + 1);
                window.scrollTo(0, 0);
            } else {
                // Last section, show confirmation
                setShowConfirmation(true);
            }
        } else {
            // Scroll to first error
            const firstErrorElement = document.querySelector('.error, .field-error');
            if (firstErrorElement) {
                firstErrorElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handlePrevious = () => {
        if (currentSection > 0) {
            setCurrentSection(currentSection - 1);
            window.scrollTo(0, 0);
        }
    };

    const jumpToSection = (index) => {
        if (index >= 0 && index < sections.length) {
            setCurrentSection(index);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = async () => {
        // Final validation before submission
        if (!validateEntireForm()) {
            setShowConfirmation(false);
            alert('Please fix all errors before submitting the application.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Transform the data to match your server's expected format
            const transformedData = transformFormDataForServer(formData);

            console.log('Submitting form data:', transformedData);
            console.log('Submitting form data:', JSON.stringify(transformedData));

            const response = await fetch('https://erecruitment-backend-aghxfgbqayf0atcr.southafricanorth-01.azurewebsites.net/server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'standard',
                    formData: transformedData
                })
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (response.ok && result.success) {
                // Success - store reference and navigate
                localStorage.setItem('applicationReference', result.id || result.referenceNumber || 'N/A');
                localStorage.setItem('submissionTitle', result.submissionTitle || 'Application Submitted Successfully');

                // Clear saved form data
                localStorage.removeItem('applicationFormData');

                alert('Application submitted successfully!');

                // Navigate to success page
                if (navigate) {
                    navigate('/');
                } else {
                    // Reset form if no navigation available
                    resetForm();
                }
            } else {
                // Handle server-side validation errors
                console.log('Server Error:', JSON.stringify(result.errors));

                if (result.errors && Array.isArray(result.errors)) {
                    alert('Please fix the following errors:\n' + result.errors.join('\n'));
                } else if (result.error) {
                    alert(result.error);
                } else {
                    alert('There was a problem submitting your application. Please try again.');
                }
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('There was a problem connecting to the server. Please check your connection and try again.');
        } finally {
            setIsSubmitting(false);
            setShowConfirmation(false);
        }
    };

    const resetForm = () => {
        setFormData({
            position_title: "",
            reference_number: "",
            notice_service_period: "",
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
            preferred_language: "",
            cell_phone: "",
            alternative_number: "",
            email: "",
            residential_address: "",
            postal_address: "",
            license_codes: "",
            license_expiry_date: "",
            has_pdp: false,
            pdp_expiry_date: "",
            highest_school_grade: "",           // UPDATED
            school_name: "",
            school_year_completed: "",          // UPDATED
            qualifications: [],                 // UPDATED
            is_currently_employed: false,
            current_employer: "",
            employment_period: "",
            current_city_employee: false,
            designation: "",
            pay_number: "",
            previous_employers: [],
            previous_local_govt_condition: false,
            previous_municipality: "",
            dismissed_for_misconduct: false,
            misconduct_municipality: "",
            misconduct_type: "",
            misconduct_date: "",
            misconduct_sanction: "",
            resigned_pending_disciplinary: false,
            has_criminal_record: false,
            criminal_act_type: "",
            criminal_case_date: "",
            criminal_outcome: "",
            references: [{ name: "", relationship: "", telephone: "", cell_phone: "", email: "" }],
            declaration_accepted: false
        });
        setCurrentSection(0);
        setFormErrors({});
    };

    const CurrentSectionComponent = sections[currentSection].component;
    const progress = ((currentSection + 1) / sections.length) * 100;
    const currentSectionErrors = formErrors[sections[currentSection].id] || {};

    return (
        <div className="form-container">
            <FormHeader />
            <FormStepper
                sections={sections}
                currentSection={currentSection}
                setCurrentSection={jumpToSection}
            />
            <ProgressIndicator progress={progress} />

            <div className="mt-8">
                <CurrentSectionComponent
                    formData={formData}
                    handleChange={handleChange}
                    errors={currentSectionErrors}
                />

                {/* Display section errors */}
                {Object.keys(currentSectionErrors).length > 0 && (
                    <div className="form-errors-summary">
                        <h4>Please fix the following errors:</h4>
                        <ul>
                            {Object.entries(currentSectionErrors).map(([field, error]) => (
                                <li key={field} className="error-item">{error}</li>
                            ))}
                        </ul>
                    </div>
                )}

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
                            onClick={handleNext}
                            className="btn-submit"
                        >
                            Review & Submit
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

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="confirmation-modal-overlay">
                    <div className="confirmation-modal">
                        <div className="confirmation-content">
                            <h2>Ready to Submit Your Application?</h2>
                            <p>Please review all your information before final submission. Once submitted, you cannot make changes.</p>

                            <div className="application-summary">
                                <h3>Application Summary:</h3>
                                <p><strong>Position:</strong> {formData.position_title}</p>
                                <p><strong>Reference:</strong> {formData.reference_number}</p>
                                <p><strong>Applicant:</strong> {formData.first_names} {formData.surname}</p>
                                <p><strong>Email:</strong> {formData.email}</p>
                            </div>

                            <div className="confirmation-actions">
                                <button
                                    className="btn-cancel"
                                    onClick={() => setShowConfirmation(false)}
                                    disabled={isSubmitting}
                                >
                                    Review Again
                                </button>
                                <button
                                    className="btn-confirm"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Submitting...' : 'Confirm Submission'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}