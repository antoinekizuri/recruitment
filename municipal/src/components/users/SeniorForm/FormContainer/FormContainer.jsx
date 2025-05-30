import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'; import FormStepper from "../FormStepper/FormStepper";
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
import Loader from "../../Loader";
import { validateSectionB, validateSectionC, validateSectionD, validateSectionE, validateSectionF, validateSectionG, validateSectionI } from "../../../../utils/seniorValidators";

export default function FormContainer() {
    const [currentSection, setCurrentSection] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const [isJobDataPopulated, setIsJobDataPopulated] = useState(false);
    const [loadingJobData, setLoadingJobData] = useState(true);
    const [isFromJobListing, setIsFromJobListing] = useState(false);

    const [formData, setFormData] = useState({
        // Section A - Details of Advertised Post
        position_title: "",
        reference_number: "",
        notice_service_period: "",
        department: "",
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
        has_political_membership: false,
        political_party: "",
        political_party_position: "",
        political_party_expiry_date: "",
        has_professional_membership: false,
        professional_body: "",
        membership_number: "",
        expiry_date: "",

        // Section C - Contact Details
        preferred_language: "",
        cell_phone: "",
        email: "",
        residential_address: "",
        postal_address: "",

        // Section D - Qualifications
        highest_school_qualification: "",
        school_name: "",
        school_completion_year: "",
        highest_tertiary_qualification: "",
        institution_name: "",
        nqf_level: "",
        qualification_year: "",

        // Section E - Work Experience
        is_currently_employed: false,
        current_employer: "",
        employment_period: "",
        current_city_employee: false,
        designation: "",
        pay_number: "",
        previous_employers: [],
        previous_local_govt_condition: false,
        previous_municipality: "",

        // Section F - Disciplinary Record
        has_criminal_or_disciplinary_record: false,
        misconduct_municipality: "",
        misconduct_type: "",
        misconduct_date: "",
        misconduct_sanction: "",
        resigned_pending_disciplinary: false,
        criminal_or_disciplinary_details: "",
        // Section G - Criminal Record
        has_criminal_record: false,
        criminal_act_type: "",
        criminal_case_date: "",
        criminal_outcome: "",

        // Section H - References
        references: [{ name: "", relationship: "", telephone: "", cell_phone: "", email: "" }],

        // Section I - Declaration
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
    useEffect(() => {
        if (location.state?.jobData && location.state?.fromJobListing && !isJobDataPopulated) {
            const jobData = location.state.jobData;

            console.log("[FormContainer] Populating job data from JobListing:", jobData);

            setFormData(prevData => ({
                ...prevData,
                position_title: jobData.title || prevData.position_title,
                reference_number: jobData.reference || prevData.reference_number,
                department: jobData.department || prevData.department,
            }));

            setIsJobDataPopulated(true);
            setIsFromJobListing(true);
        }

        // Set loading to false once jobData is populated (or skipped)
        setLoadingJobData(false);

        // Clean up state - but only after we've stored what we need
        if (location.state?.fromJobListing) {
            window.history.replaceState({}, document.title);
        }
    }, [location.state, isJobDataPopulated]);

    console.log("[FormContainer] isJobDataPopulated:", isJobDataPopulated);
    useEffect(() => {
        const savedData = localStorage.getItem('SeniorapplicationFormData');
        if (savedData && !location.state?.fromJobListing) {
            try {
                const parsedData = JSON.parse(savedData);
                setFormData(parsedData);
            } catch (error) {
                console.error('Error parsing saved form data:', error);
            }
        }
    }, [location.state]);

    useEffect(() => {
        localStorage.setItem('SeniorapplicationFormData', JSON.stringify(formData));
    }, [formData]);

    //TODO
    const transformFormDataForServer = (formData) => {
        return {
            sectionA: {
                position_title: formData.position_title,
                reference_number: formData.reference_number,
                directorate: formData.directorate,
                department: formData.department,
                division: formData.division,
                notice_service_period: formData.notice_service_period,
            },
            sectionB: {
                // Basic personal info
                surname: formData.surname,
                first_names: formData.first_names,
                id_number: formData.id_number,

                // Demographics
                race: formData.race,
                gender: formData.gender,

                // Disability info
                has_disability: formData.has_disability ? 'Yes' : 'No',
                disability_details: formData.disability_details || '',

                // Citizenship and nationality
                is_south_african: formData.is_south_african ? 'Yes' : 'No',
                nationality: formData.nationality || '',
                work_permit_number: formData.work_permit_number || '',

                // Political membership (missing from your original transform)
                has_political_membership: formData.has_political_membership ? 'Yes' : 'No',
                political_body: formData.political_body || '',
                political_party_position: formData.political_party_position || '',
                political_party_expiry_date: formData.political_party_expiry_date || '',

                // Professional membership
                has_professional_membership: formData.has_professional_membership ? 'Yes' : 'No',
                professional_body: formData.professional_body || '',
                membership_number: formData.membership_number || '',
                expiry_date: formData.expiry_date || '',
            },
            sectionC: {
                preferred_language: formData.preferred_language || '',
                cell_phone: formData.cell_phone || '',
                email: formData.email || '',
                residential_address: formData.residential_address || '',
                postal_address: formData.postal_address || '',
                postal_code: formData.postal_code || '', // ADDED: Missing postal code

            },

            sectionD: {
                highest_tertiary_qualification: formData.senior_qualification || '',
                tertiary_institution: formData.senior_institution || '',
                nqf_level: formData.senior_nqf_level || '',
                tertiary_qualification_year: formData.senior_year_obtained || '',
            },
            sectionE: {
                // Current employment status
                is_currently_employed: formData.is_currently_employed === 'yes' ? 'Yes' : 'No',
                current_employer: formData.current_employer_name || '',
                employment_period: formData.current_employment_period || '',
                current_designation: formData.current_designation || '',
                current_pay_number: formData.pay_number || '',

                // Re-employment restriction fields
                has_reemployment_restriction: formData.has_reemployment_restriction === 'yes' ? 'Yes' : 'No',
                previous_municipality: formData.previous_municipality_name || '',

                // Transform senior_employment_history array data
                previous_employer_1: formData.senior_employment_history?.map(emp => emp.employer_name).filter(Boolean).join('; ') || '',
                position_1: formData.senior_employment_history?.map(emp => emp.position_held).filter(Boolean).join('; ') || '',
                start_date: formData.senior_employment_history?.map(emp => {
                    if (emp.from_month && emp.from_year) {
                        return `${emp.from_month}/${emp.from_year}`;
                    }
                    return '';
                }).filter(Boolean).join('; ') || '',
                end_date: formData.senior_employment_history?.map(emp => {
                    if (emp.to_month && emp.to_year) {
                        return `${emp.to_month}/${emp.to_year}`;
                    }
                    return '';
                }).filter(Boolean).join('; ') || '',
                reason_to_leave: formData.senior_employment_history?.map(emp => emp.reason_for_leaving).filter(Boolean).join('; ') || '',

                // Contact information for employment history
                contact_persons: formData.senior_employment_history?.map(emp => emp.contact_person).filter(Boolean).join('; ') || '',
                contact_numbers: formData.senior_employment_history?.map(emp => emp.contact_number).filter(Boolean).join('; ') || '',
            },

            sectionF: {
                dismissed_for_misconduct: formData.has_criminalF_or_disciplinary_record === 'yes' ? 'Yes' : 'No',
                misconduct_institution: formData.criminal_or_disciplinary_details || '',
                misconduct_type: formData.misconduct_type || '',
                misconduct_date: formData.misconduct_date || '',
                misconduct_sanction: formData.misconduct_sanction || '',
                resigned_pending_disciplinary: formData.resigned_pending_disciplinary === 'yes' ? 'Yes' : 'No',
                disciplinary_details: formData.disciplinary_details || '',
            },

            sectionG: {
                has_criminal_or_disciplinary_record: formData.has_criminalG_or_disciplinary_record === 'yes' ? 'Yes' : 'No',
                has_criminal_record: formData.has_criminal_record === 'yes' ? 'Yes' : 'No',
                criminal_act_type: formData.criminal_act_type || '',
                criminal_case_date: formData.criminal_case_date || '',
                criminal_case_outcome: formData.criminal_case_outcome || '',
            },

            sectionH: {
                referee_name: formData.references?.map(ref => ref.name).filter(Boolean).join('; ') || '',
                referee_relationship: formData.references?.map(ref => ref.relationship).filter(Boolean).join('; ') || '',
                referee_office_phone: formData.references?.map(ref => ref.office_phone).filter(Boolean).join('; ') || '',
                referee_cell_phone: formData.references?.map(ref => ref.cell_phone).filter(Boolean).join('; ') || '',
                referee_email: formData.references?.map(ref => ref.email).filter(Boolean).join('; ') || '',
            },

            sectionI: {
                declaration_agreed: formData.declaration_accepted ? 'Yes' : 'No',
                declaration_date: new Date().toISOString().split('T')[0],
                electronic_signature: `${formData.first_names} ${formData.surname}`
            },
        };
    };

    // Comprehensive form validation - TODO
    const validateCurrentSection = () => {
        const currentSectionId = sections[currentSection].id;
        const errors = {};

        switch (currentSectionId) {
            case 'section-a':
                if (!formData.position_title.trim()) errors.position_title = 'Advertised post is required';
                if (!formData.reference_number.trim()) errors.reference_number = 'Reference number is required';
                break;

            case 'section-b':
                const sectionBValidation = validateSectionB(formData);
                if (!sectionBValidation.isValid) {
                    Object.assign(errors, sectionBValidation.errors);
                }
                break;

            case 'section-c':
                const sectionCValidation = validateSectionC(formData);
                if (!sectionCValidation.isValid) {
                    Object.assign(errors, sectionCValidation.errors);
                }
                break;
            case 'section-d':
                const sectionDValidation = validateSectionD(formData);
                if (!sectionDValidation.isValid) {
                    Object.assign(errors, sectionDValidation.errors);
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
                if (!formData.references || formData.references.length === 0) {
                    errors.references = 'At least one reference is required';
                } else {
                    formData.references.forEach((ref, index) => {
                        if (!ref.name.trim()) errors[`reference_${index}_name`] = `Reference ${index + 1} name is required`;
                        if (!ref.relationship.trim()) errors[`reference_${index}_relationship`] = `Reference ${index + 1} relationship is required`;
                        if (!ref.office_phone.trim() && !ref.cell_phone.trim()) {
                            errors[`reference_${index}_contact`] = `Reference ${index + 1} must have either telephone or cell phone`;
                        }
                    });
                }
                break;

            case 'section-i':
                const sectionIValidation = validateSectionI(formData);
                if (!sectionIValidation.isValid) {
                    Object.assign(errors, sectionIValidation.errors);
                }
                break;

            default:
                break;
        }

        setFormErrors({ ...formErrors, [currentSectionId]: errors });
        return Object.keys(errors).length === 0;
    };

    // Validate entire form before submission - TODO
    const validateEntireForm = () => {
        const allErrors = {};
        let isValid = true;

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
                setShowConfirmation(true);
            }
        } else {
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
        if (!validateEntireForm()) {
            setShowConfirmation(false);
            alert('Please fix all errors before submitting the application.');
            return;
        }

        setIsSubmitting(true);

        try {
            const transformedData = transformFormDataForServer(formData);

            console.log('Submitting form data:', transformedData);
            console.log('Submitting form data:', JSON.stringify(transformedData));

            const response = await fetch('https://erecruitment-backend-aghxfgbqayf0atcr.southafricanorth-01.azurewebsites.net/server.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formType: 'senior_management',
                    formData: transformedData
                })
            });

            const result = await response.json();
            console.log('Server response:', result);

            if (response.ok && result.success) {
                localStorage.setItem('SeniorapplicationReference', result.id || result.referenceNumber || 'N/A');
                localStorage.setItem('submissionTitle', result.submissionTitle || 'Application Submitted Successfully');
                localStorage.removeItem('SeniorapplicationFormData');

                alert('Application submitted successfully!');

                if (navigate) {
                    navigate('/');
                } else {
                    resetForm();
                }
            } else {
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
            highest_school_grade: "",
            school_name: "",
            school_year_completed: "",
            qualifications: [],
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
        setIsJobDataPopulated(false);
    };
    const CurrentSectionComponent = sections[currentSection].component;
    const progress = ((currentSection + 1) / sections.length) * 100;
    const currentSectionErrors = formErrors[sections[currentSection].id] || {};

    if (loadingJobData) {
        return <Loader message="Preparing form..." />;
    }

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
                    isJobPrepopulated={isJobDataPopulated}
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