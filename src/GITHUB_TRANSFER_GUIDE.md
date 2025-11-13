# 📦 Инструкция по переносу проекта "Тихая Память" на GitHub

## 📁 Структура проекта

```
tihaya-pamyat-funeral-site/
├── public/
├── src/
│   ├── App.tsx
│   ├── components/
│   │   ├── ui/                    # 35+ shadcn компонентов
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── AIChatModal.tsx
│   │   ├── FloatingCalculator.tsx
│   │   ├── HeroSection.tsx
│   │   ├── OnboardingStories.tsx
│   │   ├── PackagesSection.tsx
│   │   ├── PriceComparison.tsx
│   │   ├── PricingSection.tsx
│   │   ├── PricingWithComparison.tsx
│   │   ├── StepperWorkflow.tsx
│   │   ├── TopButtons.tsx
│   │   ├── UnifiedCoffinConfigurator.tsx
│   │   ├── calculationUtils.ts
│   │   └── suppress-r3f-warnings.ts
│   ├── styles/
│   │   └── globals.css
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

## 🚀 Шаги для переноса

### 1️⃣ Создайте новую папку проекта
```bash
mkdir tihaya-pamyat-funeral-site
cd tihaya-pamyat-funeral-site
```

### 2️⃣ Скопируйте все файлы из Figma Make

**Основные файлы:**
- `/App.tsx` → `src/App.tsx`
- `/styles/globals.css` → `src/styles/globals.css`

**Все компоненты из `/components/`:**
- Скопируйте всю папку `components` в `src/components/`
- Включая все файлы из `components/ui/`
- Включая `components/figma/ImageWithFallback.tsx`

### 3️⃣ Создайте конфигурационные файлы

Создайте следующие файлы в корне проекта (см. ниже их содержимое)

### 4️⃣ Инициализируйте Git репозиторий

```bash
git init
git add .
git commit -m "Initial commit: Funeral service website Tihaya Pamyat"
git branch -M main
git remote add origin https://github.com/ВАШ_USERNAME/tihaya-pamyat-funeral-site.git
git push -u origin main
```

### 5️⃣ Установите зависимости

```bash
npm install
```

### 6️⃣ Запустите проект локально

```bash
npm run dev
```

## 📄 Список всех файлов для копирования

### Основные файлы:
1. ✅ App.tsx
2. ✅ styles/globals.css

### Компоненты (23 файла):
3. ✅ components/AIChatModal.tsx
4. ✅ components/CoffinMockup.tsx
5. ✅ components/FloatingCalculator.tsx
6. ✅ components/HeroSection.tsx
7. ✅ components/Icons.tsx
8. ✅ components/MainComponents.tsx
9. ✅ components/OnboardingStories.tsx
10. ✅ components/PackagesSection.tsx
11. ✅ components/PriceComparison.tsx
12. ✅ components/PricingSection.tsx
13. ✅ components/PricingWithComparison.tsx
14. ✅ components/RealisticCoffinDemo.tsx
15. ✅ components/RealisticCoffinViewer.tsx
16. ✅ components/SkeletonCard.tsx
17. ✅ components/Stepper.tsx
18. ✅ components/StepperWorkflow.tsx
19. ✅ components/TopButtons.tsx
20. ✅ components/UnifiedCoffinConfigurator.tsx
21. ✅ components/calculationUtils.ts
22. ✅ components/suppress-r3f-warnings.ts
23. ✅ components/figma/ImageWithFallback.tsx

### UI компоненты Shadcn (35 файлов):
24-58. ✅ Все файлы из components/ui/ (accordion, alert, button, card, checkbox, dialog, input, label, select, switch, tabs и т.д.)

### Дополнительно:
- ✅ components/ui/utils.ts
- ✅ components/ui/use-mobile.ts

## 🔧 Технологии

- **React 18** + **TypeScript**
- **Vite** - сборщик
- **Tailwind CSS 4.0** - стилизация
- **Motion (Framer Motion)** - анимации
- **Shadcn/ui** - UI компоненты
- **Lucide React** - иконки
- **Recharts** - графики
- **React Hook Form** - формы

## 📝 Заметки

- Проект использует Tailwind CSS v4 с inline @theme
- Все компоненты полностью адаптивны
- Поддержка темной темы
- LocalStorage для сохранения прогресса
- AI-чат и Stories для онбординга

## 🌐 Деплой

Рекомендуемые платформы:
- **Vercel** (рекомендуется) - автоматический деплой из GitHub
- **Netlify** - альтернатива
- **GitHub Pages** - бесплатный хостинг

### Деплой на Vercel:
1. Зайдите на vercel.com
2. Подключите GitHub репозиторий
3. Выберите проект
4. Нажмите Deploy
5. Готово! 🎉

---

**Автор:** AI Assistant  
**Дата создания:** 2024  
**Версия:** 1.0.0
