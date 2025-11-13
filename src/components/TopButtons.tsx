import { motion } from 'motion/react';
import { useState } from 'react';
import { OnboardingStories } from './OnboardingStories';
import { AIChatModal } from './AIChatModal';

export function TopButtons() {
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [selectedTariff, setSelectedTariff] = useState<string | null>(null);

  const handleOpenStepper = (tariffName: string) => {
    setSelectedTariff(tariffName);
    // Здесь можно добавить логику для открытия stepper с выбранным тарифом
    // Например, прокрутка к степперу или установка активного шага
    setIsAIChatOpen(false);
  };

  return (
    <div className="relative z-30 pt-2 pb-1">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex items-center justify-center">
          {/* Три кнопки по центру */}
          <div className="flex items-center gap-2 md:gap-3 -translate-x-[5%] -translate-y-[2%] mt-[75px] md:mt-[55px] mr-[0px] mb-[0px] ml-[15px] md:ml-[0px]">
            {/* Левая вытянутая синяя кнопка */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 md:px-8 md:py-4 rounded-full bg-white/20 backdrop-blur-2xl text-white shadow-2xl border border-white/30 transition-all duration-200 hover:bg-white/30 hover:border-white/40"
            >
              <span className="text-xs md:text-base">О сервисе</span>
            </motion.button>

            {/* Центральная круглая синяя кнопка */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsStoriesOpen(true)}
              className="w-[70px] h-[70px] md:w-[100px] md:h-[100px] rounded-full bg-white/20 backdrop-blur-2xl text-white shadow-2xl border border-white/30 flex items-center justify-center transition-all duration-200 hover:bg-white/30 hover:border-white/40"
            >
              <span className="text-xs md:text-base">Как начать?</span>
            </motion.button>

            {/* Правая вытянутая синяя кнопка */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsAIChatOpen(true)}
              className="px-4 py-2 md:px-8 md:py-4 rounded-full bg-white/20 backdrop-blur-2xl text-white shadow-2xl border border-white/30 transition-all duration-200 hover:bg-white/30 hover:border-white/40"
            >
              <span className="text-xs md:text-base">Создать с ИИ</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Компонент сторис */}
      <OnboardingStories isOpen={isStoriesOpen} onClose={() => setIsStoriesOpen(false)} />
      {/* Компонент чата с ИИ */}
      <AIChatModal 
        isOpen={isAIChatOpen} 
        onClose={() => setIsAIChatOpen(false)} 
        onOpenStepper={handleOpenStepper}
      />
    </div>
  );
}