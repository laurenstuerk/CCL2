// src/pages/public/static/TermsOfServicePage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';

export default function TermsOfServicePage() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Ripground</title>
        <meta name="description" content="Please read our Terms of Service carefully before using the Ripground website and services." />
      </Helmet>
      
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Terms of Service for Ripground</h1>
        <p className="text-sm text-neutral-400">Last Updated: June 15, 2025</p>

        <Separator className="my-8 bg-neutral-800" />

        <h2>1. Agreement to Terms</h2>
        <p>
          By accessing our website, Ripground.win, and using our Services, you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of the terms, then you may not access the Service.
        </p>

        <h2>2. User Accounts</h2>
        <p>
          When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
        </p>

        <h2>3. User Conduct</h2>
        <p>
          You agree not to use the Service to:
        </p>
        <ul>
          <li>Violate any local, state, national, or international law.</li>
          <li>Post or transmit any material that is abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable.</li>
          <li>Use cheats, exploits, automation software, bots, hacks, mods, or any unauthorized third-party software designed to modify or interfere with the Service.</li>
          <li>Attempt to gain unauthorized access to the Service, user accounts, or computer systems or networks connected to the Service.</li>
        </ul>
        
        <h2>4. Intellectual Property</h2>
        <p>
          The Service and its original content, features, and functionality are and will remain the exclusive property of Ripground and its licensors. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Ripground.
        </p>

        <h2>5. Termination</h2>
        <p>
          We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Service will immediately cease.
        </p>
        
        <h2>6. Limitation of Liability</h2>
        <p>
          In no event shall Ripground, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your use of the Service.
        </p>
        
        <h2>7. Governing Law</h2>
        <p>
          These Terms shall be governed and construed in accordance with the laws of Austria, without regard to its conflict of law provisions.
        </p>
        
        <h2>8. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at: <a href="mailto:contact@ripground.win" className="text-blue-400 hover:underline">contact@ripground.win</a>.
        </p>
      </article>
    </>
  );
}