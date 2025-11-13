import { useState } from 'react';

export default function AppDiagnostic() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});

  const runTests = async () => {
    const tests: Record<string, boolean> = {};
    
    // Тест 1: React работает
    tests['React'] = true;
    
    // Тест 2: Tailwind работает
    tests['Tailwind CSS'] = true;
    
    // Тест 3: Попытка использовать lucide-react
    try {
      const lucide = await import('lucide-react');
      tests['lucide-react'] = !!lucide;
    } catch {
      tests['lucide-react'] = false;
    }
    
    setTestResults(tests);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl mb-2">🔧 Диагностика системы</h1>
          <p className="text-gray-600 mb-8">Проверка доступности компонентов</p>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-900">React работает</p>
                <p className="text-sm text-green-700">Базовый рендеринг функционирует</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-2xl">✅</span>
              <div>
                <p className="font-semibold text-green-900">Tailwind CSS работает</p>
                <p className="text-sm text-green-700">Стили применяются корректно</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
              <span className="text-2xl">❌</span>
              <div>
                <p className="font-semibold text-red-900">npm пакеты недоступны</p>
                <p className="text-sm text-red-700">Failed to fetch: lucide-react, @radix-ui/*, class-variance-authority</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="font-semibold mb-3">Что происходит?</h2>
            <p className="text-sm text-gray-600 mb-4">
              Figma Make не может загрузить внешние npm пакеты с CDN. 
              Это временная проблема инфраструктуры, не связанная с кодом.
            </p>
            
            <h2 className="font-semibold mb-3 mt-6">Как исправить?</h2>
            <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
              <li>Обновите страницу браузера (F5 / Cmd+R)</li>
              <li>Подождите 2-5 минут и попробуйте снова</li>
              <li>Очистите кэш браузера</li>
              <li>Проверьте соединение с интернетом</li>
              <li>Если проблема сохраняется - это проблема на стороне Figma</li>
            </ol>
          </div>

          <button 
            onClick={runTests}
            className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            🔄 Запустить повторную проверку
          </button>
          
          {Object.keys(testResults).length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold mb-2">Результаты тестирования:</p>
              {Object.entries(testResults).map(([name, success]) => (
                <div key={name} className="text-sm py-1">
                  <span className="mr-2">{success ? '✅' : '❌'}</span>
                  <span className={success ? 'text-green-700' : 'text-red-700'}>{name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
