/**
 * Form validation utility functions
 */

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validates South African ID number format
 * @param {string} idNumber - ID number to validate
 * @returns {boolean} - True if ID number is valid
 */
export const isValidSAID = (idNumber) => {
  // Basic validation: 13 digits
  if (!idNumber || !/^\d{13}$/.test(idNumber)) {
    return false;
  }
  
  // More advanced validation could be added here (checksum, date validation, etc.)
  return true;
};

/**
 * Validates SA phone number format
 * @param {string} phoneNumber - Phone number to validate
 * @returns {boolean} - True if phone number is valid
 */
export const isValidPhoneNumber = (phoneNumber) => {
  // Remove spaces, dashes, and parentheses
  const cleaned = phoneNumber.replace(/[\s\-()]/g, '');
  
  // Basic validation for SA numbers (can start with 0 or +27)
  if (cleaned.startsWith('+27')) {
    return /^\+27\d{9}$/.test(cleaned);
  } else if (cleaned.startsWith('0')) {
    return /^0\d{9}$/.test(cleaned);
  }
  
  return false;
};

/**
 * Validates that a field is not empty
 * @param {string} value - Value to check
 * @returns {boolean} - True if value is not empty
 */
export const isNotEmpty = (value) => {
  return value !== undefined && value !== null && value.trim() !== '';
};

/**
 * Validates form section data
 * @param {Object} sectionData - Section data to validate
 * @param {Array} requiredFields - List of required field names
 * @returns {Object} - Object with isValid flag and errors object
 */
