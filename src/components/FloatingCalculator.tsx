import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { ChevronDown, ChevronUp, Download, Share2 } from './Icons';
import { cn } from './ui/utils';

interface CalculatorItem {
  name: string;
  price?: number;
}

interface CalculatorSection {
  category: string;
  price: number;
  items?: CalculatorItem[];
}

interface FloatingCalculatorProps {
  total: number;
  breakdown: CalculatorSection[];
}

export function FloatingCalculator({ total, breakdown }: FloatingCalculatorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation
    console.log('Download PDF');
  };

  const handleShare = () => {
    // TODO: Implement share functionality
    console.log('Share');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-6 pointer-events-none">
      <div
        className={cn(
          'relative overflow-hidden pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
          isExpanded ? 'w-full max-w-lg' : 'w-auto'
        )}
        style={{
          willChange: isExpanded ? 'transform, opacity' : 'auto'
        }}
      >
        {/* Liquid Glass Background - матовое непрозрачное стекло */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
            isExpanded ? 'rounded-2xl' : 'rounded-full'
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(250, 251, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px) saturate(150%)',
            WebkitBackdropFilter: 'blur(20px) saturate(150%)',
          }}
        />
        
        {/* Glass Border - тонкая матовая граница */}
        <div
          className={cn(
            'absolute inset-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
            isExpanded ? 'rounded-2xl' : 'rounded-full'
          )}
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(240,242,245,0.5) 50%, rgba(255,255,255,0.7) 100%)',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        
        {/* Inner Glow - светлый блик */}
        <div
          className={cn(
            'absolute inset-0 opacity-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden pointer-events-none',
            isExpanded ? 'rounded-2xl' : 'rounded-full'
          )}
          style={{
            boxShadow: 'inset 0 1px 2px 0 rgba(255,255,255,0.8), inset 0 -1px 1px 0 rgba(0,0,0,0.05)',
          }}
        />
        
        {/* Outer Shadow - мягкая тень */}
        <div
          className={cn(
            'absolute -inset-2 -z-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
            isExpanded ? 'rounded-3xl' : 'rounded-full'
          )}
          style={{
            filter: 'blur(20px)',
            opacity: 0.15,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.2) 0%, transparent 70%)',
          }}
        />

        <Card
          className={cn(
            'relative bg-transparent border-0 shadow-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden',
            isExpanded ? 'rounded-2xl' : 'rounded-full'
          )}
        >
          <CardContent className={cn('relative z-10 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]', isExpanded ? 'p-6' : 'py-3 px-6')}>
            <div
              className={cn(
                'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                !isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              )}
            >
              {/* Закрытое состояние */}
              <div className="flex items-center justify-between gap-8">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs text-gray-600">Текущая стоимость</span>
                  <span className="text-2xl text-gray-900 tabular-nums">{total.toLocaleString('ru-RU')} ₽</span>
                </div>
                <button
                  onClick={() => setIsExpanded(true)}
                  className="flex items-center gap-2 bg-transparent hover:bg-white/30 px-4 py-2 rounded-full transition-all duration-200"
                  style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                  }}
                >
                  <span className="text-sm text-gray-700">Детали</span>
                  <ChevronUp className="h-4 w-4 text-gray-700" />
                </button>
              </div>
            </div>

            <div
              className={cn(
                'transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]',
                isExpanded ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
              )}
            >
              {/* Открытое состояние */}
              <div className="space-y-4">
                {/* Заголовок */}
                <div className="flex items-center justify-between pb-4 border-b border-gray-200/30">
                  <h3 className="text-base text-gray-900">Детализация стоимости</h3>
                  <button
                    onClick={() => setIsExpanded(false)}
                    className="h-8 w-8 hover:bg-white/30 rounded-full transition-all duration-200 flex items-center justify-center"
                    style={{
                      border: 'none',
                      outline: 'none',
                      boxShadow: 'none',
                      background: 'transparent',
                    }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-700" />
                  </button>
                </div>

                {/* Список разбивки */}
                <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300/30 scrollbar-track-transparent">
                  {breakdown.map((section, index) => (
                    <div 
                      key={index} 
                      className="space-y-2 p-3 rounded-xl transition-all duration-200 hover:bg-white/40"
                      style={{
                        background: 'rgba(255,255,255,0.25)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.4)'
                      }}
                    >
                      {/* Категория */}
                      <div className="flex items-start justify-between">
                        <span className="text-sm text-gray-900">{section.category}</span>
                        <span className="text-sm text-gray-900 ml-4 whitespace-nowrap tabular-nums">
                          {section.price.toLocaleString('ru-RU')} ₽
                        </span>
                      </div>

                      {/* Подпункты */}
                      {section.items && section.items.length > 0 && (
                        <div className="space-y-1 pl-4 mt-2">
                          {section.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-start justify-between text-xs text-gray-600"
                            >
                              <span className="flex items-start gap-1.5">
                                <span className="mt-0.5">•</span>
                                <span>{item.name}</span>
                              </span>
                              {item.price !== undefined && (
                                <span className="ml-4 whitespace-nowrap text-gray-600 tabular-nums">
                                  {item.price.toLocaleString('ru-RU')} ₽
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Итого */}
                <div 
                  className="flex items-center justify-between pt-3 border-t border-gray-200/30 -mx-3 px-3 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.3)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                  }}
                >
                  <span className="text-base text-gray-900">Итого</span>
                  <span className="text-xl text-gray-900 tabular-nums">{total.toLocaleString('ru-RU')} ₽</span>
                </div>

                {/* Кнопки действий */}
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    onClick={handleDownloadPDF}
                    className="flex-1 flex items-center justify-center gap-2 border-gray-200/30 text-gray-700 hover:bg-white/30 transition-all duration-200 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <Download className="h-4 w-4" />
                    <span>PDF</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleShare}
                    className="flex-1 flex items-center justify-center gap-2 border-gray-200/30 text-gray-700 hover:bg-white/30 transition-all duration-200 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                    }}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>Поделиться</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
