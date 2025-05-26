/**
 * Form helper utility functions
 */
import { FORM_SECTIONS } from '../constants/formConstants';

/**
 * Formats date from YYYY-MM-DD to DD/MM/YYYY
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

/**
 * Formats date from DD/MM/YYYY to YYYY-MM-DD
 * @param {string} dateString - Date string in DD/MM/YYYY format
 * @returns {string} - Formatted date string for input fields
 */
export const formatDateForInput = (dateString) => {
  if (!dateString) return '';
  
  const [day, month, year] = dateString.split('/');
  return `${year}-${month}-${day}`;
};

/**
 * Formats a phone number to standard format
 * @param {string} phoneNumber - Raw phone number
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Format based on whether it starts with country code or not
  if (cleaned.startsWith('27')) {
    return `+27 ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
  } else if (cleaned.startsWith('0')) {
    return `0${cleaned.substring(1, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7)}`;
  }
  
  return phoneNumber;
};

/**
 * Creates an empty form state with all required fields
 * @returns {Object} - Initial form state
 */
export const createInitialFormState = () => {
  return {
    // Section A (Position Applied For) - typically pre-filled from job post
    sectionA: {
      position_title: '',
      directorate: '',
      department: '',
      division: '',
      reference_number: '',
      notice_service_period: '',
      municipality_entity: '',
      advertisements: [] // If applicable
    },
    
    // Section B (Personal Details)
    sectionB: {
      surname: '',
      first_names: '',
      id_number: '',
      race: '',
      gender: '',
      has_disability: 'no',
      disability_details: '',
      disability_document: null,
      is_south_african: 'yes',
      nationality: '',
      work_permit_number: '',
      has_professional_membership: 'no',
      membership_number: '',
      MembershipExpiryDate: '',
      professional_body: '',
    },
    
    // Section C (Contact Details)
    sectionC: {
      preferred_language: '',
      cell_phone: '',
      alternative_number: '',
      email: '',
      residential_address: '',
      postal_address: '',
      postal_code: ''
    },
    
    // Section D (Driver's License)
    sectionD: {
      license_codes: '',
      license_expiry_date: '',
      has_pdp: 'no',
      pdp_expiry_date: ''
    },
    
    // Section E (Qualifications)
    sectionE: {
      highest_school_grade: '',
      school_name: '',
      school_year_completed: '',
      tertiary_qualifications: [],
      current_study: {
        institution: '',
        qualification: '',
        year_of_study: '',
        expected_completion: ''
      }
    },
    
    // Section F (Work Experience)
sectionF: {
  is_currently_employed: 'no',
  current_employer_name: '',
  current_employer_address: '',
  current_employment_period: '',
  current_designation: '',
  pay_number: '',
  reasons_for_leaving: '',
  has_reemployment_restriction: 'no',
  previous_municipality_name: '',
  previous_employers: [] // Changed from previous_employment
},
    
    // Section G (Disciplinary Record)
    sectionG: {
      dismissed_for_misconduct: 'no',
      misconduct_institution: '',
      misconduct_type: '',
      misconduct_date: '',
      misconduct_sanction: '',
      resigned_pending_disciplinary: 'no',
      disciplinary_details: ''
    },
    
    // Section H (Criminal Record)
    sectionH: {
      has_criminal_record: 'no',
      criminal_act_type: '',
      criminal_case_date: '',
      criminal_case_outcome: ''
    },
    
    // Section I (References)
sectionI: {
  references: [
    { name: '', relationship: '', telephone: '', cell_phone: '', email: '' },
    { name: '', relationship: '', telephone: '', cell_phone: '', email: '' },
    { name: '', relationship: '', telephone: '', cell_phone: '', email: '' }
  ]
},
    
    // Section J (Declaration)
    sectionJ: {
      declaration_agreed: false,
      declaration_date: '',
      electronic_signature: ''
    }
  };
};

/**
 * Scrolls to the specified element with smooth animation
 * @param {string} elementId - ID of the element to scroll to
 */
export const scrollToElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
};

/**
 * Formats form data for submission to API
 * @param {Object} formData - Complete form data
 * @returns {Object} - Formatted data ready for submission
 */
