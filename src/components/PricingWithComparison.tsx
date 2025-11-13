import { useState, Fragment } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, ChevronDown, ChevronUp, X, LayoutGrid, Table, Plus, Minus, Music, Church, Car, Flower2, Camera, Snowflake, Sparkles, Shirt, Building, UserCheck, Users, Route, Bus, Package, Palette, Video, Cross, FileText, Utensils, Landmark } from './Icons';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CoffinMockup } from './CoffinMockup';
import { UnifiedCoffinConfigurator } from './UnifiedCoffinConfigurator';
import { Checkbox } from './ui/checkbox';
import { cn } from './ui/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

const burialPricingTiers = [
  {
    name: 'Стандарт',
    price: '45 000',
    description: 'Базовый комплект услуг для достойного прощания',
    features: [
      'Оформление документов',
      'Подтверждение места захоронения',
      'Хранение и базовая подготовка тела',
      'Гроб из массива сосны + подушка/покрывало',
      'Транспортировка покойного и перенос',
      'Кладбищенские работы'
    ],
    highlighted: false
  },
  {
    name: 'Комфорт',
    price: '85 000',
    description: 'Расширенный набор услуг с улучшенными материалами',
    features: [
      'Оформление документов',
      'Подтверждение места захоронения',
      'Хранение и подготовка тела',
      'Гроб из массива дуба + подушка/покрывало',
      'Транспортировка покойного и перенос',
      'Кладбищенские работы',
      'Временная табличка с фотографией',
      'Зал прощания на 2 часа',
      'Поминальный обед (до 20 человек)'
    ],
    highlighted: true
  },
  {
    name: 'Премиум',
    price: '150 000',
    description: 'Полный спектр услуг премиум класса',
    features: [
      'Оформление документов',
      'Подтверждение места захоронения',
      'Хранение и подготовка тела',
      'Гроб элитный с отделкой + подушка и покрывало',
      'Транспортировка покойного и перенос (6 человек)',
      'Кладбищенские работы',
      'Композиция из живых цветов',
      'Ритуальные принадлежности премиум',
      'Ритуальный зал на 4 часа',
      'Поминальный обед (до 40 человек)',
      'Памятник из гранита',
      'Индивидуальный координатор'
    ],
    highlighted: false
  }
];

const cremationPricingTiers = [
  {
    name: 'Стандарт',
    price: '35 000',
    description: 'Базовый комплект услуг с кремацией',
    features: [
      'Оформление документов и слот крематория',
      'Хранение и базовая подготовка тела',
      'Гроб для крематория деревянный',
      'Транспортировка в крематорий',
      'Кремация без зала',
      'Урна стандартная',
      'Выдача праха'
    ],
    highlighted: false
  },
  {
    name: 'Комфорт',
    price: '65 000',
    description: 'Расширенный набор услуг с кремацией',
    features: [
      'Гроб для кремации улучшенный',
      'Венок из живых цветов',
      'Транспортировка покойного',
      'Оформление документов',
      'Ритуальные принадлежности',
      'Услуги крематория',
      'Урна керамическая',
      'Ритуальный зал на 2 часа',
      'Поминальный обед (до 20 человек)'
    ],
    highlighted: true
  },
  {
    name: 'Премиум',
    price: '110 000',
    description: 'Полный спектр услуг премиум класса с кремацией',
    features: [
      'Гроб премиум для кремации',
      'Композиция из живых цветов',
      'Транспортировка покойного',
      'Оформление документов',
      'Ритуальные принадлежности премиум',
      'Услуги крематория',
      'Урна декоративная премиум',
      'Ритуальный зал на 4 часа',
      'Поминальный обед (до 40 человек)',
      'Профессиональная фото-видеосъемка',
      'Индивидуальный координатор',
      'Колумбарий на 1 год'
    ],
    highlighted: false
  }
];

interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const additionalServices: AdditionalService[] = [
  {
    id: "morgue-storage",
    name: "Хранение в морге",
    price: 2500,
    description: "Резерв времени до церемонии",
    icon: Snowflake,
  },
  {
    id: "sanitary-prep",
    name: "Санитарная подготовка и бальзамирование",
    price: 12000,
    description: "Аккуратный внешний вид",
    icon: Sparkles,
  },
  {
    id: "clothing",
    name: "Одежда и облачение",
    price: 8000,
    description: "Подбор, подготовка, укладка",
    icon: Shirt,
  },
  {
    id: "hall-rental",
    name: "Аренда зала прощания",
    price: 15000,
    description: "60–90 мин, подготовка площадки",
    icon: Building,
  },
  {
    id: "coordinator",
    name: "Координатор церемонии",
    price: 18000,
    description: "Сценарий, тайминг",
    icon: UserCheck,
  },
  {
    id: "pallbearers",
    name: "Носильщики (4–6 чел.)",
    price: 6000,
    description: "Церемониальная группа",
    icon: Users,
  },
  {
    id: "hearse-premium",
    name: "Катафалк премиум-класса",
    price: 14000,
    description: "Комфорт/бизнес-класс",
    icon: Car,
  },
  {
    id: "hearse-extra-trips",
    name: "Дополнительные рейсы",
    price: 5000,
    description: "Морг → зал → кладбище",
    icon: Route,
  },
  {
    id: "transport-family",
    name: "Транспорт для близких",
    price: 10000,
    description: "Микроавтобус/автобус",
    icon: Bus,
  },
  {
    id: "fresh-flowers",
    name: "Живая флористика",
    price: 12000,
    description: "Композиции, гирлянды",
    icon: Flower2,
  },
  {
    id: "textile-premium",
    name: "Текстиль премиум",
    price: 7000,
    description: "Покрывало, подушка улучшенные",
    icon: Package,
  },
  {
    id: "decor",
    name: "Декор зала и места",
    price: 15000,
    description: "Свечи, стойки, шатёр",
    icon: Palette,
  },
  {
    id: "music",
    name: "Музыкальное сопровождение",
    price: 8000,
    description: "Живые инструменты/фон",
    icon: Music,
  },
  {
    id: "photo-video",
    name: "Фото и видеосъёмка",
    price: 15000,
    description: "Памятный ролик",
    icon: Camera,
  },
  {
    id: "online-stream",
    name: "Онлайн-трансляция",
    price: 8000,
    description: "Для родственников на расстоянии",
    icon: Video,
  },
  {
    id: "priest",
    name: "Религиозный обряд",
    price: 9000,
    description: "По конфессии",
    icon: Church,
  },
  {
    id: "memorial-cross",
    name: "Памятный крест временный",
    price: 5000,
    description: "До установки памятника",
    icon: Cross,
  },
  {
    id: "printing",
    name: "Печать и полиграфия",
    price: 4000,
    description: "Ленты, программки, карточки",
    icon: FileText,
  },
  {
    id: "memorial-meal",
    name: "Поминальный обед",
    price: 35000,
    description: "Подбор зала, меню",
    icon: Utensils,
  },
  {
    id: "monument",
    name: "Памятник и благоустройство",
    price: 85000,
    description: "Проект, изготовление, установка",
    icon: Landmark,
  },
];

