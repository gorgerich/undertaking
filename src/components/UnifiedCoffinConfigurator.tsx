import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Plus, Minus, Check } from './Icons';
import { CoffinMockup } from './CoffinMockup';
import { RealisticCoffinViewer, woodTypes, liningTypes, hardwareTypes } from './RealisticCoffinViewer';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConfiguratorOption {
  id: string;
  name: string;
  image: string;
  price?: number;
}

interface UnifiedCoffinConfiguratorProps {
  onConfirm?: (data: any) => void;
}

export function UnifiedCoffinConfigurator({ onConfirm }: UnifiedCoffinConfiguratorProps) {
  const [activeTab, setActiveTab] = useState<'coffin' | 'wreath'>('coffin');
  
  // Состояние для реалистичного визуализатора
  const [selectedWood, setSelectedWood] = useState(woodTypes[0]);
  const [selectedLining, setSelectedLining] = useState(liningTypes[0]);
  const [selectedHardware, setSelectedHardware] = useState(hardwareTypes[0]);
  const [showLid, setShowLid] = useState(true);
  
  // Состояние для гроба (старое - оставлено для совместимости)
  const [coffinMaterial, setCoffinMaterial] = useState('pine');
  const [coffinColor, setCoffinColor] = useState('#8B7355');
  const [coffinQuantity, setCoffinQuantity] = useState(1);
  
  // Состояние для венка
  const [wreathType, setWreathType] = useState('artificial');
  const [wreathSize, setWreathSize] = useState('M');
  const [wreathText, setWreathText] = useState('');
  const [wreathQuantity, setWreathQuantity] = useState(1);

  // Опции для визуализатора
  const coffinOptions: ConfiguratorOption[] = [
    { id: 'pine', name: 'Сосна', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400', price: 15000 },
    { id: 'oak', name: 'Дуб', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400', price: 35000 },
    { id: 'elite', name: 'Элитное', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400', price: 65000 },
  ];

  const wreathOptions: ConfiguratorOption[] = [
    { id: 'artificial', name: 'Искусственные цветы', image: 'https://images.unsplash.com/photo-1741189127247-3f45b0ca6e53?w=400', price: 3500 },
    { id: 'composition', name: 'Живая композиция', image: 'https://images.unsplash.com/photo-1741189127247-3f45b0ca6e53?w=400', price: 7500 },
  ];

  const liningOptions: ConfiguratorOption[] = [
    { id: 'satin-white', name: 'Атлас белый', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400' },
    { id: 'silk-cream', name: 'Шелк кремовый', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400' },
  ];

  const plaqueOptions: ConfiguratorOption[] = [
    { id: 'metal', name: 'Металлическая', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400' },
  ];

  const monumentOptions: ConfiguratorOption[] = [
    { id: 'granite', name: 'Гранит', image: 'https://images.unsplash.com/photo-1718801623795-0762bc858a16?w=400' },
  ];

  // Цветовые палитры
  const coffinColors = [
    { id: 'natural', hex: '#8B7355', name: 'Натуральный' },
    { id: 'dark', hex: '#3E2723', name: 'Темный' },
    { id: 'mahogany', hex: '#6D4C3D', name: 'Красное дерево' },
    { id: 'walnut', hex: '#5D4037', name: 'Орех' },
    { id: 'cherry', hex: '#A0522D', name: 'Вишня' },
    { id: 'white', hex: '#E8D5C4', name: 'Белый' },
  ];

  const wreathSizes = [
    { id: 'S', name: 'Малый', price: 0 },
    { id: 'M', name: 'Средний', price: 1000 },
    { id: 'L', name: 'Большой', price: 2500 },
  ];

  // Расчет цены
  const getCoffinPrice = () => {
    const material = coffinOptions.find(m => m.id === coffinMaterial);
    return (material?.price || 15000) * coffinQuantity;
  };

  const getWreathPrice = () => {
    const type = wreathOptions.find(t => t.id === wreathType);
    const size = wreathSizes.find(s => s.id === wreathSize);
    return ((type?.price || 3500) + (size?.price || 0)) * wreathQuantity;
  };

  const getTotalPrice = () => {
    return getCoffinPrice() + getWreathPrice();
  };

  const getCurrentCoffin = () => {
    return coffinOptions.find(c => c.id === coffinMaterial) || coffinOptions[0];
  };

  const getCurrentWreath = () => {
    return wreathOptions.find(w => w.id === wreathType) || wreathOptions[0];
  };

  const handleConfirm = () => {
    const data = {
      coffin: {
        material: coffinMaterial,
        color: coffinColor,
        quantity: coffinQuantity,
        price: getCoffinPrice(),
      },
      wreath: {
        type: wreathType,
        size: wreathSize,
        text: wreathText,
        quantity: wreathQuantity,
        price: getWreathPrice(),
      },
      total: getTotalPrice(),
    };
    onConfirm?.(data);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 mb-4 rounded-xl">
        <h4 className="text-white text-base mb-1">Конфигуратор комплектации</h4>
        <p className="text-gray-300 text-xs">Настройте внешний вид и характеристики</p>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'coffin' | 'wreath')} className="w-full">
        <div className="bg-white border-b border-gray-200">
          <TabsList className="w-full h-auto p-1 bg-transparent rounded-none justify-start gap-1">
            <TabsTrigger 
              value="coffin" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white py-3 rounded-lg transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              Гроб
            </TabsTrigger>
            <TabsTrigger 
              value="wreath" 
              className="flex-1 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white py-3 rounded-lg transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" strokeWidth={2} />
                <circle cx="12" cy="12" r="4" strokeWidth={2} />
              </svg>
              Венок
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Coffin Tab */}
        <TabsContent value="coffin" className="mt-0">
          <div className="p-6 space-y-6">
            {/* 3D Visualization - Гипер-реалистичный визуализатор */}
            <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <div className="aspect-[4/3] relative">
                {activeTab === 'coffin' && (
                  <RealisticCoffinViewer
                    key={`viewer-${selectedWood.id}-${selectedLining.id}-${selectedHardware.id}`}
                    wood={selectedWood}
                    lining={selectedLining}
                    hardware={selectedHardware}
                    showLid={showLid}
                  />
                )}
                
                {/* Переключатель крышки */}
                <div className="absolute top-4 left-4 flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-1 border border-gray-200 shadow-md z-10">
                  <button
                    onClick={() => setShowLid(true)}
                    className={`px-3 py-1.5 rounded text-xs transition-all ${
                      showLid 
                        ? 'bg-gray-900 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Закрыт
                  </button>
                  <button
                    onClick={() => setShowLid(false)}
                    className={`px-3 py-1.5 rounded text-xs transition-all ${
                      !showLid 
                        ? 'bg-gray-900 text-white shadow-sm' 
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Открыт
                  </button>
                </div>
              </div>
            </div>

            {/* Material Selection - Порода дерева */}
            <div className="space-y-3">
              <Label className="text-gray-900">Порода дерева</Label>
              <div className="grid grid-cols-3 gap-3">
                {woodTypes.map((wood) => (
                  <button
                    key={wood.id}
                    onClick={() => {
                      setSelectedWood(wood);
                      setCoffinMaterial(wood.id);
                    }}
                    className={`relative flex flex-col items-center gap-2 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-amber-300 hover:shadow-md ${
                      selectedWood.id === wood.id
                        ? 'border-amber-500 bg-amber-50 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="relative w-full h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={wood.texture}
                        alt={wood.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedWood.id === wood.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900">{wood.name}</div>
                      <div className="text-xs text-gray-500">
                        {wood.price === 0 ? 'Базовая' : `+${wood.price.toLocaleString('ru-RU')} ₽`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Lining Selection - Внутренняя отделка */}
            <div className="space-y-3">
              <Label className="text-gray-900">Внутренняя отделка</Label>
              <div className="grid grid-cols-3 gap-3">
                {liningTypes.map((lining) => (
                  <button
                    key={lining.id}
                    onClick={() => setSelectedLining(lining)}
                    className={`relative flex flex-col items-center gap-2 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-purple-300 hover:shadow-md ${
                      selectedLining.id === lining.id
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="relative w-full h-20 rounded-lg overflow-hidden">
                      <ImageWithFallback
                        src={lining.texture}
                        alt={lining.name}
                        className="w-full h-full object-cover"
                      />
                      {selectedLining.id === lining.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900">{lining.name}</div>
                      <div className="text-xs text-gray-500">
                        {lining.price === 0 ? 'Базовая' : `+${lining.price.toLocaleString('ru-RU')} ₽`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Hardware Selection - Фурнитура */}
            <div className="space-y-3">
              <Label className="text-gray-900">Фурнитура (ручки и декор)</Label>
              <div className="grid grid-cols-3 gap-3">
                {hardwareTypes.map((hardware) => (
                  <button
                    key={hardware.id}
                    onClick={() => setSelectedHardware(hardware)}
                    className={`relative flex flex-col items-center gap-2 p-4 bg-white border-2 rounded-xl cursor-pointer transition-all hover:border-yellow-300 hover:shadow-md ${
                      selectedHardware.id === hardware.id
                        ? 'border-yellow-500 bg-yellow-50 shadow-lg'
                        : 'border-gray-200'
                    }`}
                  >
                    <div 
                      className="w-full h-20 rounded-lg flex items-center justify-center relative overflow-hidden"
                      style={{ background: hardware.metallic }}
                    >
                      {/* Имитация ручки */}
                      <div className="w-12 h-8 rounded-full border-4 shadow-lg" style={{ borderColor: hardware.color }}>
                        <div className="absolute inset-1 rounded-full border border-white/30" />
                      </div>
                      
                      {selectedHardware.id === hardware.id && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center z-10">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-900">{hardware.name}</div>
                      <div className="text-xs text-gray-500">
                        {hardware.price === 0 ? 'Базовая' : `+${hardware.price.toLocaleString('ru-RU')} ₽`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Palette */}
            <div className="space-y-3">
              <Label className="text-gray-900">Цвет отделки</Label>
              <div className="flex flex-wrap gap-3">
                {coffinColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setCoffinColor(color.hex)}
                    className={`group relative w-12 h-12 rounded-full transition-all hover:scale-110 ${
                      coffinColor === color.hex ? 'ring-4 ring-blue-500 ring-offset-2' : 'ring-2 ring-gray-200'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {coffinColor === color.hex && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Check className="w-6 h-6 text-white drop-shadow-lg" />
                      </div>
                    )}
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {color.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-gray-900">Количество</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCoffinQuantity(Math.max(1, coffinQuantity - 1))}
                  className="h-10 w-10 rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl text-gray-900">{coffinQuantity}</div>
                  <div className="text-xs text-gray-500">шт.</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setCoffinQuantity(coffinQuantity + 1)}
                  className="h-10 w-10 rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-4 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-blue-600 mb-1">Стоимость гроба</div>
                  <div className="text-2xl text-blue-900">
                    {getCoffinPrice().toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <svg className="w-12 h-12 text-blue-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Wreath Tab */}
        <TabsContent value="wreath" className="mt-0">
          <div className="p-6 space-y-6">
            {/* 3D Visualization */}
            <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-4 shadow-inner">
              <div className="aspect-[4/3]">
                <CoffinMockup
                  coffin={getCurrentCoffin()}
                  wreath={getCurrentWreath()}
                  lining={liningOptions[0]}
                  plaque={plaqueOptions[0]}
                  monument={monumentOptions[0]}
                />
              </div>
            </div>

            {/* Wreath Type */}
            <div className="space-y-3">
              <Label className="text-gray-900">Тип венка</Label>
              <RadioGroup value={wreathType} onValueChange={setWreathType}>
                <div className="grid grid-cols-2 gap-3">
                  {wreathOptions.map((type) => (
                    <div key={type.id} className="relative">
                      <RadioGroupItem
                        value={type.id}
                        id={`wreath-${type.id}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`wreath-${type.id}`}
                        className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-gray-200 rounded-xl cursor-pointer transition-all hover:border-green-300 hover:shadow-md peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 peer-data-[state=checked]:shadow-lg"
                      >
                        <div className="relative">
                          <ImageWithFallback
                            src={type.image}
                            alt={type.name}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          {wreathType === type.id && (
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                              <Check className="w-4 h-4 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="text-sm text-gray-900">{type.name}</div>
                          <div className="text-xs text-gray-500">от {type.price?.toLocaleString('ru-RU')} ₽</div>
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <Label className="text-gray-900">Размер</Label>
              <div className="grid grid-cols-3 gap-3">
                {wreathSizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => setWreathSize(size.id)}
                    className={`py-3 px-4 rounded-xl border-2 transition-all ${
                      wreathSize === size.id
                        ? 'border-green-500 bg-green-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="text-lg text-gray-900">{size.id}</div>
                    <div className="text-xs text-gray-500">{size.name}</div>
                    {size.price > 0 && (
                      <div className="text-xs text-green-600 mt-1">+{size.price} ₽</div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Ribbon Text */}
            <div className="space-y-3">
              <Label htmlFor="wreath-text" className="text-gray-900">
                Текст на ленте (опционально)
              </Label>
              <Input
                id="wreath-text"
                value={wreathText}
                onChange={(e) => setWreathText(e.target.value)}
                placeholder="Например: Вечная память"
                className="rounded-xl"
                maxLength={50}
              />
              <p className="text-xs text-gray-500">{wreathText.length}/50 символов</p>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <Label className="text-gray-900">Количество</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setWreathQuantity(Math.max(1, wreathQuantity - 1))}
                  className="h-10 w-10 rounded-xl"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-2xl text-gray-900">{wreathQuantity}</div>
                  <div className="text-xs text-gray-500">шт.</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setWreathQuantity(wreathQuantity + 1)}
                  className="h-10 w-10 rounded-xl"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-4 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-green-600 mb-1">Стоимость венка</div>
                  <div className="text-2xl text-green-900">
                    {getWreathPrice().toLocaleString('ru-RU')} ₽
                  </div>
                </div>
                <svg className="w-12 h-12 text-green-400 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" strokeWidth={2} />
                  <circle cx="12" cy="12" r="4" strokeWidth={2} />
                </svg>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer with Total and Confirm Button */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-5 border-t border-gray-700">
        <div className="flex items-start justify-between mb-4 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Общая стоимость</div>
            <div className="text-3xl text-white">
              {getTotalPrice().toLocaleString('ru-RU')} ₽
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-gray-400 mb-1">В комплект входит:</div>
            <div className="text-sm text-gray-300">
              Гроб ({coffinQuantity} шт.) + Венок ({wreathQuantity} шт.)
            </div>
          </div>
        </div>
        <Button 
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-6 rounded-xl shadow-lg hover:shadow-xl transition-all text-lg flex items-center justify-center"
        >
          <Check className="w-5 h-5 mr-2" />
          Подтвердить конфигурацию онлайн
        </Button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Вы сможете уточнить детали после отправки
        </p>
      </div>
    </div>
  );
}
