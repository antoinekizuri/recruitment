import './FormStepper.css';

export default function FormStepper({ sections, currentSection, setCurrentSection }) {
    const isStepAccessible = (index) => {
        return index <= currentSection;
    };

    return (
        <div className="stepper-container">
            {/* Desktop View */}
            <div className="stepper-desktop">
                {sections.map((section, index) => {
                    const isCompleted = index < currentSection;
                    const isCurrent = index === currentSection;
                    const isLocked = index > currentSection;

                    return (
                        <div
                            key={section.id}
                            className={`stepper-step ${isLocked ? 'stepper-locked' : ''}`}
                            onClick={() => {
                                if (isStepAccessible(index)) setCurrentSection(index);
                            }}
                        >
                            <div
                                className={`stepper-circle ${isCurrent
                                    ? 'stepper-current'
                                    : isCompleted
                                        ? 'stepper-completed'
                                        : 'stepper-upcoming'
                                    }`}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    <span>{index + 1}</span>
                                )}
                            </div>
                            <span className={`stepper-label ${isCurrent ? 'active' : ''}`}>
                                {section.title}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Mobile View */}
            <div className="stepper-mobile">
                <div className="stepper-mobile-buttons">
                    <button
                        className="stepper-btn stepper-btn-secondary"
                        onClick={() => currentSection > 0 && setCurrentSection(currentSection - 1)}
                        disabled={currentSection === 0}
                    >
                        Previous
                    </button>
                    <span className="text-gray-700">
                        Section {currentSection + 1} of {sections.length}
                    </span>
                    <button
                        className="stepper-btn"
                        onClick={() =>
                            currentSection < sections.length - 1 &&
                            setCurrentSection(currentSection + 1)
                        }
                        disabled={currentSection === sections.length - 1}
                    >
                        Next
                    </button>
                </div>

                {sections[currentSection] && (
                    <h2 className="text-center text-lg font-bold text-blue-800">
                        {sections[currentSection].title}
                    </h2>
                )}
            </div>
        </div>
    );
}
