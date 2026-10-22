import React, { useState } from 'react';
import { 
  Mail, 
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
    <section id="contact" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-[#0b0e14]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-mono text-xs font-semibold tracking-wider uppercase mb-2">
            <Mail className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's discuss opportunities or collaborations.
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-400">
            Open for software engineering internships, technical collaborations, and full-stack projects. Feel free to reach out via the form below or directly through email.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Direct Communication Details (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm space-y-5">
              
              <h3 className="text-base font-semibold text-slate-900 dark:text-white">
                Contact Information
              </h3>

              {/* Email item */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase text-slate-400">Direct Email</span>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                    {personalInfo.social.email}
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="ml-2 p-1.5 rounded-md text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors focus-ring"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-slate-400">Location</span>
                <p className="text-sm text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{personalInfo.location}</span>
                </p>
              </div>

              {/* Social Profiles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <span className="text-xs font-mono uppercase text-slate-400">Professional Profiles</span>
                <div className="flex items-center space-x-3 pt-1">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-slate-900 dark:hover:border-white text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-ring"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-700 hover:border-indigo-600 dark:hover:border-indigo-400 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors focus-ring"
                  >
                    <LinkedinIcon className="w-4 h-4 text-indigo-500" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Quick availability pill */}
            <div className="p-4 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20 text-xs text-emerald-800 dark:text-emerald-300 flex items-start space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Currently seeking 2025/2026 software engineering internships and collaborative full-stack projects.</span>
            </div>

          </div>

          {/* Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#10141e] shadow-sm">
              
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-5">
                Send a Message
              </h3>

              {/* Status Banner */}
              {status.type && (
                <div
                  className={`mb-6 p-4 rounded-xl flex items-start space-x-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300'
                  }`}
                  role="alert"
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">{status.message}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400">
                    Subject (Optional)
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Internship Opportunity"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="block text-xs font-mono uppercase text-slate-600 dark:text-slate-400">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Briefly describe your project, role, or inquiry..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-ring"
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
                    className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 underline"
                  >
                    Open Mail Client
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
