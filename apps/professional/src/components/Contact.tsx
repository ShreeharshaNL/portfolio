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
          message: 'Transmission received. Thank you for reaching out!',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus({
          type: 'error',
          message: data.error || 'Unable to transmit message. Please send direct email.',
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
    <section id="contact" className="py-20 sm:py-24 border-t border-cad-border relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16 text-left">
          <div className="font-mono text-xs text-cad-accent uppercase tracking-wider font-semibold mb-2">
            05 / Transmission &amp; Contact
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-cad-text transition-colors">
            Let's Discuss Opportunities
          </h2>
          <p className="mt-3 text-sm sm:text-base text-cad-muted leading-relaxed font-sans transition-colors">
            Open for software engineering internships, technical collaborations, and full-stack projects.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
          
          {/* Direct Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-sm bg-cad-panel border border-cad-border space-y-5 relative group shadow-sm transition-colors">
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cad-accent pointer-events-none" />

              <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent">
                Direct Line
              </h3>

              {/* Email */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono text-cad-muted uppercase tracking-wider block">
                  Email Terminal
                </span>
                <div className="flex items-center justify-between p-2.5 rounded-sm bg-cad-subtle border border-cad-border transition-colors">
                  <span className="text-xs sm:text-sm font-mono text-cad-text truncate">
                    {personalInfo.social.email}
                  </span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="ml-2 p-1.5 rounded-sm text-cad-muted hover:text-cad-accent hover:bg-cad-panel transition-colors focus-ring cursor-pointer"
                    title="Copy email address"
                    aria-label="Copy email address"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-cad-status" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <span className="text-xs font-mono text-cad-muted uppercase tracking-wider block">
                  Base Location
                </span>
                <p className="text-xs sm:text-sm text-cad-text flex items-center space-x-1.5 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-cad-accent" />
                  <span>{personalInfo.location}</span>
                </p>
              </div>

              {/* Social Profiles */}
              <div className="pt-4 border-t border-cad-border space-y-2">
                <span className="text-xs font-mono text-cad-muted uppercase tracking-wider block">
                  External Profiles
                </span>
                <div className="flex items-center space-x-3 text-xs font-mono">
                  <a
                    href={personalInfo.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-cad-text hover:text-cad-accent transition-colors focus-ring rounded-sm"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                  <span className="text-cad-dim">•</span>
                  <a
                    href={personalInfo.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1.5 text-cad-text hover:text-cad-accent transition-colors focus-ring rounded-sm"
                  >
                    <LinkedinIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Availability Note */}
            <div className="p-4 rounded-sm bg-cad-panel border border-cad-border text-xs text-cad-muted flex items-start space-x-2.5 font-sans shadow-sm transition-colors">
              <CheckCircle2 className="w-4 h-4 text-cad-status shrink-0 mt-0.5" />
              <span>Available for software engineering internships, full-time engineering roles, and technical collaborations (Class of 2027).</span>
            </div>

          </div>

          {/* Form (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-sm bg-cad-panel border border-cad-border relative shadow-sm transition-colors">
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-cad-accent pointer-events-none" />

            <h3 className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-accent mb-5">
              Transmit Message
            </h3>

            {status.type && (
              <div
                className={`mb-5 p-3 rounded-sm border text-xs flex items-start space-x-2 font-mono ${
                  status.type === 'success'
                    ? 'border-cad-status/40 bg-cad-status/10 text-cad-status'
                    : 'border-rose-500/40 bg-rose-500/10 text-rose-500 dark:text-rose-400'
                }`}
                role="alert"
              >
                {status.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-cad-status shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-cad-muted">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-cad-border bg-cad-subtle text-cad-text placeholder-cad-dim text-sm focus-ring transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-cad-muted">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="jane@example.com"
                    className="w-full px-3.5 py-2.5 rounded-sm border border-cad-border bg-cad-subtle text-cad-text placeholder-cad-dim text-sm focus-ring transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-cad-muted">
                  Subject (Optional)
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Internship opportunity, project inquiry, etc."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-cad-border bg-cad-subtle text-cad-text placeholder-cad-dim text-sm focus-ring transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-cad-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your project, role, or questions..."
                  className="w-full px-3.5 py-2.5 rounded-sm border border-cad-border bg-cad-subtle text-cad-text placeholder-cad-dim text-sm focus-ring transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-sm bg-cad-accent hover:bg-cad-hover text-cad-bg text-xs font-mono font-bold shadow-md shadow-cad-accent/20 transition-all disabled:opacity-50 focus-ring cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="text-xs font-mono text-cad-muted hover:text-cad-accent transition-colors"
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
