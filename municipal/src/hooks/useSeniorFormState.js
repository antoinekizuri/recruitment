import { useState } from 'react';
import { createInitialFormState } from '../utils/SeniorFormHelpers';
import * as validators from '../utils/seniorValidators';

/**
 * Custom hook for managing form state 
 * @returns {Object} Form state and methods
 */
const useFormState = () => {
  // Initialize form state with all sections
  const [formData, setFormData] = useState(createInitialFormState());
  
  // Track validation errors for each section
  const [validationErrors, setValidationErrors] = useState({
    sectionA: {},
    sectionB: {},
    sectionC: {},
    sectionD: {},
    sectionE: {},
    sectionF: {},
    sectionG: {},
    sectionH: {},
    sectionI: {}
  });
  
  // Track touched fields to show validation errors only after user interaction
  const [touchedFields, setTouchedFields] = useState({});
  
  // Update field value in specified section
  const updateField = (section, field, value) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [field]: value
      }
    }));
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [`${section}.${field}`]: true
    }));
  };
  
  // Update entire section
  const updateSection = (section, data) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        ...data
      }
    }));
  };
  
  // Add an item to an array field (e.g., tertiary qualifications)
  const addItemToArray = (section, arrayField, item) => {
    setFormData(prevState => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [arrayField]: [...prevState[section][arrayField], item]
      }
    }));
  };
  
  // Remove an item from an array field
  const removeItemFromArray = (section, arrayField, index) => {
    setFormData(prevState => {
      const updatedArray = [...prevState[section][arrayField]];
      updatedArray.splice(index, 1);
      
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [arrayField]: updatedArray
        }
      };
    });
  };
  
  // Update an item in an array field
  const updateItemInArray = (section, arrayField, index, updatedItem) => {
    setFormData(prevState => {
      const updatedArray = [...prevState[section][arrayField]];
      updatedArray[index] = {
        ...updatedArray[index],
        ...updatedItem
      };
      
      return {
        ...prevState,
        [section]: {
          ...prevState[section],
          [arrayField]: updatedArray
        }
      };
    });
  };

  // Handle conditional field updates (e.g., when "yes/no" selection affects other fields)
  const handleConditionalUpdate = (section, field, value, conditionalUpdates) => {
    setFormData(prevState => {
      const updatedSection = {
        ...prevState[section],
        [field]: value
      };
      
      // Apply conditional updates if provided
      if (conditionalUpdates) {
        Object.keys(conditionalUpdates).forEach(key => {
          updatedSection[key] = conditionalUpdates[key];
        });
      }
      
      return {
        ...prevState,
        [section]: updatedSection
      };
    });
    
    // Mark field as touched
    setTouchedFields(prev => ({
      ...prev,
      [`${section}.${field}`]: true
    }));
  };
  
  // Validate a specific section
  const validateSection = (section) => {
    let validationResult;
    
    switch (section) {
      case 'sectionB':
        validationResult = validators.validateSectionB(formData.sectionB);
        break;
      case 'sectionC':
        validationResult = validators.validateSectionC(formData.sectionC);
        break;
      case 'sectionD':
        validationResult = validators.validateSectionD(formData.sectionD);
        break;
      case 'sectionE':
        validationResult = validators.validateSectionE(formData.sectionE);
        break;
      case 'sectionF':
        validationResult = validators.validateSectionF(formData.sectionF);
        break;
      case 'sectionG':
        validationResult = validators.validateSectionG(formData.sectionG);
        break;
      case 'sectionH':
        validationResult = validators.validateSectionH(formData.sectionH);
        break;
      case 'sectionI':
        validationResult = validators.validateSectionI(formData.sectionI);
        break;
      default:
        validationResult = { isValid: true, errors: {} };
    }
    
    // Update validation errors for the section
    setValidationErrors(prev => ({
      ...prev,
      [section]: validationResult.errors || {}
    }));
    
    return validationResult;
  };
  
  // Validate the entire form
  const validateForm = () => {
    const result = validators.validateForm(formData);
    
    // Update all validation errors
    setValidationErrors({
      sectionB: result.sectionResults.sectionB.errors || {},
      sectionC: result.sectionResults.sectionC.errors || {},
      sectionD: result.sectionResults.sectionD.errors || {},
      sectionE: result.sectionResults.sectionE.errors || {},
      sectionF: result.sectionResults.sectionF.errors || {},
      sectionG: result.sectionResults.sectionG.errors || {},
      sectionH: result.sectionResults.sectionH.errors || {},
      sectionI: result.sectionResults.sectionI.errors || {},
    });
    
    return result;
  };
  
  // Check if a field has been touched and has an error
  const hasError = (section, field) => {
    return touchedFields[`${section}.${field}`] && 
           validationErrors[section] && 
           validationErrors[section][field];
  };
  
  // Get error message for a field
  const getErrorMessage = (section, field) => {
    if (hasError(section, field)) {
      return validationErrors[section][field];
    }
    return '';
  };
  
  // Mark all fields in a section as touched (useful when submitting)
  const markSectionAsTouched = (section) => {
    const sectionFields = Object.keys(formData[section]);
    const newTouchedFields = {};
    
    sectionFields.forEach(field => {
      newTouchedFields[`${section}.${field}`] = true;
    });
    
    setTouchedFields(prev => ({
      ...prev,
      ...newTouchedFields
    }));
  };
  
  // Reset form to initial state
  const resetForm = () => {
    setFormData(createInitialFormState());
    setValidationErrors({
      sectionA: {},
      sectionB: {},
      sectionC: {},
      sectionD: {},
      sectionE: {},
      sectionF: {},
      sectionG: {},
      sectionH: {},
      sectionI: {},
    });
    setTouchedFields({});
  };
  
  return {
    formData,
    validationErrors,
    touchedFields,
    updateField,
    updateSection,
    addItemToArray,
    removeItemFromArray,
    updateItemInArray,
    handleConditionalUpdate,
    validateSection,
    validateForm,
    hasError,
    getErrorMessage,
    markSectionAsTouched,
    resetForm
  };
};

export default useFormState;