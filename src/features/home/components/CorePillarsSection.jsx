// src/features/home/components/InteractiveCubeSection.jsx

import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Zap, Trophy, Layers, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Data for our pillars ---
const pillars = [
  {
    icon: <Zap size={28} />,
    title: "Instant Access",
    description: "No downloads, no waiting. Jump directly into high-quality games from any modern browser, on any device."
  },
  {
    icon: <Trophy size={28} />,
    title: "True Competition",
    description: "Climb the ranks on global and game-specific leaderboards that reset monthly, offering a fresh challenge for everyone."
  },
  {
    icon: <Layers className='shadow-2xl shadow-blue-400' size={28} />,
    title: "Creator Driven",
    description: "Our platform is being built from the ground up to empower developers to upload, share, and monetize their own browser games."
  }
];

// --- The Interactive 3D Cube Component ---
function DraggableCube() {
  const meshRef = useRef();

  // A subtle auto-rotation effect
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color="#1e3a8a"
        emissive="#3b82f6"
        emissiveIntensity={1.5}
        metalness={0.9}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}


// --- The Main Section Component ---
export default function InteractiveCubeSection() {
  const [activePillarIndex, setActivePillarIndex] = useState(0);

  const cyclePillar = (direction) => {
    if (direction === 'next') {
        setActivePillarIndex(prevIndex => (prevIndex + 1) % pillars.length);
    } else {
        setActivePillarIndex(prevIndex => (prevIndex - 1 + pillars.length) % pillars.length);
    }
  };

  const currentPillar = pillars[activePillarIndex];

  return (
    <section className="bg-black text-white py-20 md:py-32" role="region" aria-labelledby="interactive-section-heading">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="interactive-section-heading" className="text-4xl md:text-5xl font-bold tracking-tighter">
            Our Core Philosophy
          </h2>
          <p className="mt-4 text-lg text-neutral-400">
            Discover the principles that drive every game and feature on the Ripground platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side: 3D Canvas */}
          <div className="relative h-80 lg:h-96 cursor-grab active:cursor-grabbing">
            <Suspense fallback={<div className="w-full h-full bg-neutral-900 rounded-lg animate-pulse"></div>}>
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                {/* OrbitControls enables camera manipulation (drag to rotate) */}
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
                <DraggableCube />
              </Canvas>
            </Suspense>
          </div>

          {/* Right Side: Text Content with Cycle Buttons */}
          <div className="relative">
             <div className="flex items-center gap-4">
                <div className="flex-shrink-0 flex items-center justify-center h-16 w-16 bg-neutral-900 rounded-lg border border-neutral-800 text-blue-400">
                    {currentPillar.icon}
                </div>
                <h3 className="text-4xl font-bold text-white tracking-tight">
                    {currentPillar.title}
                </h3>
             </div>
             <p className="mt-6 text-xl text-neutral-300 leading-relaxed min-h-[140px]">
                {currentPillar.description}
             </p>
             {/* Navigation for Pillars */}
             <div className="mt-8 flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={() => cyclePillar('prev')} aria-label="Previous pillar">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                 <Button variant="outline" size="icon" onClick={() => cyclePillar('next')} aria-label="Next pillar">
                    <ArrowRight className="h-5 w-5" />
                </Button>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
