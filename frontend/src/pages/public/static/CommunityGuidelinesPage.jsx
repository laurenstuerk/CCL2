// src/pages/public/static/CommunityGuidelinesPage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';
import { Users, Heart, Shield, MessageSquare, ThumbsUp } from 'lucide-react';

export default function CommunityGuidelinesPage() {
  return (
    <>
      <Helmet>
        <title>Community Guidelines - Ripground</title>
        <meta name="description" content="Our guidelines for maintaining a safe, respectful, and fun community for all players at Ripground." />
      </Helmet>
      
      <article className="prose prose-invert prose-lg max-w-none">
        <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Ripground Community Guidelines</h1>
            <p className="text-xl text-neutral-300">
                Welcome to the Ripground community! Our goal is to create a fun, competitive, and inclusive environment where everyone feels safe and respected. These guidelines are the foundation of our community.
            </p>
        </div>

        <Separator className="my-8 bg-neutral-800" />

        {/* --- Core Principles Section --- */}
        <section>
          <h2 className="text-3xl font-semibold text-center">Our Core Principles</h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0"><Heart className="h-8 w-8 text-green-400" /></div>
              <div>
                <h3 className="text-xl font-bold">Be Respectful</h3>
                <p className="text-neutral-300">Treat others as you would like to be treated. We are a diverse global community. Disagreements may happen, but they should be handled with mutual respect. Personal attacks, insults, and name-calling are not acceptable.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0"><Shield className="h-8 w-8 text-purple-400" /></div>
              <div>
                <h3 className="text-xl font-bold">Keep it Safe & Clean</h3>
                <p className="text-neutral-300">Do not share content that is sexually explicit, graphically violent, or promotes illegal activities. Protect your own and others' privacy by not sharing personal information.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0"><ThumbsUp className="h-8 w-8 text-yellow-400" /></div>
                <div>
                    <h3 className="text-xl font-bold">Play Fair</h3>
                    <p className="text-neutral-300">Honor the spirit of competition. The use of cheats, hacks, exploits, or any unauthorized third-party software to gain an unfair advantage is strictly prohibited. Play with integrity.</p>
                </div>
            </div>
            <div className="flex gap-4 items-start">
                <div className="flex-shrink-0"><MessageSquare className="h-8 w-8 text-orange-400" /></div>
                <div>
                    <h3 className="text-xl font-bold">Communicate Constructively</h3>
                    <p className="text-neutral-300">Whether giving feedback on a game or chatting with other players, keep your communication constructive and on-topic. Trolling, spamming, and intentionally disrupting conversations are not welcome.</p>
                </div>
            </div>
          </div>
        </section>

        <Separator className="my-10 bg-neutral-800" />

        {/* --- Rules and Enforcement Section --- */}
        <section>
          <h2 className="text-3xl font-semibold mb-6">Rules & Enforcement</h2>
          <p>To ensure our community remains a positive space, the following actions are strictly forbidden and may result in account warnings, temporary suspensions, or permanent bans:</p>
          <ul className="mt-4 space-y-2">
            <li><strong className="text-white">Hate Speech & Harassment:</strong> Any form of discrimination, harassment, bullying, or speech that targets individuals or groups based on race, ethnicity, religion, gender, sexual orientation, disability, or any other identity is not tolerated.</li>
            <li><strong className="text-white">Spam & Self-Promotion:</strong> Do not spam chat channels or post unsolicited advertisements for your own products, services, or channels.</li>
            <li><strong className="text-white">Impersonation:</strong> Do not impersonate other players, community figures, or Ripground staff.</li>
            <li><strong className="text-white">Sharing Private Information:</strong> Do not share the private information of others (also known as "doxxing"). This is a serious violation of privacy and will be dealt with severely.</li>
          </ul>
        </section>
        
        <Separator className="my-10 bg-neutral-800" />

        {/* --- Reporting Section --- */}
        <section>
          <h2 className="text-3xl font-semibold mb-4">See Something, Say Something</h2>
          <p>
            You are a vital part of keeping our community great. If you witness a player breaking these guidelines, please use the in-game reporting tools or contact our support team directly. Reporting helps us identify and address issues quickly, ensuring a better experience for everyone.
          </p>
          <div className="mt-6">
            <a href="mailto:support@ripground.com" className="text-blue-400 hover:underline font-semibold">Report an Issue to Support &rarr;</a>
          </div>
        </section>
      </article>
    </>
  );
}