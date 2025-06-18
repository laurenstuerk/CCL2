// src/pages/public/static/ContactPage.jsx

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Shield, Handshake, Building } from 'lucide-react';
import { toast } from 'sonner';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real application, you would send this data to your backend or a service like Formspree.
    // For this example, we'll simulate an API call.
    console.log("Form Data Submitted:", formData);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Message Sent!", {
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      // Reset form after submission
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Ripground</title>
        <meta name="description" content="Get in touch with the Ripground team. We're here to help with support, business inquiries, and general questions." />
      </Helmet>
      
      <div className="prose prose-invert prose-lg max-w-none">
        {/* Header Section */}
        <header className="text-center pt-16 pb-12 bg-neutral-950 border-b border-neutral-800">
            <Mail className="mx-auto h-12 w-12 text-blue-400 mb-4" />
            <h1 className="text-5xl font-bold tracking-tight text-white">Get In Touch</h1>
            <p className="mt-4 text-lg text-neutral-300 max-w-2xl mx-auto">
                Have a question, a business proposal, or need support? We're here to help.
            </p>
        </header>

        <div className="py-16">
            {/* Contact Info Section */}
            <section className="container mx-auto" aria-labelledby="contact-options-heading">
                <h2 id="contact-options-heading" className="text-3xl font-bold text-center sr-only">Contact Options</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
                        <Shield className="mx-auto h-10 w-10 text-green-400 mb-3" />
                        <h3 className="text-xl font-bold">Support</h3>
                        <p className="text-neutral-400 mt-2">For technical issues, bug reports, or help with your account.</p>
                        <Button variant="link" asChild className="text-blue-400 mt-4 px-0">
                            <a href="mailto:support@ripground.win">support@ripground.win</a>
                        </Button>
                    </div>
                    <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
                        <Handshake className="mx-auto h-10 w-10 text-purple-400 mb-3" />
                        <h3 className="text-xl font-bold">Business & Press</h3>
                        <p className="text-neutral-400 mt-2">For partnership opportunities, press inquiries, or other business matters.</p>
                        <Button variant="link" asChild className="text-blue-400 mt-4 px-0">
                           <a href="mailto:business@ripground.win">business@ripground.win</a>
                        </Button>
                    </div>
                    <div className="bg-neutral-900 p-8 rounded-lg border border-neutral-800">
                        <Building className="mx-auto h-10 w-10 text-yellow-400 mb-3" />
                        <h3 className="text-xl font-bold">General Inquiries</h3>
                        <p className="text-neutral-400 mt-2">For everything else, including general questions and feedback.</p>
                         <Button variant="link" asChild className="text-blue-400 mt-4 px-0">
                           <a href="mailto:contact@ripground.win">contact@ripground.win</a>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="mt-20 container mx-auto" aria-labelledby="contact-form-heading">
                <div className="text-center">
                    <h2 id="contact-form-heading" className="text-3xl font-bold">Send Us a Message</h2>
                    <p className="mt-2 text-neutral-400">Or use the form below to get in touch directly.</p>
                </div>
                
                <form onSubmit={handleSubmit} className="mt-10 max-w-2xl mx-auto space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <Label htmlFor="name" className="text-neutral-300">Full Name</Label>
                            <Input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" />
                        </div>
                        <div>
                            <Label htmlFor="email" className="text-neutral-300">Email Address</Label>
                            <Input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="subject" className="text-neutral-300">Subject</Label>
                        <Input type="text" name="subject" id="subject" required value={formData.subject} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" />
                    </div>
                    <div>
                        <Label htmlFor="message" className="text-neutral-300">Message</Label>
                        <Textarea name="message" id="message" rows={6} required value={formData.message} onChange={handleChange} className="mt-2 bg-neutral-800 border-neutral-700" />
                    </div>
                    <div className="text-right">
                        <Button type="submit" size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </div>
                </form>
            </section>
        </div>
      </div>
    </>
  );
}