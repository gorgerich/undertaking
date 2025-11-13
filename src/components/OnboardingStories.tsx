import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Story {
  title: string;
  description: string;
  step: number;
}

const stories: Story[] = [
  {
    title: "Выберите формат прощания",
    description: "Начните с выбора формата: захоронение или кремация. Каждый вариант имеет свои особенности и готовые пакеты услуг.",
    step: 1
  },
  {
    title: "Настройте детали",
    description: "Выберите место, атрибутику и дополнительные услуги. Используйте готовые тарифы или соберите индивидуальную комплектацию.",
    step: 2
  },
  {
    title: "Контролируйте бюджет",
    description: "Плавающий калькулятор в правом нижнем углу всегда показывает итоговую стоимость. Вы полностью контролируете процесс и расходы.",
    step: 3
  }
];

interface OnboardingStoriesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function OnboardingStories({ isOpen, onClose }: OnboardingStoriesProps) {
  const [currentStory, setCurrentStory] = useState(0);
  const [progress, setProgress] = useState(0);

  // Блокировка скролла body при открытии
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStory(0);
      setProgress(0);
      return;
    }

    const duration = 5000; // 5 секунд на каждую историю
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          if (currentStory < stories.length - 1) {
            setCurrentStory((c) => c + 1);
            return 0;
          } else {
            clearInterval(timer);
            return 100;
          }
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentStory, isOpen]);

  const handleNext = () => {
    if (currentStory < stories.length - 1) {
      setCurrentStory(currentStory + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStory > 0) {
      setCurrentStory(currentStory - 1);
      setProgress(0);
    }
  };

  const handleStoryClick = (index: number) => {
    setCurrentStory(index);
    setProgress(0);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center"
        onClick={onClose}
      >
        {/* Контент сторис */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full h-full md:w-full md:h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Прогресс-бары */}
          <div className="absolute top-0 left-0 right-0 md:left-auto md:right-auto md:top-8 md:left-1/2 md:-translate-x-1/2 md:w-auto flex gap-2 p-4 md:p-0 z-10">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStoryClick(index)}
                className="flex-1 md:flex-initial md:w-32 h-1 bg-white/30 rounded-full overflow-hidden"
              >
                <motion.div
                  className="h-full bg-white rounded-full"
                  initial={{ width: '0%' }}
                  animate={{
                    width: index < currentStory ? '100%' : index === currentStory ? `${progress}%` : '0%'
                  }}
                  transition={{ duration: 0.1 }}
                />
              </button>
            ))}
          </div>

          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-10 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200"
          >
            <X className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          {/* Основной контент */}
          <div className="relative w-full h-full bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-blue-900/40 backdrop-blur-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStory}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-16 lg:p-24 gap-8 md:gap-16 lg:gap-24"
              >
                {/* Номер шага */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center flex-shrink-0"
                >
                  <span className="text-5xl md:text-6xl lg:text-7xl text-white">{stories[currentStory].step}</span>
                </motion.div>

                {/* Текстовый контент */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-3xl">
                  {/* Заголовок */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 md:mb-8"
                  >
                    {stories[currentStory].title}
                  </motion.h2>

                  {/* Описание */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-2xl lg:text-3xl text-white/80 leading-relaxed mb-8 md:mb-12"
                  >
                    {stories[currentStory].description}
                  </motion.p>

                  {/* Кнопка на последнем слайде */}
                  {currentStory === stories.length - 1 && (
                    <motion.button
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      onClick={onClose}
                      className="px-8 md:px-12 py-4 md:py-5 rounded-full bg-white/20 backdrop-blur-md text-white text-lg md:text-xl border border-white/30 hover:bg-white/30 transition-all duration-200"
                    >
                      Начать работу
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Навигационные кнопки */}
            {currentStory > 0 && (
              <button
                onClick={handlePrev}
                className="absolute left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200 z-10"
              >
                <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </button>
            )}

            {currentStory < stories.length - 1 && (
              <button
                onClick={handleNext}
                className="absolute right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-all duration-200 z-10"
              >
                <ChevronRight className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" />
              </button>
            )}
          </div>

          {/* Индикаторы */}
          <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-10">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStoryClick(index)}
                className={`h-2 md:h-3 rounded-full transition-all duration-200 ${
                  index === currentStory ? 'bg-white w-8 md:w-12' : 'bg-white/40 w-2 md:w-3'
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}