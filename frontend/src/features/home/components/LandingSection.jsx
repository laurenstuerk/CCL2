// src/sections/LandingSection.jsx
import { Link } from "react-router-dom";
import Aurora from "../../../components/backgrounds/Aurora.jsx";

export default function LandingSection() {
  return (
    <section
      className="relative w-full h-screen flex flex-col items-center justify-center text-white bg-gradient-to-br from-slate-900 via-black to-slate-900 px-4 text-center"
      role="region"
      aria-labelledby="landing-heading"
    >
      <Aurora
        colorStops={["#30588c", "#73295a", "#FF3232"]}
        blend={1}
        amplitude={0.5}
        speed={0.5}
      />
      <div className="z-10 max-w-2xl animate-fade-in-up">
        <h1
          id="landing-heading"
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          RIPGROUND
        </h1>
        <p className="GeistMono text-xl md:text-2xl text-slate-300 mb-8 ">
          Connect, explore, and challenge others with the power of 3D.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-6 py-3 bg-sky-600 rounded-lg text-lg font-medium hover:bg-blue-700 focus:outline focus:ring-2 focus:ring-blue-900"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-cyan-600 text-slate-900 rounded-lg text-lg font-medium hover:bg-cyan-900 focus:outline focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </section>
  );
}
