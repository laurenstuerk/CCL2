// src/pages/public/static/TournamentsPage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Trophy, CalendarClock, Target, ArrowRight } from 'lucide-react';

export default function TournamentsPage() {
  // Get the name of the next month for the countdown
  const getNextMonth = () => {
    const d = new Date();
    d.setMonth(d.getMonth() + 1);
    return d.toLocaleString('en-US', { month: 'long' });
  };

  return (
    <>
      <Helmet>
        <title>Tournaments - Ripground</title>
        <meta name="description" content="Learn about the monthly leaderboard reset and the future of competitive tournaments at Ripground." />
      </Helmet>
      
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <header className="text-center pt-16 pb-12">
            <Trophy className="mx-auto h-12 w-12 text-yellow-400 mb-4" />
            <h1 className="text-5xl font-bold tracking-tight text-white">The Monthly Climb</h1>
            <p className="mt-4 text-xl text-neutral-300 max-w-3xl mx-auto">
                Your chance to prove your skills starts now. Welcome to the heart of competition at Ripground.
            </p>
        </header>

        {/* How It Works Section */}
        <section className="py-12" aria-labelledby="how-it-works-heading">
          <div className="text-center">
            <h2 id="how-it-works-heading" className="text-3xl font-bold">How It Works</h2>
            <p className="mt-2 text-neutral-400">While we gear up for large-scale, bracketed tournaments, our core competitive experience is the Monthly Climb.</p>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 flex items-start gap-6">
                <div className="flex-shrink-0"><CalendarClock className="h-10 w-10 text-blue-400" /></div>
                <div>
                    <h3 className="text-2xl font-bold">The Reset</h3>
                    <p className="mt-2 text-neutral-300">On the first day of every month, all game leaderboards are reset. This gives every player a fresh start and a new opportunity to claim the top spot.</p>
                </div>
            </div>
            <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800 flex items-start gap-6">
                <div className="flex-shrink-0"><Target className="h-10 w-10 text-green-400" /></div>
                <div>
                    <h3 className="text-2xl font-bold">The Goal</h3>
                    <p className="mt-2 text-neutral-300">Your objective is simple: achieve the highest scores and fastest times in our games. At the end of the month, the top players will be immortalized in our "Hall of Fame."</p>
                </div>
            </div>
          </div>
           <div className="text-center mt-12">
             <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                <Link to="/leaderboard">View Current Leaderboards</Link>
             </Button>
           </div>
        </section>

        <Separator className="my-16 bg-neutral-800" />
        
        {/* Future of Tournaments Section */}
        <section className="text-center" aria-labelledby="future-heading">
          <h2 id="future-heading" className="text-3xl font-bold">The Future of Competition</h2>
          <div className="mt-6 max-w-3xl mx-auto">
            <p className="text-lg text-neutral-300">
                The Monthly Climb is just the beginning. Our team is actively developing a full-featured tournament system that will include:
            </p>
            <ul className="mt-6 space-y-2 text-left list-none p-0">
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div><span>Live, bracket-style tournaments with entry fees and prize pools.</span></li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div><span>Team-based competitions and events.</span></li>
                <li className="flex items-center gap-3"><div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div><span>Special seasonal events with exclusive rewards.</span></li>
            </ul>
            <p className="mt-6 text-neutral-400">Stay tuned for more announcements. The arena is expanding!</p>
          </div>
        </section>
      </div>
    </>
  );
}