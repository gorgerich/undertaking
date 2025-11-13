import { useState } from 'react';
import { RealisticCoffinViewer, woodTypes, liningTypes, hardwareTypes } from './RealisticCoffinViewer';
import { Button } from './ui/button';
import { ArrowLeft } from './Icons';

export function RealisticCoffinDemo({ onBack }: { onBack?: () => void }) {
  const [selectedWood, setSelectedWood] = useState(woodTypes[0]);
  const [selectedLining, setSelectedLining] = useState(liningTypes[0]);
  const [selectedHardware, setSelectedHardware] = useState(hardwareTypes[0]);
  const [showLid, setShowLid] = useState(false); // По умолчанию открыт для демонстрации

  const totalPrice = selectedWood.price + selectedLining.price + selectedHardware.price + 25000; // базовая цена

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-gray-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Кнопка возврата */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Вернуться на главную
          </button>
        )}
        
        {/* Заголовок */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-gray-900 mb-3">Гипер-реалистичный 3D конфигуратор гроба</h1>
          <p className="text-gray-600">Настройте внешний вид и изучите детали в интерактивном 3D просмотре</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Визуализатор */}
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-black rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
              <div className="aspect-[4/3] relative">
                <RealisticCoffinViewer
                  key={`demo-viewer-${selectedWood.id}-${selectedLining.id}-${selectedHardware.id}`}
                  wood={selectedWood}
                  lining={selectedLining}
                  hardware={selectedHardware}
                  showLid={showLid}
                />
                
                {/* Переключатель крышки */}
                <div className="absolute top-4 left-4 flex gap-2 bg-black/40 backdrop-blur-sm rounded-lg p-1 border border-white/10 z-10">
                  <button
                    onClick={() => setShowLid(true)}
                    className={`px-4 py-2 rounded transition-all ${
                      showLid 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Закрыт
                  </button>
                  <button
                    onClick={() => setShowLid(false)}
                    className={`px-4 py-2 rounded transition-all ${
                      !showLid 
                        ? 'bg-white text-gray-900' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Открыт
                  </button>
                </div>
              </div>
            </div>

            {/* Итоговая стоимость */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Итоговая стоимость</p>
                  <p className="text-gray-900 mt-1">{totalPrice.toLocaleString('ru-RU')} ₽</p>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                  Добавить в заказ
                </Button>
              </div>
            </div>
          </div>

          {/* Панель настроек */}
          <div className="space-y-6">
            {/* Порода дерева */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-gray-900 mb-4">Порода дерева</h3>
              <div className="grid grid-cols-3 gap-3">
                {woodTypes.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => setSelectedWood(wood)}
                    className={`relative p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedWood.id === wood.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="aspect-square rounded overflow-hidden mb-2">
                      <img
                        src={wood.texture}
                        alt={wood.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-900">{wood.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {wood.price === 0 ? 'Базовая' : `+${wood.price.toLocaleString('ru-RU')} ₽`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Внутренняя отделка */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-gray-900 mb-4">Внутренняя отделка</h3>
              <div className="grid grid-cols-3 gap-3">
                {liningTypes.map((lining) => (
                  <button
                    key={lining.id}
                    onClick={() => setSelectedLining(lining)}
                    className={`relative p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedLining.id === lining.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="aspect-square rounded overflow-hidden mb-2">
                      <img
                        src={lining.texture}
                        alt={lining.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-900">{lining.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {lining.price === 0 ? 'Базовая' : `+${lining.price.toLocaleString('ru-RU')} ₽`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Фурнитура */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
              <h3 className="text-gray-900 mb-4">Фурнитура (ручки и декор)</h3>
              <div className="grid grid-cols-3 gap-3">
                {hardwareTypes.map((hardware) => (
                  <button
                    key={hardware.id}
                    onClick={() => setSelectedHardware(hardware)}
                    className={`relative p-3 rounded-lg border-2 transition-all hover:shadow-md ${
                      selectedHardware.id === hardware.id
                        ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                        : 'border-gray-200 hover:border-yellow-300'
                    }`}
                  >
                    <div 
                      className="aspect-square rounded flex items-center justify-center mb-2"
                      style={{ background: hardware.metallic }}
                    >
                      {/* Превью ручки */}
                      <div 
                        className="w-16 h-12 rounded-full border-4 shadow-lg"
                        style={{ borderColor: hardware.color }}
                      />
                    </div>
                    <p className="text-sm text-gray-900">{hardware.name}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {hardware.price === 0 ? 'Базовая' : `+${hardware.price.toLocaleString('ru-RU')} ₽`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Информация */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
              <h4 className="text-blue-900 mb-2">💡 Подсказка</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                Используйте мышь для вращения модели и колесико для масштабирования. 
                Переключайтесь между открытым и закрытым видом, чтобы рассмотреть 
                внутреннюю отделку и все детали.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
