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
  const errors = {};

  // Helper to validate non-empty values
  const isNotEmpty = (value) => value !== undefined && value !== null && value.toString().trim() !== '';

  // Helper to validate South African ID number
  const isValidSAIdNumber = (idNumber) => {
    if (!idNumber || idNumber.length !== 13) return false;
    
    // Check if all characters are digits
    if (!/^\d{13}$/.test(idNumber)) return false;
    
    // Basic date validation (YYMMDD)
    const year = parseInt(idNumber.substring(0, 2));
    const month = parseInt(idNumber.substring(2, 4));
    const day = parseInt(idNumber.substring(4, 6));
    
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    
    // Luhn algorithm check for SA ID numbers
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      let digit = parseInt(idNumber[i]);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit = Math.floor(digit / 10) + (digit % 10);
      }
      sum += digit;
    }
    
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit === parseInt(idNumber[12]);
  };

  // Basic required fields
  if (!isNotEmpty(sectionData.surname)) {
    errors.surname = 'Surname is required';
  }

  if (!isNotEmpty(sectionData.first_names)) {
    errors.first_names = 'First names are required';
  }

  if (!isNotEmpty(sectionData.id_number)) {
    errors.id_number = 'ID number is required';
  } else {
    // If it's a 13-digit number, validate as SA ID
    if (sectionData.id_number.replace(/\s/g, '').length === 13) {
      if (!isValidSAIdNumber(sectionData.id_number.replace(/\s/g, ''))) {
        errors.id_number = 'Please provide a valid 13-digit South African ID number';
      }
    }
    // For passport numbers, just check it's not empty (already checked above)
  }

  if (!isNotEmpty(sectionData.race)) {
    errors.race = 'Race is required';
  }

  if (!isNotEmpty(sectionData.gender)) {
    errors.gender = 'Gender is required';
  }

  // South African citizenship validation
  if (sectionData.is_south_african === undefined || sectionData.is_south_african === null) {
    errors.is_south_african = 'Please indicate if you are a South African citizen';
  }

  // If not South African, nationality is required
  if (sectionData.is_south_african === false) {
    if (!isNotEmpty(sectionData.nationality)) {
      errors.nationality = 'Nationality is required if you are not a South African citizen';
    }
  }

  // Disability validation
  if (sectionData.has_disability === undefined || sectionData.has_disability === null) {
    errors.has_disability = 'Please indicate if you have a disability';
  }

  // If has disability, details are required
  if (sectionData.has_disability === true) {
    if (!isNotEmpty(sectionData.disability_details)) {
      errors.disability_details = 'Please specify your disability';
    }
  }

  // Political membership validation
  if (sectionData.has_political_membership === undefined || sectionData.has_political_membership === null) {
    errors.has_political_membership = 'Please indicate if you hold any political office';
  }

  // If has political membership, validate required fields
  if (sectionData.has_political_membership === true) {
    if (!isNotEmpty(sectionData.political_body)) {
      errors.political_body = 'Political party name is required';
    }
    
    if (!isNotEmpty(sectionData.political_party_position)) {
      errors.political_party_position = 'Political position is required';
    }
    
    if (!isNotEmpty(sectionData.political_party_expiry_date)) {
      errors.political_party_expiry_date = 'Political membership expiry date is required';
    }
  }

  // Professional membership validation
  if (sectionData.has_professional_membership === undefined || sectionData.has_professional_membership === null) {
    errors.has_professional_membership = 'Please indicate if you have professional membership';
  }

  // If has professional membership, validate required fields
  if (sectionData.has_professional_membership === true) {
    if (!isNotEmpty(sectionData.professional_body)) {
      errors.professional_body = 'Professional body name is required';
    }
    
    if (!isNotEmpty(sectionData.membership_number)) {
      errors.membership_number = 'Membership number is required';
    }
    
    if (!isNotEmpty(sectionData.expiry_date)) {
      errors.expiry_date = 'Professional membership expiry date is required';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Generic validation helper function
 * @param {Object} sectionData - Section data to validate
 * @param {Array} requiredFields - Array of required field names
 * @returns {Object} - Validation result
 */

/**
 * Validates Section C (Contact Details)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionC = (sectionData) => {
  const errors = {};
  
  // Required field validation
  const requiredFields = [
    { key: 'preferred_language', label: 'Preferred Language' },
    { key: 'cell_phone', label: 'Cell Phone Number' },
    { key: 'email', label: 'Email Address' },
    { key: 'residential_address', label: 'Residential Address' }
  ];

  // Check required fields
  requiredFields.forEach(field => {
    if (!sectionData[field.key] || sectionData[field.key].trim() === '') {
      errors[field.key] = `${field.label} is required`;
    }
  });

  // Enhanced validation for specific fields
  if (sectionData.email && sectionData.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sectionData.email.trim())) {
      errors.email = 'Please enter a valid email address';
    }
  }

  if (sectionData.cell_phone && sectionData.cell_phone.trim()) {
    // South African phone number validation (basic)
    const phoneRegex = /^(\+27|0)[6-8][0-9]{8}$/;
    const cleanPhone = sectionData.cell_phone.replace(/[\s-]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      errors.cell_phone = 'Please enter a valid South African cell phone number';
    }
  }

  if (sectionData.preferred_language && sectionData.preferred_language.trim()) {
    const validLanguages = [
      "English", "Afrikaans", "isiZulu", "isiXhosa", "Sepedi", 
      "Setswana", "Sesotho", "Xitsonga", "Tshivenda", "isiNdebele", "Siswati"
    ];
    if (!validLanguages.includes(sectionData.preferred_language)) {
      errors.preferred_language = 'Please select a valid language option';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
/**
 * Validates Section D (Driver's License)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */

/**
 * Validates Section E (Qualifications)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */

export const validateSectionD = (sectionData) => {
  const errors = {};
  
  // Required field validation
  const requiredFields = [
    { key: 'senior_qualification', label: 'Qualification Title' },
    { key: 'senior_institution', label: 'Institution Name' },
    { key: 'senior_nqf_level', label: 'NQF Level' },
    { key: 'senior_year_obtained', label: 'Year Obtained' }
  ];

  // Check required fields
  requiredFields.forEach(field => {
    if (!sectionData[field.key] || sectionData[field.key].toString().trim() === '') {
      errors[field.key] = `${field.label} is required`;
    }
  });

  // Enhanced validation for specific fields
  if (sectionData.senior_nqf_level && sectionData.senior_nqf_level.trim()) {
    const validNqfLevels = ['4', '5', '6', '7', '8', '9', '10'];
    if (!validNqfLevels.includes(sectionData.senior_nqf_level)) {
      errors.senior_nqf_level = 'Please select a valid NQF level';
    }
  }

  if (sectionData.senior_year_obtained && sectionData.senior_year_obtained.toString().trim()) {
    const currentYear = new Date().getFullYear();
    const year = parseInt(sectionData.senior_year_obtained);
    if (isNaN(year) || year < 1960 || year > currentYear) {
      errors.senior_year_obtained = `Please enter a valid year between 1960 and ${currentYear}`;
    }
  }

  // Validate qualifications array if it exists (for the dynamic qualifications)
  if (sectionData.qualifications && Array.isArray(sectionData.qualifications)) {
    sectionData.qualifications.forEach((qual, index) => {
      if (qual.qualification && !qual.institution) {
        errors[`qualifications_${index}_institution`] = `Institution is required for qualification ${index + 1}`;
      }
      if (qual.institution && !qual.qualification) {
        errors[`qualifications_${index}_qualification`] = `Qualification title is required for entry ${index + 1}`;
      }
      if (qual.year_obtained) {
        const year = parseInt(qual.year_obtained);
        if (isNaN(year) || year < 1960 || year > currentYear) {
          errors[`qualifications_${index}_year`] = `Invalid year for qualification ${index + 1}`;
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
 * Validates Section F (Work Experience)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionE = (sectionData) => {
  const errors = {};

  // Helper to validate non-empty values
  const isNotEmpty = (value) => value !== undefined && value !== null && value.toString().trim() !== '';

  // Validate Current Employment Details
  if (sectionData.is_currently_employed === 'yes') {
    if (!isNotEmpty(sectionData.current_employer_name)) {
      errors.current_employer_name = 'Please provide your current employer name';
    }

    if (!isNotEmpty(sectionData.current_employment_period)) {
      errors.current_employment_period = 'Please provide your current employment period';
    }

    if (
      sectionData.current_employer_name?.toLowerCase().trim() === 'city of polokwane'
    ) {
      if (!isNotEmpty(sectionData.current_designation)) {
        errors.current_designation = 'Please provide your current designation';
      }

      if (!isNotEmpty(sectionData.pay_number)) {
        errors.pay_number = 'Please provide your pay number';
      }
    }
  }

  // Validate Re-employment Restriction
  if (
    sectionData.has_reemployment_restriction === 'yes' &&
    !isNotEmpty(sectionData.previous_municipality_name)
  ) {
    errors.previous_municipality_name = 'Please provide the name of the previous municipality';
  }

  // Validate Senior Employment History
  if (Array.isArray(sectionData.senior_employment_history)) {
    sectionData.senior_employment_history.forEach((employer, index) => {
      const prefix = `senior_employment_history[${index}]`;

      if (!isNotEmpty(employer.employer_name)) {
        errors[`${prefix}.employer_name`] = 'Employer name is required';
      }

      if (!isNotEmpty(employer.position_held)) {
        errors[`${prefix}.position_held`] = 'Position held is required';
      }

      if (!isNotEmpty(employer.from_month) || !isNotEmpty(employer.from_year)) {
        errors[`${prefix}.from`] = 'Start month and year are required';
      }

      if (!isNotEmpty(employer.to_month) || !isNotEmpty(employer.to_year)) {
        errors[`${prefix}.to`] = 'End month and year are required';
      }

      if (!isNotEmpty(employer.reason_for_leaving)) {
        errors[`${prefix}.reason_for_leaving`] = 'Reason for leaving is required';
      }

      if (!isNotEmpty(employer.contact_person)) {
        errors[`${prefix}.contact_person`] = 'Contact person is required';
      }

      if (!isNotEmpty(employer.contact_number)) {
        errors[`${prefix}.contact_number`] = 'Contact number is required';
      }
    });
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
export const validateSectionF = (sectionData) => {
  const errors = {};
  
  // Helper to validate non-empty values
  const isNotEmpty = (value) => value !== undefined && value !== null && value.toString().trim() !== '';
  
  // Validate main disciplinary record question
  if (!isNotEmpty(sectionData.has_criminal_or_disciplinary_record)) {
    errors.has_criminal_or_disciplinary_record = 'Please indicate if you have been dismissed for misconduct';
  }
  
  // If dismissed for misconduct is "yes", all details are required
  if (sectionData.has_criminal_or_disciplinary_record === 'yes') {
    if (!isNotEmpty(sectionData.criminal_or_disciplinary_details)) {
      errors.criminal_or_disciplinary_details = 'Please provide the name of the municipality/institution';
    }
    
    if (!isNotEmpty(sectionData.misconduct_type)) {
      errors.misconduct_type = 'Please provide the type of misconduct/transgression';
    }
    
    if (!isNotEmpty(sectionData.misconduct_date)) {
      errors.misconduct_date = 'Please provide the date of resignation/disciplinary case finalized';
    }
    
    if (!isNotEmpty(sectionData.misconduct_sanction)) {
      errors.misconduct_sanction = 'Please provide the award/sanction';
    }
  }
  
  // Validate resignation pending disciplinary question
  if (!isNotEmpty(sectionData.resigned_pending_disciplinary)) {
    errors.resigned_pending_disciplinary = 'Please indicate if you resigned pending disciplinary proceedings';
  }
  
  // If resigned pending disciplinary is "yes", details are required
  if (sectionData.resigned_pending_disciplinary === 'yes') {
    if (!isNotEmpty(sectionData.disciplinary_details)) {
      errors.disciplinary_details = 'Please provide details about the resignation and pending disciplinary proceedings';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
/**
 * Validates Section G (Criminal Record)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionG = (sectionData) => {
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
 * Validates Section H (References)
 * @param {Object} sectionData - Section data
 * @returns {Object} - Validation result
 */
export const validateSectionH = (sectionData) => {
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
    
    if (!isNotEmpty(reference.telephone)) {
      errors[`reference_${i}_telephone`] = 'Please provide a telephone number';
    }
    
    if (!isNotEmpty(reference.email)) {
      errors[`reference_${i}_email`] = 'Please provide an email address';
    } else if (!isValidEmail(reference.email)) {
      errors[`reference_${i}_email`] = 'Please provide a valid email address';
    }
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
export const validateSectionI = (sectionData) => {
  const errors = {};  
  // Helper to validate non-empty values
  const isNotEmpty = (value) => value !== undefined && value !== null && value.toString().trim() !== '';
  
  // Declaration agreement is required (checkbox must be checked)
  if (!sectionData.declaration_accepted) {
    errors.declaration_accepted = 'You must agree to the declaration';
  }
  
  // Declaration date is required (though it's auto-set, still validate)
  if (!isNotEmpty(sectionData.declaration_date)) {
    errors.declaration_date = 'Declaration date is required';
  }
  
  // Electronic signature is required
  if (!isNotEmpty(sectionData.electronic_signature)) {
    errors.electronic_signature = 'Please provide your electronic signature (type your full name)';
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
    sectionA: validateSectionA(formData),
    sectionB: validateSectionB(formData),
    sectionC: validateSectionC(formData),
    sectionD: validateSectionD(formData),
    sectionE: validateSectionE(formData),
    sectionF: validateSectionF(formData),
    sectionG: validateSectionG(formData),
    sectionH: validateSectionH(formData),
    sectionI: validateSectionI(formData)
  };
  
  // Check if all sections are valid
  const isFormValid = Object.values(sectionResults).every(result => result.isValid);
  
  return {
    isValid: isFormValid,
    sectionResults
  };
};