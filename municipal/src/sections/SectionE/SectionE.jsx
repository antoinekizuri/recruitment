import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";
import SelectInput from "../../components/users/SelectInput/SelectInput";
import "./SectionE.css";

export default function SectionE({ formData, handleChange }) {
    const [showAddQualification, setShowAddQualification] = useState(false);

    const nqfLevelOptions = [
        { value: "", label: "Select NQF Level" },
        { value: "1", label: "NQF Level 1" },
        { value: "2", label: "NQF Level 2" },
        { value: "3", label: "NQF Level 3" },
        { value: "4", label: "NQF Level 4 (Matric/Grade 12)" },
        { value: "5", label: "NQF Level 5 (Higher Certificate)" },
        { value: "6", label: "NQF Level 6 (Diploma/Advanced Certificate)" },
        { value: "7", label: "NQF Level 7 (Bachelor's Degree/Advanced Diploma)" },
        { value: "8", label: "NQF Level 8 (Honours Degree/Postgraduate Diploma)" },
        { value: "9", label: "NQF Level 9 (Master's Degree)" },
        { value: "10", label: "NQF Level 10 (Doctoral Degree)" }
    ];

    const currentYear = new Date().getFullYear();
    const yearOptions = [
        { value: "", label: "Select Year" },
        ...Array.from({ length: currentYear - 1959 }, (_, i) => {
            const year = currentYear - i;
            return { value: year.toString(), label: year.toString() };
        })
    ];

    const handleAddQualification = () => {
        handleChange({
            target: {
                name: "qualifications",
                value: [
                    ...(formData.qualifications || []),
                    { qualification: "", institution: "", nqf_level: "", year_obtained: "" }
                ]
            }
        });
        setShowAddQualification(false);
    };

    const handleRemoveQualification = (index) => {
        const updatedQualifications = [...formData.qualifications];
        updatedQualifications.splice(index, 1);
        handleChange({ target: { name: "qualifications", value: updatedQualifications } });
    };

    const handleQualificationChange = (index, field, value) => {
        const updatedQualifications = [...(formData.qualifications || [])];
        updatedQualifications[index] = { ...updatedQualifications[index], [field]: value };
        handleChange({ target: { name: "qualifications", value: updatedQualifications } });
    };

    return (
        <div className="section-container">
            <h2 className="section-title">E. QUALIFICATIONS</h2>

            <div className="mb-6">
                <h3 className="subsection-heading">Highest School Qualification</h3>
                <div className="grid-two-columns mb-4">
                    <SelectInput
                        label="Highest Grade Completed"
                        name="highest_school_grade"
                        value={formData.highest_school_grade}
                        onChange={handleChange}
                        required
                        options={[
                            { value: "", label: "Select Grade" },
                            { value: "Grade 7", label: "Grade 7" },
                            { value: "Grade 8", label: "Grade 8" },
                            { value: "Grade 9", label: "Grade 9" },
                            { value: "Grade 10", label: "Grade 10" },
                            { value: "Grade 11", label: "Grade 11" },
                            { value: "Grade 12", label: "Grade 12/Matric" }
                        ]}
                        tooltip="Your highest completed school grade"
                    />

                    <TextInput
                        label="Name of School"
                        name="school_name"
                        value={formData.school_name}
                        onChange={handleChange}
                        required
                        tooltip="The name of the school where you obtained your highest school qualification"
                    />
                </div>

                <SelectInput
                    label="Year Completed"
                    name="school_year_completed"
                    value={formData.school_year_completed}
                    onChange={handleChange}
                    required
                    options={yearOptions}
                    tooltip="The year in which you completed your highest school qualification"
                />
            </div>

            <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="subsection-heading">Tertiary/Technical Qualifications</h3>

                {(formData.qualifications || []).map((q, index) => (
                    <div key={index} className="qualification-box mb-4">
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium text-gray-700">Qualification {index + 1}</h4>
                            <button
                                type="button"
                                onClick={() => handleRemoveQualification(index)}
                                className="btn btn-danger"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="space-y-4">
                            <TextInput
                                label="Qualification Name"
                                value={q.qualification}
                                onChange={(e) => handleQualificationChange(index, "qualification", e.target.value)}
                                tooltip="Name/title of the qualification"
                            />

                            <TextInput
                                label="Institution Name"
                                value={q.institution}
                                onChange={(e) => handleQualificationChange(index, "institution", e.target.value)}
                                tooltip="Institution where you obtained the qualification"
                            />

                            <div className="grid-two-columns">
                                <SelectInput
                                    label="NQF Level"
                                    value={q.nqf_level}
                                    onChange={(e) => handleQualificationChange(index, "nqf_level", e.target.value)}
                                    options={nqfLevelOptions}
                                    tooltip="National Qualifications Framework level"
                                />
                                <SelectInput
                                    label="Year Obtained"
                                    value={q.year_obtained}
                                    onChange={(e) => handleQualificationChange(index, "year_obtained", e.target.value)}
                                    options={yearOptions}
                                    tooltip="Year the qualification was obtained"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {showAddQualification ? (
                    <div className="flex items-center gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleAddQualification}
                            className="btn ml-4 btn-primary"
                        >
                            + Confirm Add Qualification
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowAddQualification(false)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() => setShowAddQualification(true)}
                        className="btn btn-outline mt-4"
                    >
                        + Add Qualification
                    </button>
                )}

            </div>

            <div className="section-note">
                <p className="text-sm text-blue-800">
                    <span className="font-bold">Note:</span> You will be required to upload certified copies
                    of all qualifications in Section I (Supporting Documents). The City of Polokwane reserves 
                    the right to verify all qualifications with the relevant institutions.
                </p>
            </div>
        </div>
    );
}