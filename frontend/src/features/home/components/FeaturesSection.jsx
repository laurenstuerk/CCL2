// src/sections/FeaturesSection.jsx
import { Globe, User, List, Edit, PlusCircle } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    { icon: <User className="w-6 h-6" />, title: "User Management", desc: "Register, login, and update user data securely." },
    { icon: <Edit className="w-6 h-6" />, title: "Editable Profiles", desc: "Personalize your profile and info." },
    { icon: <Globe className="w-6 h-6" />, title: "Public Profiles", desc: "Explore other developers' work." },
    { icon: <List className="w-6 h-6" />, title: "Modular Design", desc: "Easily extend and adapt the UI." },
  ];

  return (
    <section className="w-full py-24 bg-gray-900 text-white px-4" aria-labelledby="features-heading">
      <div className="max-w-6xl mx-auto">
        <h2 id="features-heading" className="text-4xl font-bold text-center mb-12">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-4 p-6 bg-slate-800 rounded-xl">
              <div className="text-blue-400">{feature.icon}</div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-slate-300">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
