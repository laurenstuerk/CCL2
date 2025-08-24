// src/pages/public/static/AboutUsPage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Target, Lightbulb, Heart, Gamepad2, ArrowRight } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <>
      <Helmet>
        <title>About Us - Ripground</title>
        <meta name="description" content="Learn about the mission, values, and team behind Ripground, dedicated to creating the next generation of browser games." />
      </Helmet>
      
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <header className="text-center pt-16 pb-12">
            <h1 className="text-5xl font-bold tracking-tight text-white">We're building the future of fun.</h1>
            <p className="mt-4 text-xl text-neutral-300 max-w-3xl mx-auto">
                Ripground is a passionate studio united by a single mission: to push the boundaries of what's possible in browser-based gaming.
            </p>
        </header>

        {/* Image/Visual Section */}
        <div className="my-12">
            <img 
                src="https://www.shutterstock.com/image-photo/ducks-on-lake-park-fall-600nw-2502818873.jpg" 
                alt="A team of developers collaborating" 
                className="rounded-lg aspect-video w-full object-cover border border-neutral-800 shadow-lg"
            />
        </div>

        {/* Our Story Section */}
        <section aria-labelledby="our-story-heading">
          <h2 id="our-story-heading" className="text-3xl font-bold text-center">Our Story</h2>
          <div className="mt-6 text-center max-w-3xl mx-auto space-y-4 text-neutral-300">
            <p>
                Ripground was founded by a group of friends who spent years in the AAA and indie game industries. We saw the incredible potential of the web as a gaming platform—a place where high-quality, deeply engaging experiences could be accessible to anyone, anywhere, without downloads or installations.
            </p>
            <p>
                Frustrated by the limitations of traditional distribution, we decided to forge our own path. Our focus is on combining innovative gameplay with stunning visuals, all powered by modern web technologies like WebGL and React.
            </p>
          </div>
        </section>

        <Separator className="my-16 bg-neutral-800" />
        
        {/* Our Values Section */}
        <section aria-labelledby="our-values-heading">
          <h2 id="our-values-heading" className="text-3xl font-bold text-center">What We Believe In</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
              <Lightbulb className="mx-auto h-10 w-10 text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold">Innovation</h3>
              <p className="text-neutral-400 mt-2">We constantly explore new technologies to create gameplay mechanics that feel fresh, exciting, and unique to the web platform.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
              <Heart className="mx-auto h-10 w-10 text-green-400 mb-4" />
              <h3 className="text-2xl font-bold">Player-First</h3>
              <p className="text-neutral-400 mt-2">Our players are at the heart of everything we do. We build our games and community with respect, fairness, and a deep commitment to fun.</p>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
              <Target className="mx-auto h-10 w-10 text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold">Quality & Polish</h3>
              <p className="text-neutral-400 mt-2">From the smallest UI element to the largest game world, we are obsessed with quality. We believe polished details create unforgettable experiences.</p>
            </div>
          </div>
        </section>

        <Separator className="my-16 bg-neutral-800" />

        {/* Join Us Section */}
        <section className="text-center bg-neutral-900 p-12 rounded-lg border border-neutral-800" aria-labelledby="join-us-heading">
          <Gamepad2 className="mx-auto h-12 w-12 text-blue-400 mb-4" />
          <h2 id="join-us-heading" className="text-3xl font-bold">Become Part of Our World</h2>
          <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
            Our journey is just beginning. Dive into our games, climb the leaderboards, and join a community of players who love gaming as much as we do.
          </p>
          <div className="mt-8">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
              <Link to="/dashboard">Explore Games <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}