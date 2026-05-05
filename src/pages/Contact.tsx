import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Send, CheckCircle2 } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-brand-pink/10 pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-serif text-brand-ink mb-6">Let's <span className="text-brand-sage italic">Connect</span></h1>
            <p className="text-xl text-brand-muted mb-8 leading-relaxed">
              Have questions about your plan? Or just want to say hi? We'd love to hear from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-brand-sage shadow-sm group-hover:bg-brand-sage group-hover:text-white transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-muted">Email Us</p>
                  <a href="mailto:support@fitfeky.com" className="text-lg font-bold text-brand-ink hover:text-brand-sage transition-colors">
                    support@fitfeky.com
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 md:p-10 rounded-[3rem] border border-brand-border shadow-xl relative overflow-hidden"
          >
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-20 h-20 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center mb-6 mx-auto">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-serif text-brand-ink mb-4">Message Sent!</h2>
                <p className="text-brand-muted">
                  Thank you for reaching out. Our team will get back to you within 24–48 hours.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-brand-sage font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Your name"
                    className="w-full p-4 rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="name@example.com"
                    className="w-full p-4 rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-brand-muted mb-2">Message</label>
                  <textarea 
                    required
                    rows={4}
                    placeholder="How can we help?"
                    className="w-full p-4 rounded-2xl border-2 border-brand-border focus:border-brand-sage outline-none transition-all resize-none"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-brand-sage text-white p-4 rounded-full font-bold text-lg hover:bg-brand-sage/90 hover:-translate-y-1 transition-all flex justify-center items-center gap-3 border-b-4 border-black/10 active:border-b-0 active:translate-y-1"
                >
                  Send Message <Send size={18} />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
