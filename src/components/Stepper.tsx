import { Check } from './Icons';
import { cn } from './ui/utils';

interface Step {
  id: string;
  label: string;
  description?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  completedSteps?: number[];
}

export function Stepper({ steps, currentStep, onStepClick, completedSteps = [] }: StepperProps) {
  return (
    <div className="w-full py-4 md:py-8 overflow-x-auto md:overflow-hidden scroll-smooth scrollbar-hide touch-pan-x">
      <div className="relative w-full">
        <div 
          className="flex items-center transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(calc(50% - ${100 + currentStep * 200}px))`
          }}
        >
          {steps.map((step, index) => {
            const isCompleted = completedSteps.includes(index) || index < currentStep;
            const isCurrent = index === currentStep;
            const isClickable = !!onStepClick; // Разрешаем клик на любой шаг

            return (
              <div key={step.id} className="flex items-center shrink-0" style={{ width: '200px' }}>
                {/* Step Circle with Label - центрируем в контейнере 200px */}
                <div className="flex flex-col items-center w-full">
                  {/* Линии слева и справа от круга */}
                  <div className="flex items-center w-full justify-center relative">
                    {/* Left Line - фиксированная ширина */}
                    <div 
                      className={cn(
                        "h-0.5 absolute right-1/2 transition-colors duration-300",
                        index > 0 && index <= currentStep ? "bg-gray-900" : "bg-gray-300"
                      )}
                      style={{ width: '68px', visibility: index === 0 ? 'hidden' : 'visible' }}
                    />

                    {/* Step Circle */}
                    <button
                      onClick={() => isClickable && onStepClick?.(index)}
                      disabled={!isClickable}
                      type="button"
                      className={cn(
                        "shrink-0 z-10 relative outline-none transition-transform duration-200",
                        isClickable ? "cursor-pointer hover:scale-105" : "cursor-default"
                      )}
                    >
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 relative bg-white",
                          isCompleted && "bg-gray-900 border-gray-900 scale-110",
                          isCurrent && "border-gray-900 bg-white shadow-lg scale-110 ring-4 ring-gray-900/10",
                          !isCompleted && !isCurrent && "border-gray-300 bg-white",
                          isClickable && !isCurrent && "hover:border-gray-700 hover:shadow-md"
                        )}
                      >
                        {isCompleted && !isCurrent ? (
                          <Check className="w-6 h-6 text-white" />
                        ) : (
                          <span
                            className={cn(
                              "text-base transition-colors",
                              isCurrent && "text-gray-900",
                              isCompleted && !isCurrent && "text-white",
                              !isCompleted && !isCurrent && "text-gray-400"
                            )}
                          >
                            {index + 1}
                          </span>
                        )}
                      </div>
                    </button>

                    {/* Right Line - фиксированная ширина */}
                    <div 
                      className={cn(
                        "h-0.5 absolute left-1/2 transition-colors duration-300",
                        index < currentStep ? "bg-gray-900" : "bg-gray-300"
                      )}
                      style={{ width: '68px', visibility: index === steps.length - 1 ? 'hidden' : 'visible' }}
                    />
                  </div>

                  {/* Label под кругом */}
                  <div className="flex flex-col items-center text-center mt-2">
                    <span
                      className={cn(
                        "text-sm transition-all duration-300 whitespace-nowrap",
                        (isCompleted || isCurrent) && "text-gray-900",
                        isCurrent && "scale-105",
                        !isCompleted && !isCurrent && "text-gray-500"
                      )}
                    >
                      {step.label}
                    </span>
                    {step.description && (
                      <span className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                        {step.description}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}