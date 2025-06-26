// src/pages/public/static/CareersPage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Briefcase, Telescope, Rocket, Sparkles, Inbox } from 'lucide-react';

export default function CareersPage() {
  return (
    <>
      
      <article className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <div className="text-center mb-12">
            <Briefcase className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
            <p className="text-xl text-neutral-300">
                We're building the future of browser gaming, and we're always looking for passionate, creative, and driven individuals to join our mission.
            </p>
        </div>

        <Separator className="my-8 bg-neutral-800" />

        {/* Why Work With Us Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center">Why Work At Ripground?</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <Rocket className="mx-auto h-10 w-10 text-purple-400 mb-3" />
              <h3 className="text-xl font-bold">Innovate & Create</h3>
              <p className="text-neutral-300 mt-2">Work with cutting-edge web technologies to build games that push the boundaries of what's possible in a browser.</p>
            </div>
            <div className="text-center p-6">
              <Sparkles className="mx-auto h-10 w-10 text-yellow-400 mb-3" />
              <h3 className="text-xl font-bold">Culture of Ownership</h3>
              <p className="text-neutral-300 mt-2">We're a small, collaborative team. Your ideas have a direct impact, and you'll have ownership over your projects from start to finish.</p>
            </div>
            <div className="text-center p-6">
              <Telescope className="mx-auto h-10 w-10 text-green-400 mb-3" />
              <h3 className="text-xl font-bold">Focus on Growth</h3>
              <p className="text-neutral-300 mt-2">We believe in learning and growing together. We support professional development and exploring new skills and technologies.</p>
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-neutral-800" />
        
        {/* Current Openings Section */}
        <section className="text-center">
          <h2 className="text-3xl font-semibold">Current Openings</h2>
          <div className="mt-6 max-w-2xl mx-auto p-8 bg-neutral-900 rounded-lg border border-neutral-800">
            <p className="text-lg text-neutral-300">
              We are not actively hiring for any specific roles at this moment.
            </p>
            <p className="mt-2 text-neutral-400">
              However, our plans are ambitious, and we are always on the lookout for exceptional talent.
            </p>
          </div>
        </section>

        <Separator className="my-10 bg-neutral-800" />
        
        {/* Future Opportunities Section */}
        <section className="text-center" aria-labelledby="future-opportunities-heading">
          <div className="max-w-3xl mx-auto">
            <Inbox className="mx-auto h-12 w-12 text-neutral-500 mb-4" />
            <h2 id="future-opportunities-heading" className="text-3xl font-bold">Future Opportunities</h2>
            <p className="mt-4 text-lg text-neutral-300">
              Think you'd be a great fit for the team? We'd love to hear from you. We keep a talent pool for future openings in areas like:
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
                <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">React Development</span>
                <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">3D / WebGL Artistry</span>
                <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">Game Design</span>
                <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm">Community Management</span>
            </div>
            <div className="mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                <a href="mailto:careers@ripground.com?subject=Future%20Opportunity%20Inquiry">Connect with Us</a>
              </Button>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}