/**
 * Form constants and configuration
 */

// Form section information
export const FORM_SECTIONS = [
  {
    id: 'sectionA',
    title: 'Position Applied For',
    description: 'Details about the position you are applying for'
  },
  {
    id: 'sectionB',
    title: 'Personal Details',
    description: 'Your personal information and identification details'
  },
  {
    id: 'sectionC',
    title: 'Contact Details',
    description: 'Your contact information and addresses'
  },
  {
    id: 'sectionD',
    title: 'Qualifications',
    description: 'Your educational background and qualifications'
  },
  {
    id: 'sectionE',
    title: 'Work Experience',
    description: 'Your employment history and experience'
  },
  {
    id: 'sectionF',
    title: 'Disciplinary Record',
    description: 'Information about any disciplinary proceedings'
  },
  {
    id: 'sectionG',
    title: 'Criminal Record',
    description: 'Information about any criminal records'
  },
  {
    id: 'sectionH',
    title: 'References',
    description: 'Professional references who can vouch for you'
  },
  {
    id: 'sectionI',
    title: 'Declaration',
    description: 'Confirmation of the accuracy of information provided'
  }
];

// Form field options
export const FIELD_OPTIONS = {
  race: [
    { value: 'african', label: 'African' },
    { value: 'coloured', label: 'Coloured' },
    { value: 'indian', label: 'Indian' },
    { value: 'white', label: 'White' },
    { value: 'other', label: 'Other' }
  ],
  
  gender: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' }
  ],
  
  preferred_language: [
    { value: 'english', label: 'English' },
    { value: 'afrikaans', label: 'Afrikaans' },
    { value: 'sepedi', label: 'Sepedi' },
    { value: 'sesotho', label: 'Sesotho' },
    { value: 'setswana', label: 'Setswana' },
    { value: 'siswati', label: 'siSwati' },
    { value: 'tshivenda', label: 'Tshivenda' },
    { value: 'xitsonga', label: 'Xitsonga' },
    { value: 'isindebele', label: 'isiNdebele' },
    { value: 'isixhosa', label: 'isiXhosa' },
    { value: 'isizulu', label: 'isiZulu' }
  ],
  
  license_codes: [
    { value: 'none', label: 'None' },
    { value: 'a', label: 'A' },
    { value: 'a1', label: 'A1' },
    { value: 'b', label: 'B' },
    { value: 'c', label: 'C' },
    { value: 'c1', label: 'C1' },
    { value: 'eb', label: 'EB' },
    { value: 'ec', label: 'EC' },
    { value: 'ec1', label: 'EC1' }
  ],
  
  yes_no: [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ],
  
  highest_school_grade: [
    { value: 'grade8', label: 'Grade 8' },
    { value: 'grade9', label: 'Grade 9' },
    { value: 'grade10', label: 'Grade 10' },
    { value: 'grade11', label: 'Grade 11' },
    { value: 'grade12', label: 'Grade 12 / Matric' }
  ],
  
  nqf_levels: [
    { value: 'level1', label: 'NQF Level 1' },
    { value: 'level2', label: 'NQF Level 2' },
    { value: 'level3', label: 'NQF Level 3' },
    { value: 'level4', label: 'NQF Level 4' },
    { value: 'level5', label: 'NQF Level 5' },
    { value: 'level6', label: 'NQF Level 6' },
    { value: 'level7', label: 'NQF Level 7' },
    { value: 'level8', label: 'NQF Level 8' },
    { value: 'level9', label: 'NQF Level 9' },
    { value: 'level10', label: 'NQF Level 10' }
  ],
  
  relationship_types: [
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'colleague', label: 'Colleague' },
    { value: 'client', label: 'Client' },
    { value: 'academic', label: 'Academic Reference' },
    { value: 'personal', label: 'Personal Reference' }
  ]
};

// Acceptable file types for uploads
export const ACCEPTABLE_FILE_TYPES = {
  documents: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  images: [
    'image/jpeg',
    'image/png',
    'image/gif'
  ],
  all: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
    'image/gif'
  ]
};

// Maximum file size in MB
export const MAX_FILE_SIZE_MB = 5;

// Declaration text
export const DECLARATION_TEXT = `
I hereby declare that all the information provided in this application form is true, correct, and complete to the best of my knowledge and belief. I understand that any false statement or omission of material facts may lead to disqualification from the selection process or, if appointed, to disciplinary action which may include dismissal.

I authorize the City of Polokwane to verify all information provided in this application and to contact the references listed. I understand that the information collected during the recruitment process will be used for employment-related purposes only and in accordance with relevant data protection laws.

I confirm that I have not been dismissed from employment for misconduct or poor performance in the last twelve months, and I am not subject to any restrictions preventing me from being employed by a municipality.

If appointed, I agree to abide by the policies, procedures, and Code of Conduct of the City of Polokwane.
`;