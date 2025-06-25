// src/pages/public/static/CreateGamePage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { UploadCloud, Gamepad, Share2, DollarSign, Hammer } from "lucide-react";

export default function CreateGamePage() {
  return (
    <>
      <Helmet>
        <title>Create Games - Ripground</title>
        <meta name="description" content="Learn about the upcoming Ripground creator platform. Upload your own browser games and share them with the world." />
      </Helmet>

      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <header className="text-center pt-16 pb-12">
          <Hammer className="mx-auto h-12 w-12 text-blue-400 mb-4" />
          <h1 className="text-5xl font-bold tracking-tight text-white">The Creator's Workshop</h1>
          <p className="mt-4 text-xl text-neutral-300 max-w-3xl mx-auto">Build, upload, and share your games with a passionate community. The next generation of game development is here.</p>
        </header>

        {/* "Under Development" Notice */}
        <div className="text-center my-12">
          <div className="inline-block bg-yellow-900/50 border border-yellow-700 rounded-lg px-6 py-4">
            <h2 className="text-2xl font-bold text-yellow-300">Under Heavy Development</h2>
            <p className="text-neutral-300 mt-1">Our creator platform is launching soon! The information below outlines our vision for the platform.</p>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="py-12" aria-labelledby="how-it-works-heading">
          <div className="text-center">
            <h2 id="how-it-works-heading" className="text-3xl font-bold">
              From Your Code to Our Community
            </h2>
            <p className="mt-2 text-neutral-400">We're designing a simple, powerful pipeline to bring your games to our players.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold">1. Upload Your Build</h3>
              <p className="mt-2 text-neutral-300">Package your browser-ready game (HTML, CSS, JS, WebAssembly) into a single zip file. Our uploader will handle the rest.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <Gamepad className="mx-auto h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold">2. Publish & Play</h3>
              <p className="mt-2 text-neutral-300">Once uploaded, your game will be instantly available for the entire Ripground community to play, rate, and provide feedback on.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 text-center">
              <Share2 className="mx-auto h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold">3. Gain Visibility</h3>
              <p className="mt-2 text-neutral-300">Featured games get front-page promotion, community spotlights, and a chance to be included in official Ripground tournaments.</p>
            </div>
          </div>
        </section>

        <Separator className="my-16 bg-neutral-800" />

        {/* Call to Action Section */}
        <section className="text-center" aria-labelledby="get-notified-heading">
          <h2 id="get-notified-heading" className="text-3xl font-bold">
            Be the First to Know
          </h2>
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-300">Are you a game developer interested in publishing on Ripground? We're building a platform that's fair, transparent, and focused on empowering creators. Register your interest to get early access and updates.</p>
            <div className="mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                <a href="mailto:creators@ripground.com?subject=Creator%20Platform%20Interest">Register Interest</a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
