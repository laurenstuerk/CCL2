// src/pages/public/static/PrivacyPolicyPage.jsx

import { Helmet } from 'react-helmet-async';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Ripground</title>
        <meta name="description" content="Read the Ripground Privacy Policy to understand how we collect, use, and protect your data when you use our services." />
      </Helmet>
      
      <article className="prose prose-invert prose-lg max-w-none">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy for Ripground</h1>
        <p className="text-sm text-neutral-400">Last Updated: June 15, 2025</p>

        <Separator className="my-8 bg-neutral-800" />
        
        <h2>1. Introduction</h2>
        <p>
          Welcome to Ripground. We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, Ripground.win, and use our services (collectively, the "Services"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
        </p>

        <h2>2. Information We Collect</h2>
        <p>We may collect information about you in a variety of ways. The information we may collect on the Site includes:</p>
        
        <h3>a. Personal Data</h3>
        <p>
            Personally identifiable information, such as your name, username, email address, and demographic information, such as your age, gender, and country, that you voluntarily give to us when you register with the Services or when you choose to participate in various activities related to the Services, such as online games.
        </p>

        <h3>b. Gameplay Data</h3>
        <p>
            Information related to your in-game activity, such as scores, race times, achievements, game progress, and interactions with other players.
        </p>

        <h2>3. How We Use Your Information</h2>
        <p>
            Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Services to:
        </p>
        <ul>
            <li>Create and manage your account.</li>
            <li>Operate and manage our games and leaderboards.</li>
            <li>Email you regarding your account or order.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Services.</li>
            <li>Notify you of updates to the Services.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Respond to customer service requests.</li>
        </ul>

        <h2>4. Data Security</h2>
        <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>
        
        <h2>5. Your Data Protection Rights</h2>
        <p>
            Depending on your location, you may have certain rights under data protection laws (such as GDPR). These may include the right to access, update, or delete the information we have on you, the right of rectification, the right to object, and the right to data portability.
        </p>

        <h2>6. Changes to This Privacy Policy</h2>
        <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
        </p>

        <h2>7. Contact Us</h2>
        <p>
            If you have questions or comments about this Privacy Policy, please contact us at: <a href="mailto:contact@ripground.win" className="text-blue-400 hover:underline">contact@ripground.win</a>.
        </p>
      </article>
    </>
  );
}