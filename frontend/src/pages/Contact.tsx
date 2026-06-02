import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, MessageCircle, AlertCircle } from 'lucide-react';
import SEOHelmet from '@/components/seo/SEOHelmet';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const name = (data.get('name') as string || '').trim();
    const email = (data.get('email') as string || '').trim();
    const message = (data.get('message') as string || '').trim();
    const newErrors: Record<string, string> = {};

    if (!name || name.length < 2) newErrors.name = 'Please enter your name (at least 2 characters)';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Please enter a valid email address';
    if (!message || message.length < 10) newErrors.message = 'Please enter a message (at least 10 characters)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate(e.currentTarget)) return;
    setSending(true);
    // Simulate send — replace with actual API call
    await new Promise(r => setTimeout(r, 1200));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <main id="main-content" className="min-h-screen bg-brand-warm">
      <SEOHelmet
        title="Contact FitFeky — Get Support for Your Wellness Journey"
        description="Have questions about your personalized fitness plan? Contact the FitFeky team. We typically respond within 24 hours."
        canonicalPath="/contact"
      />

      <section className="relative pt-36 pb-20 md:pb-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-brand-blush/10 to-transparent" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="animate-fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-sage/10 text-brand-sage text-[10px] font-bold uppercase tracking-[0.25em] rounded-full mb-5 border border-brand-sage/20">
                <MessageCircle size={12} /> Get in Touch
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-brand-ink mb-6 leading-tight">
                Let&apos;s{' '}
                <span className="text-brand-sage italic">Connect</span>
              </h1>
              <p className="text-lg text-brand-muted mb-8 leading-relaxed">
                Have questions about your plan? Or just want to say hi? We&apos;d love to hear from you.
              </p>

              <div className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-brand-sage shadow-sm border border-brand-border/20 group-hover:bg-brand-sage group-hover:text-white transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted/70">Email Us</p>
                  <a href="mailto:support@fitfeky.com" className="text-lg font-semibold text-brand-ink hover:text-brand-sage transition-colors">
                    support@fitfeky.com
                  </a>
                </div>
              </div>
            </div>

            <div className="animate-fadeIn bg-white p-8 md:p-10 rounded-2xl border border-brand-border/30 shadow-xl">
              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-20 h-20 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mb-6 mx-auto">
                    <CheckCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-serif text-brand-ink mb-4">Message Sent!</h2>
                  <p className="text-brand-muted">
                    Thank you for reaching out. Our team will get back to you within 24&ndash;48 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-brand-sage font-bold text-sm hover:underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted/70 mb-2">Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      minLength={2}
                      placeholder="Your name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`w-full p-4 rounded-xl border outline-none transition-all bg-brand-warm/50 ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-brand-border/40 focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/10'}`}
                    />
                    {errors.name && <p id="name-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted/70 mb-2">Email</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full p-4 rounded-xl border outline-none transition-all bg-brand-warm/50 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-brand-border/40 focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/10'}`}
                    />
                    {errors.email && <p id="email-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted/70 mb-2">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      minLength={10}
                      rows={4}
                      placeholder="How can we help?"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`w-full p-4 rounded-xl border outline-none transition-all resize-none bg-brand-warm/50 ${errors.message ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100' : 'border-brand-border/40 focus:border-brand-sage focus:ring-2 focus:ring-brand-sage/10'}`}
                    />
                    {errors.message && <p id="message-error" className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.message}</p>}
                  </div>
                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-brand-sage text-white p-4 rounded-xl font-bold text-base hover:bg-brand-sage/90 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {sending ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
