// src/sections/TechStackSection.jsx
import reactLogo from "../../../assets/images/reactLogo.svg";
import tailwindLogo from "../../../assets/images/TailwindLogo.svg";
import viteLogo from "../../../assets/images/viteLogo.svg";
import reactRouterLogo from "../../../assets/images/reactRouterLogo.svg";

const stack = [
  { name: "React", logo: reactLogo },
  { name: "Tailwind", logo: tailwindLogo },
  { name: "Vite", logo: viteLogo },
  { name: "React Router", logo: reactRouterLogo },
];

export default function TechStackSection() {
  return (
    <section className="w-full py-20 bg-neutral-900 text-gray-100 px-4" aria-labelledby="stack-heading">
      <div className="max-w-5xl mx-auto text-center">
        <h2 id="stack-heading" className="text-4xl font-bold mb-12">Tech Stack</h2>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {stack.map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <img src={tech.logo} alt={`${tech.name} logo`} className="h-16 mb-2" />
              <p className="text-sm font-medium">{tech.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
