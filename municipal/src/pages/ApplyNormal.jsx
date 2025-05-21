import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/users/FormContainer/FormContainer';
import FormStepper from '../components/users/FormStepper/FormStepper';
import FormHeader from '../components/users/FormHeader/FormHeader';
import ProgressIndicator from '../components/users/ProgressIndicator/ProgressIndicator';

// Import all sections
import SectionA from '../sections/SectionA/SectionA';
import SectionB from '../sections/SectionB/SectionB';
import SectionC from '../sections/SectionC/SectionC';
import SectionD from '../sections/SectionD/SectionD';
import SectionE from '../sections/SectionE/SectionE';
import SectionF from '../sections/SectionF/SectionF';
import SectionG from '../sections/SectionG/SectionG';
import SectionH from '../sections/SectionH/SectionH';
import SectionI from '../sections/SectionI/SectionI';
import SectionJ from '../sections/SectionJ/SectionJ';

// Import hooks and utils
import useFormState from '../hooks/useFormState';
import { getSectionTitle, getSectionDescription } from '../utils/formHelpers';
import { FORM_SECTIONS } from '../constants/formConstants';
import * as validators from '../utils/validators';

import './ApplyNormal.css';

const ApplyNormal = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { formData, updateFormData, resetFormData } = useFormState();

  const formErrors = {};

  const validateSection = (sectionId) => {
    const sectionData = formData[sectionId];
    if (!sectionData) return false;

    const validatorMap = {
      sectionB: validators.validateSectionB,
      sectionC: validators.validateSectionC,
      sectionD: validators.validateSectionD,
      sectionE: validators.validateSectionE,
      sectionF: validators.validateSectionF,
      sectionG: validators.validateSectionG,
      sectionH: validators.validateSectionH,
      sectionI: validators.validateSectionI,
      sectionJ: validators.validateSectionJ,
    };

    const validateFn = validatorMap[sectionId];
    if (!validateFn) return true;

    const result = validateFn(sectionData);
    formErrors[sectionId] = result.errors || {};
    return result.isValid;
  };

  const isSectionValid = (sectionId) => {
    const sectionData = formData[sectionId];
    if (!sectionData) return false;

    const validatorMap = {
      sectionB: validators.validateSectionB,
      sectionC: validators.validateSectionC,
      sectionD: validators.validateSectionD,
      sectionE: validators.validateSectionE,
      sectionF: validators.validateSectionF,
      sectionG: validators.validateSectionG,
      sectionH: validators.validateSectionH,
      sectionI: validators.validateSectionI,
      sectionJ: validators.validateSectionJ,
    };

    const validateFn = validatorMap[sectionId];
    if (!validateFn) return true;

    const result = validateFn(sectionData);
    return result.isValid;
  };

  const sections = [
    { id: 'sectionA', component: SectionA },
    { id: 'sectionB', component: SectionB },
    { id: 'sectionC', component: SectionC },
    { id: 'sectionD', component: SectionD },
    { id: 'sectionE', component: SectionE },
    { id: 'sectionF', component: SectionF },
    { id: 'sectionG', component: SectionG },
    { id: 'sectionH', component: SectionH },
    { id: 'sectionI', component: SectionI },
    { id: 'sectionJ', component: SectionJ },
  ];

  const progressPercentage = ((currentStep + 1) / sections.length) * 100;

  const handleNext = () => {
    if (validateSection(sections[currentStep].id)) {
      if (currentStep < sections.length - 1) {
        setCurrentStep(currentStep + 1);
        window.scrollTo(0, 0);
      } else {
        setShowConfirmation(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const jumpToSection = (index) => {
    if (index <= currentStep + 1 && index >= 0 && index < sections.length) {
      setCurrentStep(index);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    let allValid = true;

    for (let i = 0; i < sections.length; i++) {
      if (!isSectionValid(sections[i].id)) {
        allValid = false;
        setCurrentStep(i);
        break;
      }
    }

    if (allValid) {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/submit-application', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('applicationReference', result.referenceNumber);
          navigate('/application-submitted');
        } else {
          const error = await response.json();
          console.error('Submission error:', error);
          alert('There was a problem submitting your application. Please try again.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        alert('There was a problem connecting to the server. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (sectionId, fieldData) => {
    updateFormData(sectionId, fieldData);
  };

  useEffect(() => {
    localStorage.setItem('applicationFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem('applicationFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        resetFormData(parsedData);
      } catch (error) {
        console.error('Error parsing saved form data:', error);
      }
    }
  }, []);

  if (!formData || !formData.sectionA) {
    return <div>Loading form data...</div>;
  }

  const CurrentSection = sections[currentStep].component;
  const currentSectionId = sections[currentStep].id;

  return (
    <div className="apply-normal-page">
      {/* <FormHeader 
        title="Application Form" 
        subtitle="Please complete all sections of the application"
      />

      <ProgressIndicator percentage={progressPercentage} /> */}

      <div className="form-main-container">
        {/* <FormStepper 
          sections={sections.map((section, index) => ({
            id: section.id,
            title: getSectionTitle(section.id),
            isCompleted: isSectionValid(section.id),
            isCurrent: index === currentStep
          }))}
          currentStep={currentStep}
          onStepClick={jumpToSection}
        /> */}

        <FormContainer
          title={getSectionTitle(currentSectionId)}
          description={getSectionDescription(currentSectionId)}
        >
          <CurrentSection
            data={formData[currentSectionId] || {}}
            onChange={(data) => handleChange(currentSectionId, data)}
            errors={formErrors[currentSectionId] || {}}
          />

          <div className="form-navigation">
            <button 
              className="btn-previous"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>

            {currentStep < sections.length - 1 ? (
              <button 
                className="btn-next"
                onClick={handleNext}
              >
                Next
              </button>
            ) : (
              <button 
                className="btn-submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </button>
            )}
          </div>

          {Object.keys(formErrors[currentSectionId] || {}).length > 0 && (
            <div className="form-errors-summary">
              <h4>Please fix the following errors:</h4>
              <ul>
                {Object.entries(formErrors[currentSectionId] || {}).map(([field, error]) => (
                  <li key={field}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </FormContainer>
      </div>

      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h2>Ready to Submit Your Application?</h2>
            <p>Please review all your information before final submission. Once submitted, you cannot make changes.</p>

            <div className="confirmation-actions">
              <button 
                className="btn-cancel" 
                onClick={() => setShowConfirmation(false)}
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
       )}
     </div>
  );
};

export default ApplyNormal;
