'use client';

import React from 'react';
import { Check, User, Wrench, ClipboardCheck } from 'lucide-react';

interface StepperProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'ព័ត៌មានការកក់', labelEn: 'Personal Info', icon: User },
  { number: 2, label: 'ជ្រើសរើសសេវា', labelEn: 'Select Service', icon: Wrench },
  { number: 3, label: 'បញ្ជាក់ការកក់', labelEn: 'Confirmation', icon: ClipboardCheck },
];

export default function Stepper({ currentStep }: StepperProps) {
  return (
    <div className="flex items-center justify-center w-full max-w-lg mx-auto py-4 px-2">
      {steps.map((step, index) => {
        const Icon = step.icon;
        const isCompleted = currentStep > step.number;
        const isActive = currentStep === step.number;

        return (
          <React.Fragment key={step.number}>
            {/* Step node */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              {/* Circle */}
              <div className={`
                                relative w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-300
                                ${isCompleted ? 'bg-gradient-to-br from-green-400 to-green-600'
                  : isActive ? 'bg-gradient-to-br from-[#DC2626] to-[#F97316] scale-110 shadow-red-200'
                    : 'bg-gray-100'}
                            `}>
                {isCompleted
                  ? <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  : <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                }
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#DC2626] to-[#F97316] opacity-25 animate-ping" />
                )}
              </div>

              {/* Label */}
              <div className="text-center w-20">
                <p className={`text-[10px] font-black leading-tight
                                    ${isActive ? 'text-[#DC2626]' : isCompleted ? 'text-green-600' : 'text-gray-400'}`}>
                  {step.label}
                </p>
                <p className={`text-[9px] font-semibold hidden sm:block
                                    ${isActive ? 'text-orange-400' : isCompleted ? 'text-green-400' : 'text-gray-300'}`}>
                  {step.labelEn}
                </p>
              </div>
            </div>

            {/* Connector */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 mb-5 h-0.5 rounded-full bg-gray-200 overflow-hidden">
                <div className={`h-full rounded-full transition-all duration-700
                                    ${currentStep > step.number ? 'w-full bg-gradient-to-r from-green-400 to-green-500' : 'w-0'}`}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}