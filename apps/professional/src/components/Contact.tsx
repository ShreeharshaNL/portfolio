import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: '' });

    // Client-side validation
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      setStatus({ type: 'error', message: 'Please enter your name (at least 2 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setStatus({ type: 'error', message: 'Please enter a message of at least 5 characters.' });
      return;
    }

    setLoading(true);

    try {
      // POST to /api/contact
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && (data.success !== false)) {
        setStatus({
          type: 'success',
          message: 'Thank you for reaching out! Your message has been received.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // If server returned an error
        setStatus({
          type: 'error',
          message: data.error || 'Unable to send message right now. Please email me directly.',
        });
      }
    } catch {
      // Offline fallback: save locally and notify user
      try {
        const stored = JSON.parse(localStorage.getItem('shreeharsha_offline_inquiries') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('shreeharsha_offline_inquiries', JSON.stringify(stored));
      } catch {}

      setStatus({
        type: 'success',
        message: 'Your inquiry has been noted! If urgent, please feel free to email directly at ' + personalInfo.social.email,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 border-t-2 border-[#111111]/15 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] overflow-hidden text-xs font-mono font-bold mb-4 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
            <span className="bg-[#5fb57a] text-[#111111] px-2.5 py-0.5 font-black">05</span>
            <span className="px-3 py-0.5 text-[#111111] dark:text-white uppercase tracking-wider">Contact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-[#111111] dark:text-white uppercase leading-[1.08]">
            Let's discuss opportunities or collaborations.
          </h2>
          <p className="mt-3 text-base text-[#111111]/75 dark:text-slate-400">
            Open for software engineering internships, technical collaborations, and full-stack projects. Feel free to reach out via the form below or directly through email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Communication Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="card-editorial p-6 sm:p-8 space-y-6">
              
              <h3 className="font-display text-lg font-black text-[#111111] dark:text-white uppercase">
                Contact Information
              </h3>

              {/* Email item */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                  Direct Email
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#ebebea] dark:bg-[#1a1d29] border-2 border-[#111111] dark:border-white/20 shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)]">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#111111] dark:text-slate-200 truncate">
                    {personalInfo.social.email}
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="ml-2 p-1.5 rounded-full border-2 border-[#111111] dark:border-white/20 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[1px_1px_0px_0px_#111111] hover:shadow-[2px_2px_0px_0px_#5fb57a] transition-all focus-ring"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-4 h-4 text-[#5fb57a]" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400">
                  Location
                </span>
                <p className="text-sm font-bold text-[#111111] dark:text-slate-300 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-[#5fb57a]" />
                  <span>{personalInfo.location}</span>
                </p>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t-2 border-[#111111]/10 dark:border-white/10 space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#111111]/60 dark:text-slate-400 block">
                  Professional Profiles
                </span>
                <div className="flex items-center space-x-3">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide border-2 border-[#111111] dark:border-white/25 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[3px_3px_0px_0px_#5fb57a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-extrabold uppercase tracking-wide border-2 border-[#111111] dark:border-white/25 bg-white dark:bg-[#15171f] text-[#111111] dark:text-white shadow-[2px_2px_0px_0px_#111111] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.15)] hover:shadow-[3px_3px_0px_0px_#5fb57a] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0 active:translate-y-0 transition-all focus-ring"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#5fb57a]" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick availability pill */}
            <div className="p-4 rounded-xl border-2 border-[#111111] dark:border-white/20 bg-[#5fb57a]/15 text-[#111111] dark:text-slate-200 text-xs font-medium flex items-start space-x-3 shadow-[3px_3px_0px_0px_#5fb57a]">
              <CheckCircle2 className="w-4 h-4 text-[#5fb57a] shrink-0 mt-0.5" />
              <span>Currently seeking 2025/2026 software engineering internships and collaborative full-stack projects.</span>
            </div>

          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="card-editorial p-6 sm:p-8">
              
              <h3 className="font-display text-xl font-black text-[#111111] dark:text-white uppercase mb-6">
                Send a Message
              </h3>

              {/* Status Banner */}
              {status.type && (
                <div
                  className={`mb-6 p-4 rounded-xl border-2 border-[#111111] flex items-start space-x-3 text-sm shadow-[3px_3px_0px_0px_#111111] ${
                    status.type === 'success'
                      ? 'bg-[#5fb57a]/20 text-[#111111] dark:text-white'
                      : 'bg-rose-500/20 text-rose-900 dark:text-rose-200'
                  }`}
                  role="alert"
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-[#5fb57a] shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1 font-semibold">{status.message}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-300">
                      Your Name <span className="text-[#5fb57a]">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] dark:border-white/25 bg-[#ebebea]/40 dark:bg-[#0b0c10] text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 text-sm focus:outline-none focus:border-[#5fb57a] focus:shadow-[3px_3px_0px_0px_#5fb57a] transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-300">
                      Your Email <span className="text-[#5fb57a]">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] dark:border-white/25 bg-[#ebebea]/40 dark:bg-[#0b0c10] text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 text-sm focus:outline-none focus:border-[#5fb57a] focus:shadow-[3px_3px_0px_0px_#5fb57a] transition-all"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-300">
                    Subject (Optional)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Internship Opportunity"
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] dark:border-white/25 bg-[#ebebea]/40 dark:bg-[#0b0c10] text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 text-sm focus:outline-none focus:border-[#5fb57a] focus:shadow-[3px_3px_0px_0px_#5fb57a] transition-all"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono font-bold uppercase tracking-wider text-[#111111] dark:text-slate-300">
                    Message <span className="text-[#5fb57a]">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project, role, or inquiry..."
                    className="w-full px-4 py-3 rounded-xl border-2 border-[#111111] dark:border-white/25 bg-[#ebebea]/40 dark:bg-[#0b0c10] text-[#111111] dark:text-white placeholder-[#111111]/40 dark:placeholder-white/40 text-sm focus:outline-none focus:border-[#5fb57a] focus:shadow-[3px_3px_0px_0px_#5fb57a] transition-all resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center space-x-2 px-7 py-3 rounded-full bg-[#5fb57a] text-[#111111] font-extrabold text-xs uppercase tracking-wider border-2 border-[#111111] shadow-[3px_3px_0px_0px_#111111] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_#111111] active:translate-x-0 active:translate-y-0 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <a
                    href={`mailto:${personalInfo.social.email}`}
                    className="text-xs font-mono font-bold text-[#111111]/70 dark:text-slate-400 hover:text-[#111111] dark:hover:text-white underline self-center sm:self-auto"
                  >
                    Open Mail Client ↗
                  </a>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
