import { useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useTexture } from '@react-three/drei';

export interface WoodType {
  id: string;
  name: string;
  texture: string;
  color: string;
  price: number;
}

export interface LiningType {
  id: string;
  name: string;
  texture: string;
  color: string;
  price: number;
}

export interface HardwareType {
  id: string;
  name: string;
  color: string;
  metallic: string;
  price: number;
}

interface RealisticCoffinViewerProps {
  wood: WoodType;
  lining: LiningType;
  hardware: HardwareType;
  showLid?: boolean;
}

// 3D модель гроба
function CoffinModel({ wood, lining, hardware, showLid }: RealisticCoffinViewerProps) {
  // Основной корпус гроба (шестиугольная форма)
  return (
    <group position={[0, 0, 0]}>
      {/* Основной корпус */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2, 0.5, 3]} />
        <meshStandardMaterial
          color={wood.color}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Боковые панели (трапециевидные) */}
      <mesh position={[1.1, 0, 0.5]} rotation={[0, 0, Math.PI / 12]} castShadow>
        <boxGeometry args={[0.2, 0.5, 2]} />
        <meshStandardMaterial color={wood.color} roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[-1.1, 0, 0.5]} rotation={[0, 0, -Math.PI / 12]} castShadow>
        <boxGeometry args={[0.2, 0.5, 2]} />
        <meshStandardMaterial color={wood.color} roughness={0.4} metalness={0.1} />
      </mesh>

      {/* Крышка */}
      {showLid && (
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[2.1, 0.15, 3.1]} />
          <meshStandardMaterial
            color={wood.color}
            roughness={0.3}
            metalness={0.15}
          />
        </mesh>
      )}

      {/* Внутренняя обивка (если крышка открыта) */}
      {!showLid && (
        <>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1.9, 0.05, 2.9]} />
            <meshStandardMaterial color={lining.color} roughness={0.8} metalness={0.0} />
          </mesh>
          <mesh position={[0, 0.4, -1.4]} rotation={[Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.9, 0.4]} />
            <meshStandardMaterial color={lining.color} side={2} roughness={0.8} />
          </mesh>
        </>
      )}

      {/* Ручки (фурнитура) */}
      {[
        [-0.9, 0, 1],
        [-0.9, 0, -1],
        [0.9, 0, 1],
        [0.9, 0, -1],
      ].map((pos, i) => (
        <group key={i} position={pos as [number, number, number]}>
          <mesh castShadow>
            <torusGeometry args={[0.08, 0.02, 8, 16]} />
            <meshStandardMaterial
              color={hardware.color}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
          <mesh position={[0, 0, -0.05]}>
            <cylinderGeometry args={[0.03, 0.03, 0.1, 16]} />
            <meshStandardMaterial
              color={hardware.color}
              roughness={0.2}
              metalness={0.9}
            />
          </mesh>
        </group>
      ))}

      {/* Декоративные элементы на крышке */}
      {showLid && (
        <>
          <mesh position={[0, 0.38, 0]} castShadow>
            <boxGeometry args={[1.8, 0.02, 0.05]} />
            <meshStandardMaterial color={hardware.color} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.38, 1]} castShadow>
            <boxGeometry args={[1.8, 0.02, 0.05]} />
            <meshStandardMaterial color={hardware.color} roughness={0.2} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.38, -1]} castShadow>
            <boxGeometry args={[1.8, 0.02, 0.05]} />
            <meshStandardMaterial color={hardware.color} roughness={0.2} metalness={0.9} />
          </mesh>
        </>
      )}
    </group>
  );
}

