// src/sections/AboutSection.jsx
export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-black px-4 text-center" aria-labelledby="about-heading">
      <div className="max-w-3xl mx-auto">
        <h2 id="about-heading" className="text-4xl font-bold mb-4">
          About the Project
        </h2>
        <p className="text-lg text-gray-600">
          A platform to play with people around the world. You can drive around in a mutiplayer lobby, explore and destroy. Play mini games and set a new record. 
        </p>
      </div>
    </section>
  );
}
