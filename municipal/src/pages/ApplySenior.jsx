import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/users/SeniorForm/FormContainer/FormContainer';
import FormStepper from '../components/users/FormStepper/FormStepper';
import FormHeader from '../components/users/FormHeader/FormHeader';
import ProgressIndicator from '../components/users/ProgressIndicator/ProgressIndicator';

// Import all sections
import SectionA from '../sections/Senior/SectionA/SectionA';
import SectionB from '../sections/Senior/SectionB/SectionB';
import SectionC from '../sections/Senior/SectionC/SectionC';
import SectionD from '../sections/Senior/SectionD/SectionD';
import SectionE from '../sections/Senior/SectionE/SectionE';
import SectionF from '../sections/Senior/SectionF/SectionF';
import SectionG from '../sections/Senior/SectionG/SectionG';
import SectionH from '../sections/Senior/SectionH/SectionH';
import SectionI from '../sections/Senior/SectionI/SectionI';

// Import hooks and utils
import useFormState from '../hooks/useSeniorFormState';
import { getSectionTitle, getSectionDescription } from '../utils/SeniorFormHelpers';
import { FORM_SECTIONS } from '../constants/formConstants';
import * as validators from '../utils/seniorValidators';

import './ApplyNormal.css';

const ApplySenior = () => {
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
        const response = await fetch('https://localhost:8000/server.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formType: 'senior_management',
            formData: formData
          })
        });

        if (response.ok) {
          const result = await response.json();
          localStorage.setItem('SeniorapplicationReference', result.referenceNumber);
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
    localStorage.setItem('SeniorapplicationFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const savedData = localStorage.getItem('SeniorapplicationFormData');
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


      <div className="form-main-container">
        <FormContainer />
      </div>

    </div>
  );
};

export default ApplySenior;
