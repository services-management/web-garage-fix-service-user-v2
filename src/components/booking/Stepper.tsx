import React from 'react';

interface StepperProps {
  currentStep: number;
}

export default function Stepper({ currentStep }: StepperProps) {
  const steps = [
    { number: 1, label: 'ព័ត៌មានផ្ទាល់ខ្លួន', shortLabel: 'ព័ត៌មាន' },
    { number: 2, label: 'ជ្រើសរើសសេវាកម្ម', shortLabel: 'សេវាកម្ម' },
    { number: 3, label: 'បញ្ជាក់ការកក់', shortLabel: 'បញ្ជាក់' }
  ];

  return (
    <div className="mb-6 sm:mb-8">
      {/* Desktop Stepper */}
      <div className="hidden md:flex justify-between items-center max-w-7xl mx-auto px-4 my-3">
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <div className={`flex items-center ${currentStep !== step.number ? 'opacity-50' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                currentStep === step.number
                  ? 'bg-red-700 text-white'
                  : currentStep > step.number
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-600'
              }`}>
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span className={`ml-3 ${currentStep === step.number ? 'font-semibold' : 'text-gray-500'}`}>
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 ${currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Stepper */}
      <div className="md:hidden flex justify-center items-center gap-4 px-4">
        {steps.map((step) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
              currentStep === step.number
                ? 'bg-red-700 text-white'
                : currentStep > step.number
                ? 'bg-green-500 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              {currentStep > step.number ? '✓' : step.number}
            </div>
            <span className={`text-xs text-center ${currentStep === step.number ? 'font-semibold' : 'text-gray-500'}`}>
              {step.shortLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}