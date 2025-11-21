import { useState, useEffect } from "react";
import "./styles/globals.css";
import "./components/suppress-r3f-warnings";
import { HeroSection } from "./components/HeroSection";
import { StepperWorkflow } from "./components/StepperWorkflow";
import { PackagesSection } from "./components/PackagesSection";
import { FloatingCalculator } from "./components/FloatingCalculator";
import { TopButtons } from "./components/TopButtons";
import { calculateTotal, calculateBreakdown } from "./components/calculationUtils";

export default function App() {
  useEffect(() => {
    const originalPostMessage = Worker.prototype.postMessage;
    Worker.prototype.postMessage = function (...args) {
      try {
        return originalPostMessage.apply(this, args);
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === "DataCloneError" ||
            error.message.includes("out of memory") ||
            error.message.includes("cannot be cloned"))
        ) {
          return;
        }
        throw error;
      }
    };

    const handleError = (event: ErrorEvent) => {
      if (
        event.message &&
        (event.message.includes("DataCloneError") ||
          event.message.includes("postMessage") ||
          event.message.includes("hls.js") ||
          event.message.includes("out of memory") ||
          event.message.includes("esm.sh/hls") ||
          event.message.includes("cannot be cloned") ||
          event.message.includes("DedicatedWorkerGlobalScope"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }

      if (
        event.error instanceof Error &&
        (event.error.name === "DataCloneError" ||
          event.error.message.includes("out of memory") ||
          event.error.message.includes("cannot be cloned"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const message = event.reason?.message || String(event.reason);
      if (
        message &&
        (message.includes("DataCloneError") ||
          message.includes("postMessage") ||
          message.includes("hls.js") ||
          message.includes("out of memory") ||
          message.includes("esm.sh/hls") ||
          message.includes("cannot be cloned") ||
          message.includes("DedicatedWorkerGlobalScope"))
      ) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        return false;
      }
    };

    window.addEventListener("error", handleError, true);
    window.addEventListener("unhandledrejection", handleUnhandledRejection, true);

    return () => {
      window.removeEventListener("error", handleError, true);
      window.removeEventListener("unhandledrejection", handleUnhandledRejection, true);
      Worker.prototype.postMessage = originalPostMessage;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialFormData = {
    serviceType: "burial",
    hasHall: true,
    hallDuration: 60,
    ceremonyType: "civil",
    confession: "",
    ceremonyOrder: "civil-first",
    cemetery: "",
    selectedSlot: "",
    needsHearse: true,
    hearseRoute: {
      morgue: true,
      hall: true,
      church: true,
      cemetery: true,
    },
    needsFamilyTransport: false,
    familyTransportSeats: 5,
    distance: "",
    needsPallbearers: true,
    packageType: "" as "basic" | "standard" | "premium" | "custom" | "",
    selectedAdditionalServices: [] as string[],
    specialRequests: "",
    fullName: "",
    birthDate: "",
    deathDate: "",
    deathCertificate: "",
    relationship: "",
    dataConsent: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCemeteryCategory, setSelectedCemeteryCategory] =
    useState<"standard" | "comfort" | "premium">("standard");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("funeral-workflow-draft");
      if (saved) {
        if (saved.length > 1000000) {
          localStorage.removeItem("funeral-workflow-draft");
          return;
        }

        try {
          const parsed = JSON.parse(saved);
          const parsedFormData = parsed?.formData || {};

          const loadedFormData = {
            ...initialFormData,
            ...parsedFormData,
            hearseRoute: {
              ...initialFormData.hearseRoute,
              ...(parsedFormData.hearseRoute || {}),
            },
            selectedAdditionalServices:
              parsedFormData.selectedAdditionalServices || [],
            birthDate:
              parsedFormData.birthDate === "—" ? "" : parsedFormData.birthDate || "",
            deathDate:
              parsedFormData.deathDate === "—" ? "" : parsedFormData.deathDate || "",
          };

          setFormData(loadedFormData);
        } catch {
          localStorage.removeItem("funeral-workflow-draft");
        }
      }
    } catch {
      try {
        localStorage.removeItem("funeral-workflow-draft");
      } catch {}
    }
  }, []);

  useEffect(() => {
    try {
      const draft = {
        formData,
        savedAt: new Date().toISOString(),
      };
      const draftString = JSON.stringify(draft);

      if (draftString.length > 500000) {
        return;
      }

      localStorage.setItem("funeral-workflow-draft", draftString);
    } catch {
      try {
        localStorage.removeItem("funeral-workflow-draft");
        const keys = Object.keys(localStorage);
        keys.forEach((key) => {
          try {
            const item = localStorage.getItem(key);
            if (item && item.length > 100000) {
              localStorage.removeItem(key);
            }
          } catch {}
        });
      } catch {}
    }
  }, [formData]);

  const handleUpdateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  const handleCemeteryCategoryChange = (
    category: "standard" | "comfort" | "premium",
  ) => {
    setSelectedCemeteryCategory(category);
  };

  let heroNode = null;
  try {
    heroNode = <HeroSection />;
  } catch {
    heroNode = null;
  }

  let stepperNode = null;
  try {
    stepperNode = (
      <StepperWorkflow
        formData={formData}
        onUpdateFormData={handleUpdateFormData}
        onStepChange={handleStepChange}
        onCemeteryCategoryChange={handleCemeteryCategoryChange}
      />
    );
  } catch {
    stepperNode = null;
  }

  let packagesNode = null;
  if (currentStep === 2) {
    try {
      packagesNode = (
        <PackagesSection formData={formData} onUpdateFormData={handleUpdateFormData} />
      );
    } catch {
      packagesNode = null;
    }
  }

  let calculatorNode = null;
  if (currentStep >= 1) {
    try {
      calculatorNode = (
        <FloatingCalculator
          total={calculateTotal(formData, selectedCemeteryCategory)}
          breakdown={calculateBreakdown(formData, selectedCemeteryCategory)}
        />
      );
    } catch {
      calculatorNode = null;
    }
  }

  return (
    <div className="min-h-screen bg-white pt-20 -translate-y-[2.5%]">
      <div className="absolute top-0 left-0 right-0 z-30">
        <TopButtons />
      </div>

      {heroNode}

      <div className="relative z-20 stepper-overlay-position">{stepperNode}</div>

      {packagesNode}

      {calculatorNode}
    </div>
  );
}