export const woodTypes: WoodType[] = [
  {
    id: 'pine',
    name: 'Сосна',
    texture: 'https://images.unsplash.com/photo-1506968430777-bf7784a87f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kJTIwZ3JhaW4lMjB0ZXh0dXJlfGVufDF8fHx8MTc2MTk3OTY0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#8B7355',
    price: 0,
  },
  {
    id: 'oak',
    name: 'Дуб',
    texture: 'https://images.unsplash.com/photo-1525947088131-b701cd0f6dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwd29vZCUyMHRleHR1cmV8ZW58MXx8fHwxNzYxOTkwMDc2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#654321',
    price: 15000,
  },
  {
    id: 'mahogany',
    name: 'Красное дерево',
    texture: 'https://images.unsplash.com/photo-1506368149354-b45e5f4a5595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB3b29kJTIwdGV4dHVyZXxlbnwxfHx8fDE3NjE5OTAwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#4A0E0E',
    price: 35000,
  },
];

export const liningTypes: LiningType[] = [
  {
    id: 'satin-white',
    name: 'Атлас белый',
    texture: 'https://images.unsplash.com/photo-1504198458649-3128b932f49e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHNhdGluJTIwZmFicmljfGVufDF8fHx8MTc2MTk5MDEwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#F8F8F8',
    price: 0,
  },
  {
    id: 'velvet-burgundy',
    name: 'Бархат бордовый',
    texture: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjB2ZWx2ZXQlMjBmYWJyaWN8ZW58MXx8fHwxNzYxOTkwMTE0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#800020',
    price: 8000,
  },
  {
    id: 'silk-gold',
    name: 'Шёлк золотой',
    texture: 'https://images.unsplash.com/photo-1509043759401-136742328bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2xkJTIwc2lsayUyMGZhYnJpY3xlbnwxfHx8fDE3NjE5OTAxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    color: '#FFD700',
    price: 15000,
  },
];

export const hardwareTypes: HardwareType[] = [
  {
    id: 'brass',
    name: 'Латунь',
    color: '#B5A642',
    metallic: 'golden',
    price: 0,
  },
  {
    id: 'silver',
    name: 'Серебро',
    color: '#C0C0C0',
    metallic: 'silver',
    price: 5000,
  },
  {
    id: 'gold',
    name: 'Золото',
    color: '#FFD700',
    metallic: 'golden',
    price: 12000,
  },
];

export function RealisticCoffinViewer({ wood, lining, hardware, showLid = true }: RealisticCoffinViewerProps) {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-gray-100 via-gray-50 to-white rounded-2xl overflow-hidden border border-gray-200">
      <Canvas shadows gl={{ alpha: true }}>
        <color attach="background" args={['#f5f5f5']} />
        <Suspense fallback={null}>
          {/* Камера */}
          <PerspectiveCamera makeDefault position={[4, 3, 4]} fov={50} />
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={10}
            autoRotate
            autoRotateSpeed={1}
          />

          {/* Освещение - увеличенная интенсивность для светлой сцены */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={2.0}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <spotLight
            position={[-5, 8, -5]}
            intensity={1.2}
            angle={0.3}
            penumbra={1}
            castShadow
          />
          <pointLight position={[0, 3, 0]} intensity={0.8} color="#ffffff" />

          {/* Модель гроба */}
          <CoffinModel wood={wood} lining={lining} hardware={hardware} showLid={showLid} />

          {/* Тени - более мягкие для светлого фона */}
          <ContactShadows
            position={[0, -0.3, 0]}
            opacity={0.3}
            scale={10}
            blur={2.5}
            far={4}
          />

          {/* Окружение для отражений */}
          <Environment preset="apartment" />
        </Suspense>
      </Canvas>

      {/* Информация о конфигурации */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-4 py-3 rounded-xl border border-gray-200 shadow-lg">
        <div className="space-y-1 flex-1">
          <p className="text-gray-900 text-sm">{wood.name}</p>
          <div className="flex gap-3 text-xs text-gray-600">
            <span>Обивка: {lining.name}</span>
            <span>•</span>
            <span>Фурнитура: {hardware.name}</span>
          </div>
        </div>
        <div className="text-xs text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg">
          {showLid ? 'Закрытый' : 'Открытый'}
        </div>
      </div>
    </div>
  );
}