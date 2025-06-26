// src/features/home/components/LandingSection.jsx

import React, { Suspense, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { ArrowRight, LogIn } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext.jsx";
import RotatingHeadline from "@/components/textRotate";

// A self-contained, performant 3D particle background component
function ParticleBackground() {
  const ref = useRef();

  // Generate a cloud of 5000 random points
  const points = useMemo(() => {
    const p = new Float32Array(5000 * 3);
    for (let i = 0; i < p.length; i++) {
      p[i] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, []);

  // Animate the particle cloud on every frame
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 25;
      ref.current.rotation.y -= delta / 30;
    }
  });

  return (
    <Points ref={ref} positions={points} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#5271ff" size={0.015} sizeAttenuation={true} depthWrite={false} />
    </Points>
  );
}

// The main Landing Section component with the new design
export default function LandingSection() {
    const { user } = useAuth();
  const isLoggedIn = !!user;
  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center bg-black" role="region" aria-labelledby="landing-heading">
      {/* 3D Canvas for the background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 1] }}>
            <ParticleBackground />
          </Canvas>
        </Suspense>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Animated Headline */}
        <div className="animate-fade-in-up" style={{ animationDelay: "3s" }}>
          {/* Replace the static h1 with the new rotating headline component */}
          <RotatingHeadline />
        </div>

        {/* Animated Sub-headline */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
          <p className="mt-4 max-w-2xl text-lg md:text-xl text-neutral-300 leading-relaxed">A universe of high-quality, physics-based games built for competition and community. No downloads, no waiting.</p>
        </div>

        {/* Animated Call-to-Action Button */}
        <div className="mt-10 flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          {isLoggedIn ? (
            // --- BUTTON FOR LOGGED-IN USERS ---
            <Link to="/dashboard">
              <Button size="lg" className="group h-14 px-8 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                Go to Dashboard
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          ) : (
            // --- BUTTONS FOR LOGGED-OUT USERS ---
            <>
              <Link to="/register">
                <Button size="lg" className="group h-14 px-8 text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
                  Create Free Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="group h-14 px-8 text-base font-semibold text-neutral-300 border-neutral-700 bg-neutral-900/50 hover:bg-neutral-800 hover:text-white transition-colors duration-300">
                  <LogIn className="mr-2 h-5 w-5" />
                  Log In
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* You'll need to add this animation to your global CSS file, like `index.css` */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  );
}
