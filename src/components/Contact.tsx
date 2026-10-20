import React, { useState } from 'react';
import { Copy, Check, Send, MapPin, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.social.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSend = () => {
    const s = encodeURIComponent(subject.trim() || 'Project Inquiry / Opportunity');
    const b = encodeURIComponent(
      message.trim()
        ? `${message.trim()}\n\n-- Sent from Shreeharsha's Portfolio`
        : 'Hi Shreeharsha,\n\nI came across your portfolio and wanted to reach out regarding...'
    );
    window.location.href = `mailto:${personalInfo.social.email}?subject=${s}&body=${b}`;
  };

  return (
    <section id="contact" className="py-24 border-t border-zinc-200/60 dark:border-[#232b3b]/60 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/80 dark:bg-[#181e29] border border-zinc-200 dark:border-[#232b3b] text-xs font-mono text-amber-500 shadow-sm">
            <span>GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Let's Connect
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Interested in collaborating, discussing a project, or sharing an opportunity?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Channels (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Primary Email Card with Copy */}
            <div className="p-6 rounded-2xl bg-white/85 dark:bg-[#121620]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] space-y-3 shadow-xl shadow-black/5 dark:shadow-black/20">
              <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                <Mail className="w-4 h-4 text-amber-500" />
                <span>Email Address</span>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-100/90 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b]">
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  className="text-sm font-medium text-zinc-900 dark:text-white hover:text-amber-500 truncate pr-2 transition-colors select-all"
                  title="Click to compose email"
                >
                  {personalInfo.social.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1.5 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-[#202738] transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied ? (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 block animate-in fade-in">
                  ✓ Email copied to clipboard!
                </span>
              ) : (
                <span className="text-xs text-zinc-500 dark:text-zinc-400 block">
                  Click to copy or compose directly.
                </span>
              )}
            </div>

            {/* Social Network Cards */}
            <div className="p-6 rounded-2xl bg-white/85 dark:bg-[#121620]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] space-y-3 shadow-xl shadow-black/5 dark:shadow-black/20">
              <span className="text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium block">
                Connect Directly
              </span>

              {/* LinkedIn */}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100/90 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b] hover:border-sky-500/50 text-sm text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-500">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block leading-tight">LinkedIn</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">shreeharsha-n-l</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-sky-500 transition-colors" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3.5 rounded-xl bg-zinc-100/90 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b] hover:border-amber-500/50 text-sm text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-semibold block leading-tight">GitHub</span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">@ShreeharshaNL</span>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-zinc-400 group-hover:text-amber-500 transition-colors" />
              </a>
            </div>

            {/* Location */}
            <div className="p-4 rounded-xl bg-white/85 dark:bg-[#121620]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] flex items-center space-x-3 text-xs text-zinc-600 dark:text-zinc-400 shadow-md">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0" />
              <span>The National Institute of Engineering (NIE), Mysuru, India</span>
            </div>

          </div>

          {/* Direct Message Form (Span 7) */}
          <div className="md:col-span-7 p-7 rounded-2xl bg-white/85 dark:bg-[#121620]/90 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] space-y-5 shadow-xl shadow-black/5 dark:shadow-black/20">
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                Send a Quick Message
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Launches your native mail client with the message pre-filled.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Project inquiry or opportunity"
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100/90 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b] text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about what you're building or what you'd like to collaborate on..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-100/90 dark:bg-[#181e2b] border border-zinc-200 dark:border-[#232b3b] text-zinc-900 dark:text-white text-sm placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:outline-none focus:border-amber-500 transition-colors resize-y leading-relaxed"
                />
              </div>

              <button
                type="button"
                onClick={handleSend}
                className="w-full inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-md shadow-amber-950/20 active:scale-[0.99]"
              >
                <Send className="w-4 h-4" />
                <span>Send Message via Email Client</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
