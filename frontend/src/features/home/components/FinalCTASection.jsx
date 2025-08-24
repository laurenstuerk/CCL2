// src/features/home/components/FinalCTASection.jsx

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function FinalCTASection() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  return (
    <section className="relative w-full py-20 md:py-32" role="region" aria-labelledby="final-cta-heading">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[60vh] bg-blue-900/40 rounded-full blur-3xl opacity-40 pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto">
          <Sparkles className="mx-auto h-10 w-10 text-blue-400 mb-4" />
          <h2 id="final-cta-heading" className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
            Your Next Adventure Awaits
          </h2>
          <p className="mt-4 text-lg text-neutral-300">Create your free account in seconds and dive into a universe of instant-play games. The competition is waiting.</p>
          <div className="mt-10">
            <Link to={isLoggedIn ? "/dashboard" : "/register"}>
              <Button size="lg" className="group h-16 px-10 text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]">
                {isLoggedIn ? "Go to Dashboard" : "Sign Up for Free"}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
