// src/pages/public/static/HelpCenterPage.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LifeBuoy, Search } from 'lucide-react';

// Static data for the frequently asked questions
const faqData = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, go to the login page and click the 'Forgot Password?' link. You will receive an email with instructions on how to set a new one."
  },
  {
    question: "Can I change my username or email?",
    answer: "Yes. You can update your username, email, and other personal details by navigating to your Profile page and selecting 'Edit Profile'."
  },
  {
    question: "How do I enable Two-Factor Authentication (2FA)?",
    answer: "For added security, you can enable 2FA in your account settings. Go to Profile -> Security, and you will find the option to set up Two-Factor Authentication using an authenticator app like Google Authenticator or Authy."
  },
  {
    question: "A game is not loading or is lagging. What should I do?",
    answer: "If a game is not performing correctly, please try these steps first: 1) Refresh the page. 2) Clear your browser's cache. 3) Ensure your browser is fully up-to-date. If the issue persists, please contact our support team."
  },
  {
    question: "How do game leaderboards work?",
    answer: "Leaderboards are updated in real-time. As soon as you complete a game, your score or time is submitted. At the start of each month, the leaderboards are reset to give everyone a fresh chance to compete."
  }
];

export default function HelpCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Filters the FAQ data based on the search term
  const filteredFaqData = faqData.filter(item => 
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>

      <Helmet>
        <title>Help Center - Ripground</title>
        <meta name="description" content="Find answers to your questions or contact support for assistance." />
      </Helmet>

      <div className="text-white">
        {/* Header & Search Bar */}
        <header className="text-center pt-24 pb-16 bg-neutral-950 border-b border-neutral-800">
          <div className="max-w-3xl mx-auto px-4">
            <LifeBuoy className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h1 className="text-5xl font-bold tracking-tight">How can we help?</h1>
            <p className="mt-4 text-lg text-neutral-300">
              Search our frequently asked questions or contact support directly.
            </p>
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 pointer-events-none" />
              <Input
                type="search"
                placeholder="e.g. 'how to reset password'"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-6 text-base bg-neutral-900 border-neutral-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
                aria-label="Search help articles"
              />
            </div>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-16">
          <section id="faq-section" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl font-bold text-center mb-10">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-8">
              {filteredFaqData.length > 0 ? (
                filteredFaqData.map((item, index) => (
                  <div key={index} className="border-b border-neutral-800 pb-6">
                    <h3 className="text-xl font-semibold text-white">
                      {item.question}
                    </h3>
                    <p className="mt-2 text-neutral-300">
                      {item.answer}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center text-neutral-400 py-8 border border-dashed border-neutral-700 rounded-lg">
                  <p className="font-semibold">No results found for "{searchTerm}"</p>
                  <p className="text-sm mt-1">Please try searching with different keywords.</p>
                </div>
              )}
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="mt-20 py-16 text-center bg-neutral-900 rounded-lg border border-neutral-800" aria-labelledby="contact-heading">
            <h2 id="contact-heading" className="text-3xl font-bold">Still have questions?</h2>
            <p className="mt-3 text-neutral-300 max-w-2xl mx-auto">
              If you can't find the answer you're looking for, please don't hesitate to reach out to our support team.
            </p>
            <div className="mt-8">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" asChild>
                <a href="mailto:support@ripground.com">Contact Support</a>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