const customizationOptions = {
  standard: {
    coffin: [
      { 
        id: 'pine-natural', 
        name: 'Сосна натуральная',
        image: 'https://images.unsplash.com/photo-1706048111522-e4865f909940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjb2ZmaW4lMjBwaW5lfGVufDF8fHx8MTc2MTI5ODgxNnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'pine-dark', 
        name: 'Сосна темная',
        image: 'https://images.unsplash.com/photo-1644931551533-02906718127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjEyNTgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'pine-light', 
        name: 'Сосна светлая',
        image: 'https://images.unsplash.com/photo-1706048111522-e4865f909940?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjb2ZmaW4lMjBwaW5lfGVufDF8fHx8MTc2MTI5ODgxNnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    wreath: [
      { 
        id: 'artificial-white', 
        name: 'Искусственные цветы белые',
        image: 'https://images.unsplash.com/photo-1592592984982-85b85f01254f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGFydGlmaWNpYWwlMjBmbG93ZXJzfGVufDF8fHx8MTc2MTI5ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'artificial-mixed', 
        name: 'Искусственные цветы смешанные',
        image: 'https://images.unsplash.com/photo-1592592984982-85b85f01254f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGFydGlmaWNpYWwlMjBmbG93ZXJzfGVufDF8fHx8MTc2MTI5ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'artificial-red', 
        name: 'Искусственные цветы красные',
        image: 'https://images.unsplash.com/photo-1592592984982-85b85f01254f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGFydGlmaWNpYWwlMjBmbG93ZXJzfGVufDF8fHx8MTc2MTI5ODgxOHww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    lining: [
      { 
        id: 'basic-white', 
        name: 'Базовая белая',
        image: 'https://images.unsplash.com/photo-1550512171-3d4489659ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNhdGluJTIwZmFicmljfGVufDF8fHx8MTc2MTIxNDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'satin-white', 
        name: 'Атласная белая',
        image: 'https://images.unsplash.com/photo-1550512171-3d4489659ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNhdGluJTIwZmFicmljfGVufDF8fHx8MTc2MTIxNDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'satin-cream', 
        name: 'Атласная кремовая',
        image: 'https://images.unsplash.com/photo-1632421377986-0b1f70773812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwd2hpdGV8ZW58MXx8fHwxNzYxMjk4ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ]
  },
  comfort: {
    coffin: [
      { 
        id: 'oak-natural', 
        name: 'Дуб натуральный',
        image: 'https://images.unsplash.com/photo-1644931551533-02906718127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjEyNTgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'oak-dark', 
        name: 'Дуб темный',
        image: 'https://images.unsplash.com/photo-1644931551533-02906718127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjEyNTgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'oak-varnished', 
        name: 'Дуб лакированный',
        image: 'https://images.unsplash.com/photo-1644931551533-02906718127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjEyNTgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    wreath: [
      { 
        id: 'fresh-roses', 
        name: 'Живые розы белые',
        image: 'https://images.unsplash.com/photo-1649140938067-42249b19446e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwYm91cXVldHxlbnwxfHx8fDE3NjEyOTg4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'fresh-lilies', 
        name: 'Живые лилии',
        image: 'https://images.unsplash.com/photo-1649140938067-42249b19446e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwYm91cXVldHxlbnwxfHx8fDE3NjEyOTg4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'fresh-mixed', 
        name: 'Живые смешанные цветы',
        image: 'https://images.unsplash.com/photo-1649140938067-42249b19446e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwYm91cXVldHxlbnwxfHx8fDE3NjEyOTg4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    lining: [
      { 
        id: 'velvet-white', 
        name: 'Бархатная белая',
        image: 'https://images.unsplash.com/photo-1638006353284-eca071dd9238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWx2ZXQlMjBmYWJyaWMlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'velvet-cream', 
        name: 'Бархатная кремовая',
        image: 'https://images.unsplash.com/photo-1638006353284-eca071dd9238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWx2ZXQlMjBmYWJyaWMlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'silk-white', 
        name: 'Шелковая белая',
        image: 'https://images.unsplash.com/photo-1632421377986-0b1f70773812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwd2hpdGV8ZW58MXx8fHwxNzYxMjk4ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    plaque: [
      { 
        id: 'metal-basic', 
        name: 'Металлическая стандарт',
        image: 'https://images.unsplash.com/photo-1568057373873-87302f152271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHBsYXF1ZSUyMG1lbW9yaWFsfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'metal-gold', 
        name: 'Металлическая с позолотой',
        image: 'https://images.unsplash.com/photo-1568057373873-87302f152271?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMHBsYXF1ZSUyMG1lbW9yaWFsfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'ceramic', 
        name: 'Керамическая',
        image: 'https://images.unsplash.com/photo-1745124372154-81972a68eaae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwdGlsZSUyMHdoaXRlfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ]
  },
  premium: {
    coffin: [
      { 
        id: 'elite-mahogany', 
        name: 'Красное дерево',
        image: 'https://images.unsplash.com/photo-1677338003679-b422eb979c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhvZ2FueSUyMHdvb2QlMjBsdXh1cnl8ZW58MXx8fHwxNzYxMjk4ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'elite-oak-carved', 
        name: 'Дуб резной',
        image: 'https://images.unsplash.com/photo-1644931551533-02906718127f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvYWslMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjEyNTgyMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'elite-walnut', 
        name: 'Орех элитный',
        image: 'https://images.unsplash.com/photo-1677338003679-b422eb979c5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhvZ2FueSUyMHdvb2QlMjBsdXh1cnl8ZW58MXx8fHwxNzYxMjk4ODE3fDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    wreath: [
      { 
        id: 'premium-roses', 
        name: 'Композиция из роз премиум',
        image: 'https://images.unsplash.com/photo-1649140938067-42249b19446e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJvc2VzJTIwYm91cXVldHxlbnwxfHx8fDE3NjEyOTg4MTh8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'premium-orchids', 
        name: 'Композиция из орхидей',
        image: 'https://images.unsplash.com/photo-1712629069699-86c8d9a06050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG9yY2hpZHMlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3NjEyOTg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'premium-custom', 
        name: 'Индивидуальная композиция',
        image: 'https://images.unsplash.com/photo-1712629069699-86c8d9a06050?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG9yY2hpZHMlMjBhcnJhbmdlbWVudHxlbnwxfHx8fDE3NjEyOTg4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    lining: [
      { 
        id: 'premium-silk', 
        name: 'Премиум шелк белый',
        image: 'https://images.unsplash.com/photo-1632421377986-0b1f70773812?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWxrJTIwZmFicmljJTIwd2hpdGV8ZW58MXx8fHwxNzYxMjk4ODIxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'premium-velvet', 
        name: 'Премиум бархат',
        image: 'https://images.unsplash.com/photo-1638006353284-eca071dd9238?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZWx2ZXQlMjBmYWJyaWMlMjB0ZXh0dXJlfGVufDF8fHx8MTc2MTI5ODgyMXww&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'premium-satin-gold', 
        name: 'Атлас с золотым шитьем',
        image: 'https://images.unsplash.com/photo-1550512171-3d4489659ab4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNhdGluJTIwZmFicmljfGVufDF8fHx8MTc2MTIxNDc4Nnww&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ],
    monument: [
      { 
        id: 'granite-black', 
        name: 'Гранит черный',
        image: 'https://images.unsplash.com/photo-1699982758610-dd21b8bd2aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGdyYW5pdGUlMjBzdG9uZXxlbnwxfHx8fDE3NjEyOTg4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'granite-red', 
        name: 'Гранит красный',
        image: 'https://images.unsplash.com/photo-1699982758610-dd21b8bd2aed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGdyYW5pdGUlMjBzdG9uZXxlbnwxfHx8fDE3NjEyOTg4MjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
      },
      { 
        id: 'marble-white', 
        name: 'Мрамор белый',
        image: 'https://images.unsplash.com/photo-1566041510394-cf7c8fe21800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hcmJsZSUyMHRleHR1cmV8ZW58MXx8fHwxNzYxMjU1MzUxfDA&ixlib=rb-4.1.0&q=80&w=1080'
      },
    ]
  }
};

interface Feature {
  name: string;
  standard: boolean | string;
  comfort: boolean | string;
  premium: boolean | string;
  category?: string;
}

const burialComparisonFeatures: Feature[] = [
  { name: 'Оформление документов', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Транспортировка', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Копка могилы', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Ритуальные принадлежности', standard: 'Базовые', comfort: 'Расширенные', premium: 'Премиум', category: 'Базовые услуги' },
  
  { name: 'Материал гроба', standard: 'Сосна', comfort: 'Дуб', premium: 'Элитное дерево', category: 'Атрибутика' },
  { name: 'Венок', standard: 'Искусственные цветы', comfort: 'Живые цветы', premium: 'Композиция премиум', category: 'Атрибутика' },
  { name: 'Внутренняя отделка', standard: 'Базовая', comfort: 'Бархат', premium: 'Премиум шелк', category: 'Атрибутика' },
  { name: 'Табличка', standard: false, comfort: 'С фотографией', premium: 'С фотографией', category: 'Атрибутика' },
  { name: 'Памятник', standard: false, comfort: false, premium: 'Гранит', category: 'Атрибутика' },
  
  { name: 'Ритуальный зал', standard: false, comfort: '2 часа', premium: '4 часа', category: 'Дополнительно' },
  { name: 'Поминальный обед', standard: false, comfort: 'До 20 человек', premium: 'До 40 человек', category: 'Дополнительно' },
  { name: 'Фото-видеосъемка', standard: false, comfort: false, premium: true, category: 'Дополнительно' },
  { name: 'Координатор', standard: false, comfort: false, premium: true, category: 'Дополнительно' },
];

const cremationComparisonFeatures: Feature[] = [
  { name: 'Оформление документов', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Транспортировка', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Услуги крематория', standard: true, comfort: true, premium: true, category: 'Базовые услуги' },
  { name: 'Ритуальные принадлежности', standard: 'Базовые', comfort: 'Расширенные', premium: 'Премиум', category: 'Базовые услуги' },
  
  { name: 'Гроб для кремации', standard: 'Стандарт', comfort: 'Улучшенный', premium: 'Премиум', category: 'Атрибутика' },
  { name: 'Венок', standard: 'Искусственные цветы', comfort: 'Живые цветы', premium: 'Композиция премиум', category: 'Атрибутика' },
  { name: 'Урна', standard: 'Стандартная', comfort: 'Керамическая', premium: 'Декоративная премиум', category: 'Атрибутика' },
  { name: 'Колумбарий', standard: false, comfort: false, premium: '1 год', category: 'Атрибутика' },
  
  { name: 'Ритуальный зал', standard: false, comfort: '2 часа', premium: '4 часа', category: 'Дополнительно' },
  { name: 'Поминальный обед', standard: false, comfort: 'До 20 человек', premium: 'До 40 человек', category: 'Дополнительно' },
  { name: 'Фото-видеосъемка', standard: false, comfort: false, premium: true, category: 'Дополнительно' },
  { name: 'Координатор', standard: false, comfort: false, premium: true, category: 'Дополнительно' },
];

export function PricingWithComparison() {
  const [serviceType, setServiceType] = useState<'burial' | 'cremation'>('burial');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [expandedTier, setExpandedTier] = useState<number | null>(null);
  const [selections, setSelections] = useState<Record<number, Record<string, string>>>({});
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState<Record<number, Set<string>>>({});

  const pricingTiers = serviceType === 'burial' ? burialPricingTiers : cremationPricingTiers;
  const comparisonFeatures = serviceType === 'burial' ? burialComparisonFeatures : cremationComparisonFeatures;

  const handleServiceTypeChange = (newType: 'burial' | 'cremation') => {
    setServiceType(newType);
    // Сбрасываем состояние при смене типа услуги
    setExpandedTier(null);
    setSelections({});
    setSelectedAdditionalServices({});
  };

  const handleTierClick = (index: number) => {
    // Если закрываем тариф, даем время для cleanup
    if (expandedTier === index) {
      setExpandedTier(null);
      // Принудительная очистка после закрытия
      setTimeout(() => {
        if (typeof window !== 'undefined' && (window as any).gc) {
          (window as any).gc();
        }
      }, 100);
      return;
    }
    
    setExpandedTier(index);
    if (!selections[index]) {
      const tierKey = index === 0 ? 'standard' : index === 1 ? 'comfort' : 'premium';
      const options = customizationOptions[tierKey as keyof typeof customizationOptions];
      const defaultSelections: Record<string, string> = {};
      Object.keys(options).forEach(key => {
        defaultSelections[key] = options[key as keyof typeof options][0].id;
      });
      setSelections({ ...selections, [index]: defaultSelections });
      
      // Все категории закрыты при раскрытии блока
      setExpandedCategories({});
    }
    
    // Инициализируем пустой Set для дополнительных услуг если его еще нет
    if (!selectedAdditionalServices[index]) {
      setSelectedAdditionalServices({
        ...selectedAdditionalServices,
        [index]: new Set<string>()
      });
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleSelectionChange = (tierIndex: number, category: string, value: string) => {
    setSelections({
      ...selections,
      [tierIndex]: {
        ...selections[tierIndex],
        [category]: value
      }
    });
  };

  const toggleAdditionalService = (tierIndex: number, serviceId: string) => {
    const currentServices = selectedAdditionalServices[tierIndex] || new Set<string>();
    const newServices = new Set(currentServices);
    
    if (newServices.has(serviceId)) {
      newServices.delete(serviceId);
    } else {
      newServices.add(serviceId);
    }
    
    setSelectedAdditionalServices({
      ...selectedAdditionalServices,
      [tierIndex]: newServices
    });
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      coffin: 'Гроб',
      wreath: 'Венок',
      lining: 'Внутренняя отделка',
      plaque: 'Табличка',
      monument: 'Памятник'
    };
    return labels[category] || category;
  };

  const getSelectedOptionName = (tierIndex: number, category: string) => {
    const tierKey = tierIndex === 0 ? 'standard' : tierIndex === 1 ? 'comfort' : 'premium';
    const options = customizationOptions[tierKey as keyof typeof customizationOptions];
    const selectedId = selections[tierIndex]?.[category];
    const categoryOptions = options[category as keyof typeof options];
    const selectedOption = categoryOptions?.find((opt: any) => opt.id === selectedId);
    return selectedOption?.name || '';
  };

  const getSelectedOption = (tierIndex: number, category: string) => {
    const tierKey = tierIndex === 0 ? 'standard' : tierIndex === 1 ? 'comfort' : 'premium';
    const options = customizationOptions[tierKey as keyof typeof customizationOptions];
    const selectedId = selections[tierIndex]?.[category];
    const categoryOptions = options[category as keyof typeof options];
    return categoryOptions?.find((opt: any) => opt.id === selectedId);
  };

  const getTotalPrice = (tierIndex: number) => {
    const basePrice = parseInt(pricingTiers[tierIndex].price.replace(/\s/g, ''));
    const additionalServicesPrice = Array.from(selectedAdditionalServices[tierIndex] || [])
      .reduce((sum, serviceId) => {
        const service = additionalServices.find(s => s.id === serviceId);
        return sum + (service?.price || 0);
      }, 0);
    return basePrice + additionalServicesPrice;
  };

  const filteredFeatures = showDifferencesOnly
    ? comparisonFeatures.filter(
        (feature) =>
          !(
            feature.standard === feature.comfort &&
            feature.comfort === feature.premium
          )
      )
    : comparisonFeatures;

  const renderValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-700">{value}</span>;
  };

  const groupedFeatures = filteredFeatures.reduce((acc, feature) => {
    const category = feature.category || 'Прочее';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(feature);
    return acc;
  }, {} as Record<string, Feature[]>);

  return (
    <section id="pricing" className="py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto -mt-20">
        <div className="text-center mb-12">
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            {viewMode === 'cards' 
              ? 'Выберите подходящий тариф'
              : 'Детальное сравнение всех включенных услуг и возможностей'
            }
          </p>
          
          {/* Переключатели */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            {/* Переключатель типа услуги */}
            <div className="inline-flex gap-1 p-1 bg-white rounded-full shadow-sm border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleServiceTypeChange('burial')}
                className={cn(
                  "transition-all duration-200",
                  serviceType === 'burial' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                Захоронение
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleServiceTypeChange('cremation')}
                className={cn(
                  "transition-all duration-200",
                  serviceType === 'cremation' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                Кремация
              </Button>
            </div>

            {/* Разделитель */}
            <div className="hidden sm:block w-px h-8 bg-gray-200" />

            {/* Переключатель вида отображения */}
            <div className="inline-flex gap-1 p-1 bg-white rounded-full shadow-sm border border-gray-200">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('cards')}
                className={cn(
                  "gap-2 transition-all duration-200",
                  viewMode === 'cards' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <LayoutGrid className="h-4 w-4" />
                Карточки
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('table')}
                className={cn(
                  "gap-2 transition-all duration-200",
                  viewMode === 'table' 
                    ? 'bg-gray-900 text-white hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
              >
                <Table className="h-4 w-4" />
                Таблица
              </Button>
            </div>
          </div>
        </div>

        {viewMode === 'cards' ? (
          <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            {pricingTiers.map((tier, index) => {
              const isExpanded = expandedTier === index;
              const tierKey = index === 0 ? 'standard' : index === 1 ? 'comfort' : 'premium';
              const options = customizationOptions[tierKey as keyof typeof customizationOptions];
              const totalPrice = getTotalPrice(index);
              const hasAdditionalServices = (selectedAdditionalServices[index]?.size || 0) > 0;

              return (
                <Card 
                  key={index} 
                  className={`relative w-full md:w-80 flex flex-col transition-all rounded-3xl ${
                    tier.highlighted ? 'border-gray-900 shadow-xl' : 'shadow-lg'
                  } ${isExpanded ? 'md:w-full' : ''}`}
                >
                  {tier.highlighted && !isExpanded && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-1 rounded-full text-sm">
                      Популярный
                    </div>
                  )}
                  <CardHeader className="text-center pb-8">
                    <CardTitle className="mb-2">{tier.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl">{hasAdditionalServices ? totalPrice.toLocaleString('ru-RU') : tier.price}</span>
                      <span className="text-gray-600"> ₽</span>
                    </div>
                    <CardDescription>{tier.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    {!isExpanded ? (
                      <>
                        <ul className="space-y-3 mb-6">
                          {tier.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <Check className="h-5 w-5 text-gray-900 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-gray-700">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          className={`w-full mt-auto ${tier.highlighted ? 'bg-gray-900 hover:bg-gray-800' : ''}`}
                          variant={tier.highlighted ? 'default' : 'outline'}
                          onClick={() => handleTierClick(index)}
                        >
                          Выбрать тариф
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Tabs defaultValue="customization" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 mb-6">
                          <TabsTrigger value="customization">Атрибутика</TabsTrigger>
                          <TabsTrigger value="additional">Доп. услуги</TabsTrigger>
                        </TabsList>

                        <TabsContent value="customization" className="space-y-6">
                          <div>
                            <h3 className="mb-4 text-gray-900">Базовые услуги</h3>
                            <ul className="space-y-2">
                              {tier.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <Check className="h-4 w-4 text-gray-900 flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-gray-700">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Рендерим 3D конфигуратор только для раскрытого тарифа */}
                          {isExpanded && (
                            <UnifiedCoffinConfigurator 
                              key={`configurator-${index}`}
                              onConfirm={(data) => {
                                // Обработка подтверждения конфигурации
                                if (data) {
                                  // Можно добавить сохранение в состояние или отправку на сервер
                                }
                              }}
                            />
                          )}

                          <div>
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-gray-900">Альтернативный выбор атрибутики</h3>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Опционально</span>
                            </div>
                            <div className="space-y-3">
                              {Object.keys(options).map((category) => {
                                const categoryOptions = options[category as keyof typeof options];
                                const isCategoryExpanded = expandedCategories[category];
                                const selectedOptionName = getSelectedOptionName(index, category);

                                return (
                                  <div key={category} className="border border-gray-200 rounded-full overflow-hidden shadow-sm">
                                    <button
                                      onClick={() => toggleCategory(category)}
                                      className="w-full flex items-center justify-between p-3 bg-white hover:bg-gray-50 transition-colors"
                                    >
                                      <div className="flex flex-col items-start gap-1">
                                        <span className="text-sm text-gray-900">
                                          {getCategoryLabel(category)}
                                        </span>
                                        {!isCategoryExpanded && (
                                          <span className="text-xs text-gray-500">
                                            {selectedOptionName}
                                          </span>
                                        )}
                                      </div>
                                      {isCategoryExpanded ? (
                                        <ChevronUp className="h-4 w-4 text-gray-600" />
                                      ) : (
                                        <ChevronDown className="h-4 w-4 text-gray-600" />
                                      )}
                                    </button>
                                    
                                    {isCategoryExpanded && (
                                      <div className="p-3 pt-0 bg-white border-t border-gray-100">
                                        <RadioGroup
                                          value={selections[index]?.[category]}
                                          onValueChange={(value) => handleSelectionChange(index, category, value)}
                                        >
                                          {categoryOptions.map((option: any) => (
                                            <div key={option.id} className="flex items-start space-x-2 mb-3 mt-3">
                                              <RadioGroupItem value={option.id} id={`${index}-${option.id}`} className="mt-1" />
                                              <Label
                                                htmlFor={`${index}-${option.id}`}
                                                className="flex-1 cursor-pointer"
                                              >
                                                <div className="flex gap-2">
                                                  <ImageWithFallback
                                                    src={option.image}
                                                    alt={option.name}
                                                    className="w-16 h-16 object-cover rounded border border-gray-200"
                                                  />
                                                  <div className="flex flex-col justify-center">
                                                    <span className="text-sm text-gray-900">{option.name}</span>
                                                  </div>
                                                </div>
                                              </Label>
                                            </div>
                                          ))}
                                        </RadioGroup>
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="additional" className="space-y-4">
                          <p className="text-sm text-gray-600 mb-4">
                            Выберите дополнительные услуги для вашего тарифа
                          </p>
                          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                            {additionalServices.map((service) => {
                              const Icon = service.icon;
                              const isSelected = selectedAdditionalServices[index]?.has(service.id);
                              
                              return (
                                <div
                                  key={service.id}
                                  onClick={() => toggleAdditionalService(index, service.id)}
                                  className={cn(
                                    "flex items-center gap-3 p-3 border rounded-full cursor-pointer transition-all",
                                    isSelected 
                                      ? "border-gray-900 bg-gray-50" 
                                      : "border-gray-200 hover:border-gray-300"
                                  )}
                                >
                                  <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                                    isSelected ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"
                                  )}>
                                    <Icon className="h-4 w-4" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-sm text-gray-900">{service.name}</div>
                                    <div className="text-xs text-gray-500">{service.description}</div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-900 whitespace-nowrap">
                                      {service.price.toLocaleString('ru-RU')} ₽
                                    </span>
                                    {isSelected ? (
                                      <Minus className="h-4 w-4 text-gray-900" />
                                    ) : (
                                      <Plus className="h-4 w-4 text-gray-600" />
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </TabsContent>

                        <Separator className="my-6" />

                        <div className="space-y-4">
                          {hasAdditionalServices && (
                            <div className="bg-gray-50 rounded-full p-4 space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Базовый тариф:</span>
                                <span className="text-gray-900">{tier.price} ₽</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Дополнительные услуги:</span>
                                <span className="text-gray-900">
                                  +{(totalPrice - parseInt(tier.price.replace(/\s/g, ''))).toLocaleString('ru-RU')} ₽
                                </span>
                              </div>
                              <Separator />
                              <div className="flex justify-between">
                                <span className="text-gray-900">Итого:</span>
                                <span className="text-xl text-gray-900">{totalPrice.toLocaleString('ru-RU')} ₽</span>
                              </div>
                            </div>
                          )}

                          <div className="flex gap-3">
                            <Button 
                              className="flex-1 bg-gray-900 hover:bg-gray-800"
                              onClick={() => {
                                alert('Заказ оформлен! Общая стоимость: ' + totalPrice.toLocaleString('ru-RU') + ' ₽');
                              }}
                            >
                              Оформить заказ
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleTierClick(index)}
                            >
                              <ChevronUp className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </Tabs>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="differences"
                  checked={showDifferencesOnly}
                  onCheckedChange={(checked) => setShowDifferencesOnly(checked as boolean)}
                />
                <label
                  htmlFor="differences"
                  className="text-sm cursor-pointer select-none"
                >
                  Показать только отличия
                </label>
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide rounded-3xl border border-gray-200 shadow-lg">
              <table className="w-full border-collapse min-w-[600px]">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left p-4 bg-gray-50 first:rounded-tl-3xl">Услуга</th>
                    <th className="text-center p-4 bg-gray-50">
                      <div className="space-y-1">
                        <div>Стандарт</div>
                        <div className="text-sm text-gray-600">{pricingTiers[0].price} ₽</div>
                      </div>
                    </th>
                    <th className="text-center p-4 bg-gray-100">
                      <div className="space-y-1">
                        <div>Комфорт</div>
                        <div className="text-sm text-gray-600">{pricingTiers[1].price} ₽</div>
                      </div>
                    </th>
                    <th className="text-center p-4 bg-gray-50 last:rounded-tr-3xl">
                      <div className="space-y-1">
                        <div>Премиум</div>
                        <div className="text-sm text-gray-600">{pricingTiers[2].price} ₽</div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(groupedFeatures).map(([category, features], catIndex) => (
                    <Fragment key={category}>
                      <tr className="bg-gray-100">
                        <td colSpan={4} className="p-3 text-sm text-gray-900">
                          {category}
                        </td>
                      </tr>
                      {features.map((feature, index) => {
                        const isLastCategory = catIndex === Object.keys(groupedFeatures).length - 1;
                        const isLastRow = index === features.length - 1;
                        const isLastInTable = isLastCategory && isLastRow;
                        
                        return (
                          <tr
                            key={`${category}-${index}`}
                            className={cn(
                              "border-b border-gray-100 hover:bg-gray-50 transition-colors",
                              index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50',
                              isLastInTable && "border-b-0"
                            )}
                          >
                            <td className={cn("p-4 text-sm", isLastInTable && "rounded-bl-3xl")}>{feature.name}</td>
                            <td className="p-4 text-center">{renderValue(feature.standard)}</td>
                            <td className="p-4 text-center bg-gray-50/50">{renderValue(feature.comfort)}</td>
                            <td className={cn("p-4 text-center", isLastInTable && "rounded-br-3xl")}>{renderValue(feature.premium)}</td>
                          </tr>
                        );
                      })}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