export const validateSection = (sectionData, requiredFields) => {
  const errors = {};
  
  requiredFields.forEach(field => {
    if (!isNotEmpty(sectionData[field])) {
      errors[field] = 'This field is required';
    }
  });
  
  // Add specific validations
  if (sectionData.email && !isValidEmail(sectionData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  if (sectionData.id_number && !isValidSAID(sectionData.id_number)) {
    errors.id_number = 'Please enter a valid 13-digit South African ID number';
  }
  
  if (sectionData.cell_phone && !isValidPhoneNumber(sectionData.cell_phone)) {
    errors.cell_phone = 'Please enter a valid South African phone number';
  }
  
  if (sectionData.alternative_number && sectionData.alternative_number.trim() !== '' && 
      !isValidPhoneNumber(sectionData.alternative_number)) {
    errors.alternative_number = 'Please enter a valid South African phone number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section B (Personal Details)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionB = (sectionData) => {
  const requiredFields = ['surname', 'first_names', 'id_number', 'race', 'gender'];
  return validateSection(sectionData, requiredFields);
};

/**
 * Validates Section C (Contact Details)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionC = (sectionData) => {
  const requiredFields = ['preferred_language', 'cell_phone', 'email', 'residential_address'];
  return validateSection(sectionData, requiredFields);
};

/**
 * Validates Section D (Driver's License)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionD = (sectionData) => {
  const errors = {};
  
  // If license codes are provided, expiry date should be required
  if (isNotEmpty(sectionData.license_codes) && !isNotEmpty(sectionData.license_expiry_date)) {
    errors.license_expiry_date = 'Please specify the expiry date of your license';
  }
  
  // If PDP is "yes", expiry date should be required
  if (sectionData.has_pdp === 'yes' && !isNotEmpty(sectionData.pdp_expiry_date)) {
    errors.pdp_expiry_date = 'Please specify the expiry date of your PDP';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section E (Qualifications)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionE = (sectionData) => {
  const errors = {};
  
  // Check if user has provided any qualification information
  const hasSchoolInfo = sectionData.highest_school_grade;
  const hasTertiaryInfo = sectionData.qualifications && 
                         sectionData.qualifications.length > 0 && 
                         sectionData.qualifications.some(q => 
                           q.qualification?.trim() || q.institution?.trim()
                         );
  
  // Require at least some qualification information
  if (!hasSchoolInfo && !hasTertiaryInfo) {
    errors.qualifications = 'Please provide at least your highest school grade or add a tertiary qualification';
  }
  
  // If school grade is provided, require school name
  if (sectionData.highest_school_grade && !sectionData.school_name?.trim()) {
    errors.school_name = 'School name is required when school grade is selected';
  }
  
  // Validate each qualification in the array
  if (sectionData.qualifications && sectionData.qualifications.length > 0) {
    sectionData.qualifications.forEach((qual, index) => {
      if (qual.qualification?.trim() && !qual.institution?.trim()) {
        errors[`qualification_${index}_institution`] = `Institution name is required for qualification ${index + 1}`;
      }
      if (qual.institution?.trim() && !qual.qualification?.trim()) {
        errors[`qualification_${index}_name`] = `Qualification name is required for qualification ${index + 1}`;
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
/**
 * Validates Section F (Work Experience)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionF = (sectionData) => {
  const errors = {};
  
  // If currently employed is "yes", employer name and period are required
  if (sectionData.is_currently_employed === 'yes') {
    if (!isNotEmpty(sectionData.current_employer_name)) {
      errors.current_employer_name = 'Please provide your current employer name';
    }
    
    if (!isNotEmpty(sectionData.employment_period)) {
      errors.employment_period = 'Please provide your current employment period';
    }
    
    // If current employer is City of Polokwane, designation and pay number are required
    if (sectionData.current_employer_name?.toLowerCase() === 'city of polokwane') {
      if (!isNotEmpty(sectionData.current_designation)) {
        errors.current_designation = 'Please provide your current designation';
      }
      
      if (!isNotEmpty(sectionData.pay_number)) {
        errors.pay_number = 'Please provide your pay number';
      }
    }
  }
  
  // If reemployment restriction is "yes", previous municipality name is required
  if (sectionData.has_reemployment_restriction === 'yes' && 
      !isNotEmpty(sectionData.previous_municipality_name)) {
    errors.previous_municipality_name = 'Please provide the name of the previous municipality';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section G (Disciplinary Record)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionG = (sectionData) => {
  const errors = {};
  
  // If dismissed for misconduct is "yes", details are required
  if (sectionData.dismissed_for_misconduct === 'yes') {
    if (!isNotEmpty(sectionData.misconduct_institution)) {
      errors.misconduct_institution = 'Please provide the institution name';
    }
    
    if (!isNotEmpty(sectionData.misconduct_type)) {
      errors.misconduct_type = 'Please provide the type of misconduct';
    }
    
    if (!isNotEmpty(sectionData.misconduct_date)) {
      errors.misconduct_date = 'Please provide the date';
    }
    
    if (!isNotEmpty(sectionData.misconduct_sanction)) {
      errors.misconduct_sanction = 'Please provide the sanction';
    }
  }
  
  // If resigned pending disciplinary is "yes", details are required
  if (sectionData.resigned_pending_disciplinary === 'yes' && 
      !isNotEmpty(sectionData.disciplinary_details)) {
    errors.disciplinary_details = 'Please provide details about the disciplinary proceedings';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section H (Criminal Record)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionH = (sectionData) => {
  const errors = {};
  
  // If has criminal record is "yes", details are required
  if (sectionData.has_criminal_record === 'yes') {
    if (!isNotEmpty(sectionData.criminal_act_type)) {
      errors.criminal_act_type = 'Please provide the type of criminal act';
    }
    
    if (!isNotEmpty(sectionData.criminal_case_date)) {
      errors.criminal_case_date = 'Please provide the date';
    }
    
    if (!isNotEmpty(sectionData.criminal_case_outcome)) {
      errors.criminal_case_outcome = 'Please provide the outcome/judgment';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section I (References)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionI = (sectionData) => {
  const errors = {};
  
  // At least three references are required
  if (!sectionData.references || sectionData.references.length < 3) {
    errors.references = 'Please provide at least three references';
    return {
      isValid: false,
      errors
    };
  }
  
  // Validate first three references (required fields)
  for (let i = 0; i < 3; i++) {
    const reference = sectionData.references[i];
    
    if (!isNotEmpty(reference.name)) {
      errors[`reference_${i}_name`] = 'Please provide the reference name';
    }
    
    if (!isNotEmpty(reference.relationship)) {
      errors[`reference_${i}_relationship`] = 'Please provide your relationship with the reference';
    }
    
    if (!isNotEmpty(reference.office_phone)) {
      errors[`reference_${i}_office_phone`] = 'Please provide a telephone number';
    }
    
    if (!isNotEmpty(reference.email)) {
      errors[`reference_${i}_email`] = 'Please provide an email address';
    } else if (!isValidEmail(reference.email)) {
      errors[`reference_${i}_email`] = 'Please provide a valid email address';
    }
  }
  // Validate supporting documents if any are provided
    if (sectionData.supporting_documents && sectionData.supporting_documents.length > 0) {
        sectionData.supporting_documents.forEach((doc, index) => {
            if (!isNotEmpty(doc.document_type)) {
                errors[`document_${index}_type`] = 'Please select a document type';
            }
            
            if (!doc.file) {
                errors[`document_${index}_file`] = 'Please upload a document file';
            } else {
                // Validate file size (5MB limit)
                if (doc.file.size > 5 * 1024 * 1024) {
                    errors[`document_${index}_file`] = 'File size must be less than 5MB';
                }
                
                // Validate file type
                const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
                if (!allowedTypes.includes(doc.file.type)) {
                    errors[`document_${index}_file`] = 'Please upload PDF, JPG, or PNG files only';
                }
            }
        });
    }
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates Section J (Declaration)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionJ = (sectionData) => {
  const errors = {};
  
  // Declaration agreement is required
  if (!sectionData.declaration_accepted) {  // Changed from declaration_agreed
    errors.declaration_accepted = 'You must agree to the declaration';
  }
  
  // Declaration date is required
  if (!isNotEmpty(sectionData.declaration_date)) {
    errors.declaration_date = 'Please provide the declaration date';
  }
  
  // Electronic signature is required
  if (!isNotEmpty(sectionData.electronic_signature)) {
    errors.electronic_signature = 'Please provide your electronic signature';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Validates the entire form
 * @param {Object} formData - Complete form data
 * @returns {Object} - Object with overall validity and section validity statuses
 */
export const validateForm = (formData) => {
  const sectionResults = {
    sectionB: validateSectionB(formData),
    sectionC: validateSectionC(formData),
    sectionD: validateSectionD(formData),
    sectionE: validateSectionE(formData),
    sectionF: validateSectionF(formData),
    sectionG: validateSectionG(formData),
    sectionH: validateSectionH(formData),
    sectionI: validateSectionI(formData),
    sectionJ: validateSectionJ(formData)
  };
  
  // Check if all sections are valid
  const isFormValid = Object.values(sectionResults).every(result => result.isValid);
  
  return {
    isValid: isFormValid,
    sectionResults
  };
};