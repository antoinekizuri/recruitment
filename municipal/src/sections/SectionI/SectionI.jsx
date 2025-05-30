import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";

export default function SectionI({ formData, handleChange, errors }) {
    const [showAddReference, setShowAddReference] = useState(false);
    const [showAddDocument, setShowAddDocument] = useState(false);

    const handleAddReference = () => {
        if (!formData.references) {
            handleChange({
                target: { name: "references", value: [] }
            });
        }

        handleChange({
            target: {
                name: "references",
                value: [
                    ...(formData.references || []),
                    {
                        name: "",
                        relationship: "",
                        office_phone: "",
                        cell_phone: "",
                        email: ""
                    }
                ]
            }
        });

        setShowAddReference(false);
    };

    const handleRemoveReference = (index) => {
        const updated = [...formData.references];
        updated.splice(index, 1);
        handleChange({ target: { name: "references", value: updated } });
    };

    const handleReferenceChange = (index, field, value) => {
        const updated = [...(formData.references || [])];
        updated[index] = { ...updated[index], [field]: value };
        handleChange({ target: { name: "references", value: updated } });
    };

    const handleAddDocument = () => {
        handleChange({
            target: {
                name: "supporting_documents",
                value: [
                    ...(formData.supporting_documents || []),
                    {
                        document_type: "",
                        description: "",
                        file: null
                    }
                ]
            }
        });
        setShowAddDocument(false);
    };

    const handleRemoveDocument = (index) => {
        const updated = [...(formData.supporting_documents || [])];
        updated.splice(index, 1);
        handleChange({ target: { name: "supporting_documents", value: updated } });
    };

    const handleDocumentChange = (index, field, value) => {
        const updated = [...(formData.supporting_documents || [])];
        updated[index] = { ...updated[index], [field]: value };
        handleChange({ target: { name: "supporting_documents", value: updated } });
    };

    const documentTypeOptions = [
        "ID Document/Passport",
        "Matric Certificate",
        "Diploma/Degree Certificate",
        "Professional Registration Certificate",
        "Driver's License",
        "Curriculum Vitae",
        "Employment Reference Letter",
        "Training Certificate",
        "Skills Certificate",
        "Other"
    ];

    return (
        <div className="section-container">
            <h2 className="section-title">I. REFERENCES & SUPPORTING DOCUMENTS</h2>

            {/* REFERENCES SECTION */}
            <div className="mb-12">
                <h3 className="subsection-heading">Professional References</h3>

                <p className="mb-6 text-sm text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    Please provide at least three professional references who can attest to your work performance and character.
                    It is preferable to include current or previous supervisors or managers.
                </p>

                {(formData.references || []).map((ref, index) => (
                    <div key={index} className="qualification-box mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-700">Reference {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => handleRemoveReference(index)}
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid-two-columns">
                                <TextInput
                                    label="Full Name"
                                    value={ref.name}
                                    onChange={(e) => handleReferenceChange(index, "name", e.target.value)}
                                    required={index < 3}
                                    tooltip="Full name of your reference"
                                />
                                <TextInput
                                    label="Relationship"
                                    value={ref.relationship}
                                    onChange={(e) => handleReferenceChange(index, "relationship", e.target.value)}
                                    required={index < 3}
                                    tooltip="Your professional relationship with this reference"
                                />
                            </div>

                            <div className="grid-two-columns">
                                <TextInput
                                    label="Telephone Number (Office Hours)"
                                    type="tel"
                                    value={ref.office_phone}
                                    onChange={(e) => handleReferenceChange(index, "office_phone", e.target.value)}
                                    required={index < 3}
                                    tooltip="Work contact number of your reference"
                                />
                                <TextInput
                                    label="Cell Phone Number"
                                    type="tel"
                                    value={ref.cell_phone}
                                    onChange={(e) => handleReferenceChange(index, "cell_phone", e.target.value)}
                                    tooltip="Mobile number of your reference"
                                />
                            </div>

                            <TextInput
                                label="Email Address"
                                type="email"
                                value={ref.email}
                                onChange={(e) => handleReferenceChange(index, "email", e.target.value)}
                                required={index < 3}
                                tooltip="Email address of your reference"
                            />
                        </div>
                    </div>
                ))}

                {showAddReference ? (
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleAddReference}
                            className="btn btn-primary ml-4"
                        >
                            + Confirm Add Reference
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowAddReference(false)}
                            className="btn btn-secondary mr-10"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowAddReference(true)}
                        className="btn btn-outline mt-6 mb-6"
                    >
                        + Add Reference
                    </button>
                )}

                {(formData.references || []).length === 0 && (
                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
                        <p className="text-sm text-yellow-800">
                            <span className="font-bold">Reminder:</span> You must provide at least three professional references.
                        </p>
                    </div>
                )}
            </div>

            {/* SUPPORTING DOCUMENTS SECTION */}
            <div className="border-t border-gray-200 pt-8">
                <h3 className="subsection-heading">Supporting Documents</h3>

                <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg">
                    <p className="text-sm text-green-800">
                        <span className="font-bold">Required Documents:</span> Please upload certified copies of all relevant documents.
                        Accepted formats: PDF, JPG, JPEG, PNG (Max size: 5MB per file)
                    </p>
                </div>
                {errors.supporting_documents && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                        <p className="text-sm text-red-600">{errors.supporting_documents}</p>
                    </div>
                )}
                {(formData.supporting_documents || []).map((doc, index) => (
                    <div key={index} className="qualification-box mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-700">Document {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => handleRemoveDocument(index)}
                                className="btn btn-danger"
                                // Prevent removing if it's the last document (optional - for better UX)
                                disabled={formData.supporting_documents?.length === 1}
                            >
                                Remove
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div className="grid-two-columns">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Document Type <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        value={doc.document_type}
                                        onChange={(e) => handleDocumentChange(index, "document_type", e.target.value)}
                                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${errors[`document_${index}_type`] ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                        required
                                    >
                                        <option value="">Select Document Type</option>
                                        {documentTypeOptions.map((type) => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                    {errors[`document_${index}_type`] && (
                                        <p className="mt-1 text-sm text-red-600">{errors[`document_${index}_type`]}</p>
                                    )}
                                </div>

                                <TextInput
                                    label="Description"
                                    value={doc.description}
                                    onChange={(e) => handleDocumentChange(index, "description", e.target.value)}
                                    placeholder="Brief description of the document"
                                    tooltip="Provide a brief description to help identify this document"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Upload Document <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => handleDocumentChange(index, "file", e.target.files[0])}
                                        className={`w-full px-3 py-2 border-2 border-dashed rounded-lg hover:border-blue-400 focus:border-blue-500 focus:outline-none transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 ${errors[`document_${index}_file`] ? 'border-red-300' : 'border-gray-300'
                                            }`}
                                        required
                                    />
                                </div>
                                {errors[`document_${index}_file`] && (
                                    <p className="mt-1 text-sm text-red-600">{errors[`document_${index}_file`]}</p>
                                )}
                                {doc.file && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-3 h-3 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-sm font-medium text-gray-700 truncate">
                                                    {doc.file.name}
                                                </span>
                                            </div>
                                            <span className="text-xs text-gray-500">
                                                {(doc.file.size / 1024 / 1024).toFixed(2)} MB
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Update the add document section */}
                {showAddDocument ? (
                    <div className="flex items-center gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleAddDocument}
                            className="btn btn-primary mr-2"
                        >
                            + Confirm Add Document
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowAddDocument(false)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowAddDocument(true)}
                        className="btn btn-outline mt-6"
                    >
                        + Add {(formData.supporting_documents || []).length === 0 ? 'Required Document' : 'Another Document'}
                    </button>
                )}

                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-800 mb-2">Document Checklist:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                        <li>Certified copy of ID document or passport</li>
                        <li>Certified copies of all educational qualifications</li>
                        <li>Professional registration certificates (if applicable)</li>
                        <li>Driver's license (if required for the position)</li>
                        <li>Updated curriculum vitae</li>
                        <li>Any other relevant certificates or documents</li>
                    </ul>
                </div>
            </div>

            <div className="section-note mt-8">
                <p className="text-sm text-blue-800">
                    <span className="font-bold">Important:</span> Please ensure all references have consented to be contacted and all documents are certified copies.
                    The City of Polokwane reserves the right to verify all information provided. Falsified information may result in disqualification
                    from the recruitment process or termination of employment if discovered after appointment.
                </p>
            </div>
        </div>
    );
}