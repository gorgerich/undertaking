export default function AppTest() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl">Тест работоспособности</h1>
        <p className="text-gray-600">Если вы видите этот текст, React работает</p>
        <p className="text-sm text-gray-500">
          Проблема: Failed to fetch npm пакетов (lucide-react, @radix-ui, etc.)
        </p>
        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md mx-auto">
          <p className="text-sm text-yellow-800">
            ⚠️ Это временная проблема с CDN Figma Make.
          </p>
          <p className="text-xs text-yellow-700 mt-2">
            Решение: Подождите несколько минут и обновите страницу
          </p>
        </div>
      </div>
    </div>
  );
}
