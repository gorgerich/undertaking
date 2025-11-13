import { useState, useEffect } from "react";
import "./styles/globals.css";
import "./components/suppress-r3f-warnings";
import { HeroSection } from "./components/HeroSection";
import { StepperWorkflow } from "./components/StepperWorkflow";
import { PackagesSection } from "./components/PackagesSection";
import { FloatingCalculator } from "./components/FloatingCalculator";
import { TopButtons } from "./components/TopButtons";
import {
  calculateTotal,
  calculateBreakdown,
} from "./components/calculationUtils";

export default function App() {
  // Принудительный скролл к началу при первой загрузке
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Глобальное состояние формы для синхронизации между компонентами
  const initialFormData = {
    // Формат
    serviceType: "burial", // burial или cremation
    hasHall: true,
    hallDuration: 60,
    ceremonyType: "civil", // civil, religious, combined
    confession: "",
    ceremonyOrder: "civil-first", // для комбинированной

    // Логистика
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

    // Атрибутика
    packageType: "" as
      | "basic"
      | "standard"
      | "premium"
      | "custom"
      | "",
    selectedAdditionalServices: [] as string[],
    specialRequests: "",

    // Документы
    fullName: "",
    birthDate: "",
    deathDate: "",
    deathCertificate: "",
    relationship: "",
    dataConsent: false,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentStep, setCurrentStep] = useState(0);
  const [
    selectedCemeteryCategory,
    setSelectedCemeteryCategory,
  ] = useState<"standard" | "comfort" | "premium">("standard");

  // Загрузка из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem(
      "funeral-workflow-draft",
    );
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData({
          ...initialFormData,
          ...parsed.formData,
          hearseRoute: {
            ...initialFormData.hearseRoute,
            ...(parsed.formData.hearseRoute || {}),
          },
          selectedAdditionalServices:
            parsed.formData.selectedAdditionalServices || [],
        });
        // Не загружаем currentStep - всегда начинаем с первого шага (0)
      } catch (e) {
        console.error("Failed to load draft:", e);
      }
    }
  }, []);

  // Сохранение в localStorage при изменении
  useEffect(() => {
    const draft = {
      formData,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      "funeral-workflow-draft",
      JSON.stringify(draft),
    );
  }, [formData]);

  // Функция обновления формы
  const handleUpdateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Обработчик изменения шага
  const handleStepChange = (step: number) => {
    setCurrentStep(step);
  };

  // Обработчик изменения категории кладбища
  const handleCemeteryCategoryChange = (
    category: "standard" | "comfort" | "premium",
  ) => {
    setSelectedCemeteryCategory(category);
  };

  return (
    <div className="min-h-screen bg-white pt-20 -translate-y-[2.5%]">
      {/* Top Buttons */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <TopButtons />
      </div>

      {/* Hero Section */}
      <HeroSection />

      {/* Stepper Workflow - поверх Hero на 15% с liquid glass эффектом */}
      <div
        className="relative z-20"
        style={{ marginTop: "-25%" }}
      >
        <StepperWorkflow
          formData={formData}
          onUpdateFormData={handleUpdateFormData}
          onStepChange={handleStepChange}
          onCemeteryCategoryChange={
            handleCemeteryCategoryChange
          }
        />
      </div>

      {/* Packages Section - тарифы и конструктор - показывается только на шаге 2 (Атрибутика) и далее */}
      {currentStep >= 2 && (
        <PackagesSection
          formData={formData}
          onUpdateFormData={handleUpdateFormData}
        />
      )}

      {/* Плавающий калькулятор - показывается начиная с шага 1 */}
      {currentStep >= 1 && (
        <FloatingCalculator
          total={calculateTotal(
            formData,
            selectedCemeteryCategory,
          )}
          breakdown={calculateBreakdown(
            formData,
            selectedCemeteryCategory,
          )}
        />
      )}

      {/* Footer */}
    </div>
  );
}