export const prepareFormDataForSubmission = (formData) => {
  // Create a copy of form data to avoid mutations
  const formattedData = JSON.parse(JSON.stringify(formData));
  
  // Format dates for API (if needed)
  if (formattedData.sectionD.license_expiry_date) {
    formattedData.sectionD.license_expiry_date = formatDate(formattedData.sectionD.license_expiry_date);
  }
  
  if (formattedData.sectionD.pdp_expiry_date) {
    formattedData.sectionD.pdp_expiry_date = formatDate(formattedData.sectionD.pdp_expiry_date);
  }
  
  if (formattedData.sectionG.misconduct_date) {
    formattedData.sectionG.misconduct_date = formatDate(formattedData.sectionG.misconduct_date);
  }
  
  if (formattedData.sectionH.criminal_case_date) {
    formattedData.sectionH.criminal_case_date = formatDate(formattedData.sectionH.criminal_case_date);
  }
  
  if (formattedData.sectionJ.declaration_date) {
    formattedData.sectionJ.declaration_date = formatDate(formattedData.sectionJ.declaration_date);
  }
  
  // Format phone numbers
  formattedData.sectionC.cell_phone = formatPhoneNumber(formattedData.sectionC.cell_phone);
  if (formattedData.sectionC.alternative_number) {
    formattedData.sectionC.alternative_number = formatPhoneNumber(formattedData.sectionC.alternative_number);
  }
  
  return formattedData;
};

/**
 * Creates a tertiary qualification object
 * @returns {Object} - Empty tertiary qualification object
 */
export const createEmptyQualification = () => {
  return {
    institution: '',
    qualification: '',
    field_of_study: '',
    nqf_level: '',
    year_completed: ''
  };
};

/**
 * Creates an empty work experience object
 * @returns {Object} - Empty work experience object
 */
export const createEmptyWorkExperience = () => {
  return {
    employer_name: '',
    position_held: '',
    start_date: '',
    end_date: '',
    reason_for_leaving: '',
    relevant_achievements: ''
  };
};

/**
 * Creates an empty reference object
 * @returns {Object} - Empty reference object
 */
export const createEmptyReference = () => {
  return {
    name: '',
    relationship: '',
    telephone: '',
    email: ''
  };
};

/**
 * Adds file type validation
 * @param {File} file - File to validate
 * @param {Array} allowedTypes - Array of allowed MIME types
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {Object} - Validation result with status and message
 */
export const validateFile = (file, allowedTypes, maxSizeMB = 5) => {
  if (!file) {
    return { valid: false, message: 'No file selected' };
  }
  
  // Check file type
  if (!allowedTypes.includes(file.type)) {
    return { 
      valid: false, 
      message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}` 
    };
  }
  
  // Check file size (convert MB to bytes)
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { 
      valid: false, 
      message: `File too large. Maximum size: ${maxSizeMB}MB` 
    };
  }
  
  return { valid: true, message: 'File is valid' };
};

/**
 * Handles section navigation
 * @param {number} currentSection - Current section index
 * @param {number} totalSections - Total number of sections
 * @param {Function} setCurrentSection - State setter for current section
 * @param {Function} validateCurrentSection - Function to validate current section
 * @returns {Object} - Navigation handlers
 */
export const getSectionNavigationHandlers = (
  currentSection,
  totalSections,
  setCurrentSection,
  validateCurrentSection
) => {
  const goToNextSection = () => {
    const validationResult = validateCurrentSection();
    if (validationResult.isValid && currentSection < totalSections - 1) {
      setCurrentSection(currentSection + 1);
      scrollToElement('form-container-top');
    }
  };
  
  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
      scrollToElement('form-container-top');
    }
  };
  
  const jumpToSection = (sectionIndex) => {
    // Only allow jumping to sections that are already completed or the next section
    if (sectionIndex <= currentSection + 1) {
      setCurrentSection(sectionIndex);
      scrollToElement('form-container-top');
    }
  };
  return {
    goToNextSection,
    goToPreviousSection,
    jumpToSection

  };
};
  /**
 * Gets the title for a given section ID from FORM_SECTIONS
 * @param {string} sectionId
 * @returns {string}
 */
export const getSectionTitle = (sectionId) => {
  const section = FORM_SECTIONS.find((s) => s.id === sectionId);
  return section ? section.title : '';
};

/**
 * Gets the description for a given section ID from FORM_SECTIONS
 * @param {string} sectionId
 * @returns {string}
 */
export const getSectionDescription = (sectionId) => {
  const section = FORM_SECTIONS.find((s) => s.id === sectionId);
  return section ? section.description : '';
};