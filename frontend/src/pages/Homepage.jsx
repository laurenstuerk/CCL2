import { Link } from "react-router-dom";
import Background from "../assets/images/Fractal.jpg";
import reactLogo from "../assets/images/reactLogo.svg";
import tailwindLogo from "../assets/images/TailwindLogo.svg";
import reactRouterLogo from "../assets/images/reactRouterLogo.svg";
import viteLogo from "../assets/images/viteLogo.svg";
import blenderLogo from "../assets/images/blenderLogo.svg";
import splineLogo from "../assets/images/splineLogo.png";


import { List, User, PlusCircle, Edit, Trash2, Globe } from "lucide-react";

function HomePage() {
  return (
    // Main container for the entire page
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Full-Screen Welcome */}
      {/* This section takes full viewport height and width */}
      <section className="relative h-screen w-full bg-cover bg-center flex items-center justify-center  text-white border-b border-neutral-800">
        <div className="relative z-10 text-center p-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            Creative Code Lab #2
          </h1>
          <p className="text-xl font-[GeistMono] md:text-2xl mb-8">
            bla bla bla
          </p>
          <Link
            to="/login"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out m-2"
          >
            Go to Login
          </Link>
          <Link
            to="/register"
            className="inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            SignUp
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
