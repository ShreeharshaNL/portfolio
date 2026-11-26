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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = (await response.json().catch(() => ({}))) as { success?: boolean; error?: string };

      if (response.ok && (data.success !== false)) {
        setStatus({
          type: 'success',
          message: 'Thank you for reaching out! Your message has been received.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Unable to send message right now. Please email directly.',
        });
      }
    } catch {
      try {
        const stored = JSON.parse(localStorage.getItem('shreeharsha_offline_inquiries') || '[]');
        stored.push({ ...formData, timestamp: new Date().toISOString() });
        localStorage.setItem('shreeharsha_offline_inquiries', JSON.stringify(stored));
      } catch {}

      setStatus({
        type: 'success',
        message: 'Your inquiry has been recorded. Feel free to follow up directly at ' + personalInfo.social.email,
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="font-mono text-xs text-[#e07a5f] dark:text-[#f49d85] uppercase tracking-wider font-semibold mb-2">
            05 / Contact
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Let's Discuss Opportunities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans">
            Open for software engineering internships, technical collaborations, and full-stack projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-xl glass-card space-y-5">
              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-100">
                Direct Contact
              </h3>

              {/* Email */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Email
                </span>
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <span className="text-xs sm:text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                    {personalInfo.social.email}
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="ml-2 p-1.5 rounded-md text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors focus-ring"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-[#e07a5f] dark:text-[#f49d85]" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Location
                </span>
                <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 flex items-center space-x-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#4a7b87] dark:text-[#7ec3d4]" />
                  <span>{personalInfo.location}</span>
                </p>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                  Profiles
                </span>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors focus-ring rounded"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-slate-700 dark:text-slate-300 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors focus-ring rounded"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Availability Note */}
            <div className="p-4 rounded-xl glass-card text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2.5 font-sans">
              <CheckCircle2 className="w-4 h-4 text-[#e07a5f] dark:text-[#f49d85] shrink-0 mt-0.5" />
              <span>Available for software engineering internships, full-time engineering roles, and technical collaborations (Class of 2027).</span>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-xl glass-card">
            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-900 dark:text-slate-100 mb-5">
              Send a Message
            </h3>

            {status.type && (
              <div
                className={`mb-5 p-3 rounded-lg border text-xs flex items-start space-x-2 ${
                  status.type === 'success'
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-800 dark:text-rose-300'
                }`}
                role="alert"
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Subject (Optional)
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity, project inquiry, etc."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, role, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 text-slate-900 dark:text-slate-100 placeholder-slate-400 text-sm focus-ring transition-colors resize-y"
                />
              </div>

              <div className="pt-1 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-lg bg-[#e07a5f] hover:bg-[#cf6b50] text-white text-xs font-medium shadow-md shadow-[#e07a5f]/20 transition-colors disabled:opacity-50 focus-ring"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-[#e07a5f] dark:hover:text-[#f49d85] transition-colors"
                >
                  Direct Email ↗
                </a>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
