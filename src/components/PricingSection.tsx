import { Check } from './Icons';
import { Button } from './ui/button';

const packages = [
  {
    name: 'Базовый',
    price: '45 000',
    description: 'Необходимый минимум для достойного прощания',
    features: [
      'Гроб сосновый',
      'Зал прощания 30 минут',
      'Транспорт (катафалк)',
      'Носильщики (4 человека)',
      'Искусственные цветы',
      'Координатор церемонии',
    ],
  },
  {
    name: 'Стандартный',
    price: '85 000',
    description: 'Оптимальный выбор для большинства семей',
    features: [
      'Гроб дубовый',
      'Зал прощания 60 минут',
      'Транспорт (катафалк + автобус)',
      'Носильщики (6 человек)',
      'Свежие цветы',
      'Музыкальное сопровождение',
      'Координатор церемонии',
      'Видеосъемка',
    ],
    popular: true,
  },
  {
    name: 'Премиум',
    price: '150 000',
    description: 'Полный спектр услуг высшего качества',
    features: [
      'Гроб элитный (красное дерево)',
      'Зал прощания 90 минут',
      'VIP транспорт',
      'Носильщики (8 человек)',
      'Премиум флористика',
      'Живая музыка',
      'Религиозная церемония',
      'Профессиональная видеосъемка',
      'Поминальный зал',
    ],
  },
];

export function PricingSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl mb-4 text-gray-900">Тарифы</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите готовый пакет или создайте индивидуальный набор услуг
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-xl p-8 ${
                pkg.popular
                  ? 'bg-gray-900 text-white ring-4 ring-gray-900 ring-offset-4'
                  : 'bg-white border-2 border-gray-200'
              }`}
            >
              {pkg.popular && (
                <div className="inline-block px-3 py-1 bg-white text-gray-900 rounded-full text-sm mb-4">
                  Популярный
                </div>
              )}
              <h3 className={`text-2xl mb-2 ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                {pkg.name}
              </h3>
              <div className="mb-4">
                <span className={`text-4xl ${pkg.popular ? 'text-white' : 'text-gray-900'}`}>
                  {pkg.price}
                </span>
                <span className={`text-lg ${pkg.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                  {' '}₽
                </span>
              </div>
              <p className={`mb-6 ${pkg.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                {pkg.description}
              </p>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check
                      className={`h-5 w-5 mr-3 mt-0.5 flex-shrink-0 ${
                        pkg.popular ? 'text-white' : 'text-gray-900'
                      }`}
                    />
                    <span className={pkg.popular ? 'text-gray-200' : 'text-gray-700'}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  pkg.popular
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                Выбрать пакет
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
