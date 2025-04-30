import React from 'react';
import { cn } from '@/lib/utils';

interface Step {
  id: number;
  label: string;
}

interface ProgressStepsProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  steps, 
  currentStep,
  className
}) => {
  return (
    <div className={cn("mb-8", className)}>
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-8 h-8 rounded-full text-white",
                index <= currentStep 
                  ? "bg-primary-500" 
                  : "bg-slate-700 text-slate-400"
              )}>
                {step.id}
              </div>
              <div className="ml-2">
                <p className={cn(
                  "text-sm font-medium",
                  index > currentStep && "text-slate-400"
                )}>
                  {step.label}
                </p>
              </div>
            </div>
            
            {/* Connector line (except after the last step) */}
            {index < steps.length - 1 && (
              <div className="w-20 h-1 bg-slate-700">
                <div 
                  className="h-full bg-primary-500" 
                  style={{ 
                    width: `${
                      index < currentStep 
                        ? '100%' 
                        : index === currentStep 
                          ? '50%' 
                          : '0%'
                    }`
                  }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressSteps;
