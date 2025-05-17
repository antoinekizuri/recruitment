import { useState, useEffect } from 'react';
import * as validators from '../utils/seniorValidators';

/**
 * Custom hook for form validation with debouncing
 * @param {Object} formData - Form data to validate
 * @param {string} sectionId - Section ID to validate
 * @param {number} debounceTime - Debounce time in milliseconds
 * @returns {Object} Validation state and methods
 */
const useFormValidation = (formData, sectionId, debounceTime = 500) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);
  const [validating, setValidating] = useState(false);
  const [touched, setTouched] = useState({});
  
  // Use effect to debounce validation when form data changes
  useEffect(() => {
    // Skip validation if section is not provided
    if (!sectionId) return;
    
    setValidating(true);
    
    const timer = setTimeout(() => {
      // Validate section based on ID
      let validationResult;
      
      switch(sectionId) {
        case 'sectionB':
          validationResult = validators.validateSectionB(formData[sectionId]);
          break;
        case 'sectionC':
          validationResult = validators.validateSectionC(formData[sectionId]);
          break;
        case 'sectionD':
          validationResult = validators.validateSectionD(formData[sectionId]);
          break;
        case 'sectionE':
          validationResult = validators.validateSectionE(formData[sectionId]);
          break;
        case 'sectionF':
          validationResult = validators.validateSectionF(formData[sectionId]);
          break;
        case 'sectionG':
          validationResult = validators.validateSectionG(formData[sectionId]);
          break;
        case 'sectionH':
          validationResult = validators.validateSectionH(formData[sectionId]);
          break;
        case 'sectionI':
          validationResult = validators.validateSectionI(formData[sectionId]);
          break;
        default:
          validationResult = { isValid: true, errors: {} };
      }
      
      setErrors(validationResult.errors || {});
      setIsValid(validationResult.isValid);
      setValidating(false);
    }, debounceTime);
    
    // Clean up timer
    return () => clearTimeout(timer);
  }, [formData, sectionId, debounceTime]);
  
  /**
   * Mark a field as touched
   * @param {string} fieldName - Field name to mark as touched
   */
  const touchField = (fieldName) => {
    setTouched(prev => ({
      ...prev,
      [fieldName]: true
    }));
  };
  
  /**
   * Mark multiple fields as touched
   * @param {Array} fieldNames - Array of field names to mark as touched
   */
  const touchFields = (fieldNames) => {
    const updatedTouched = { ...touched };
    
    fieldNames.forEach(field => {
      updatedTouched[field] = true;
    });
    
    setTouched(updatedTouched);
  };
  
  /**
   * Mark all fields in the current section as touched
   */
  const touchAllFields = () => {
    if (!formData[sectionId]) return;
    
    const fieldNames = Object.keys(formData[sectionId]);
    touchFields(fieldNames);
  };
  
  /**
   * Check if a field has been touched
   * @param {string} fieldName - Field name to check
   * @returns {boolean} - True if field has been touched
   */
  const isTouched = (fieldName) => {
    return touched[fieldName] === true;
  };
  
  /**
   * Get error message for a field if it has been touched
   * @param {string} fieldName - Field name to get error for
   * @returns {string} - Error message or empty string
   */
  const getFieldError = (fieldName) => {
    return (isTouched(fieldName) && errors[fieldName]) ? errors[fieldName] : '';
  };
  
  /**
   * Validate a specific field
   * @param {string} fieldName - Field name to validate
   * @param {any} value - Field value
   * @returns {string} - Error message or empty string
   */
  const validateField = (fieldName, value) => {
    // Simple validation for required fields
    if (validators.isNotEmpty && !validators.isNotEmpty(value)) {
      return 'This field is required';
    }
    
    // Email validation
    if (fieldName === 'email' && value && !validators.isValidEmail(value)) {
      return 'Please enter a valid email address';
    }
    
    // ID number validation
    if (fieldName === 'id_number' && value && !validators.isValidSAID(value)) {
      return 'Please enter a valid 13-digit South African ID number';
    }
    
    // Phone number validation
    if ((fieldName === 'cell_phone' || fieldName === 'alternative_number') && 
        value && !validators.isValidPhoneNumber(value)) {
      return 'Please enter a valid South African phone number';
    }
    
    return '';
  };
  
  /**
   * Run validation on the current section and return a promise
   * @returns {Promise} - Promise resolving to validation result
   */
  const validateAsync = () => {
    return new Promise((resolve) => {
      // Validate section based on ID
      let validationResult;
      
      switch(sectionId) {
        case 'sectionB':
          validationResult = validators.validateSectionB(formData[sectionId]);
          break;
        case 'sectionC':
          validationResult = validators.validateSectionC(formData[sectionId]);
          break;
        case 'sectionD':
          validationResult = validators.validateSectionD(formData[sectionId]);
          break;
        case 'sectionE':
          validationResult = validators.validateSectionE(formData[sectionId]);
          break;
        case 'sectionF':
          validationResult = validators.validateSectionF(formData[sectionId]);
          break;
        case 'sectionG':
          validationResult = validators.validateSectionG(formData[sectionId]);
          break;
        case 'sectionH':
          validationResult = validators.validateSectionH(formData[sectionId]);
          break;
        case 'sectionI':
          validationResult = validators.validateSectionI(formData[sectionId]);
          break;
        default:
          validationResult = { isValid: true, errors: {} };
      }
      
      setErrors(validationResult.errors || {});
      setIsValid(validationResult.isValid);
      
      resolve(validationResult);
    });
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
  if (!validateFn) return true; // Section doesn't need validation

  const result = validateFn(sectionData);
  return result.isValid;
};

  return {
    errors,
    isValid,
    validating,
    touched,
    touchField,
    touchFields,
    touchAllFields,
    isTouched,
    getFieldError,
    validateField,
    validateAsync,
    isSectionValid
  };
};

export default useFormValidation;