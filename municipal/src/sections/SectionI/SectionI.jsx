import React, { useState } from "react";
import TextInput from "../../components/users/TextInput/TextInput";

export default function SectionI({ formData, handleChange }) {
    const [showAddReference, setShowAddReference] = useState(false);

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
                        telephone: "",
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

    return (
        <div className="pt-4 pb-8 mb-8 border-b border-gray-200">
            <h2 className="text-xl font-bold text-blue-900 mb-6">I. REFERENCES</h2>

            <p className="mb-6 text-sm text-gray-700">
                Please provide at least three professional references who can attest to your work performance and character.
                It is preferable to include current or previous supervisors or managers.
            </p>

            {(formData.references || []).map((ref, index) => (
                <div key={index} className="mb-6 p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                    <div className="flex justify-between items-center mb-4">
                        <h4 className="text-base font-semibold text-gray-700">Reference {index + 1}</h4>
                        <button
                            type="button"
                            onClick={() => handleRemoveReference(index)}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                        >
                            Remove
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
            ))}

            {showAddReference ? (
                <div className="flex flex-wrap gap-3 mt-6">
                    <button
                        type="button"
                        onClick={handleAddReference}
                        className="btn btn-primary"
                    >
                        Confirm Add Reference
                    </button>

                    <button
                        type="button"
                        onClick={() => setShowAddReference(false)}
                        className="btn btn-secondary"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <button
                    type="button"
                    onClick={() => setShowAddReference(true)}
                    className="btn btn-outline mt-6"
                >
                    + Add Reference
                </button>
            )}




            <div className="section-note mt-6">
                <p className="text-sm text-blue-800">
                    <span className="font-bold">Note:</span> Please confirm your references have consented. Falsified information may disqualify your application.
                </p>
            </div>

            {(formData.references || []).length === 0 && (
                <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg shadow-sm">
                    <p className="text-sm text-yellow-800">
                        <span className="font-bold">Reminder:</span> You must provide at least three professional references.
                    </p>
                </div>
            )}
        </div>
    );
}
