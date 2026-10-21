import React, { useState } from 'react';
import { Copy, Check, Send, ExternalLink, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo } from '../config/portfolio';
import { sound } from '../utils/audio';
import { useGame } from '../context/GameContext';
import { EmeraldGem, EnchantedBook } from './MinecraftIcons';

export const Contact: React.FC = () => {
  const { unlockAdvancement } = useGame();
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const copyEmail = () => {
    sound.playPop();
    navigator.clipboard.writeText(personalInfo.social.email);
    setCopied(true);
    unlockAdvancement('contact');
    setTimeout(() => setCopied(false), 2200);
  };

  const encodedSubject = encodeURIComponent(subject.trim() || 'Software Opportunity / Project Inquiry');
  const encodedBody = encodeURIComponent(
    message.trim()
      ? `${message.trim()}\n\n-- Dispatched from Shreeharsha's Minecraft Portfolio`
      : 'Hi Shreeharsha,\n\nI explored your portfolio and wanted to reach out regarding...'
  );

  const mailtoUrl = `mailto:${personalInfo.social.email}?subject=${encodedSubject}&body=${encodedBody}`;
  const gmailWebUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${personalInfo.social.email}&su=${encodedSubject}&body=${encodedBody}`;

  return (
    <section id="contact" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <EmeraldGem size={14} />
            <span>[COMMUNICATION FREQUENCY]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            Connect & Collaborate
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            Have a project in mind, want to discuss software engineering, or discuss an opportunity?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Direct Channels (Span 5) */}
          <div className="md:col-span-5 space-y-4">
            
            {/* Primary Email Box */}
            <div className="p-6 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] space-y-3">
              <div className="flex items-center space-x-2 text-xs font-pixel uppercase tracking-wider text-zinc-400">
                <Mail className="w-4 h-4 text-[#55ffff]" />
                <span>Primary Transmission</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-[#12141a] border border-black shadow-[inset_1px_1px_#0a0c10]">
                <a
                  href={`mailto:${personalInfo.social.email}`}
                  onClick={() => sound.playClick()}
                  className="text-xs sm:text-sm font-mono text-zinc-200 hover:text-[#55ffff] truncate pr-2 transition-colors select-all"
                  title="Click to compose email"
                >
                  {personalInfo.social.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-1.5 bg-[#252b3b] hover:bg-[#343c52] border border-black text-zinc-300 hover:text-white transition-colors shrink-0"
                  title="Copy email to clipboard"
                  aria-label="Copy email"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-[#55ff55]" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {copied ? (
                <span className="text-xs font-pixel text-[#55ff55] block animate-in fade-in mc-text-shadow">
                  ✓ Email copied to clipboard!
                </span>
              ) : (
                <span className="text-xs text-zinc-400 font-sans block">
                  Click to copy or send message directly below.
                </span>
              )}
            </div>

            {/* Social Network Cards */}
            <div className="p-6 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] space-y-3">
              <span className="text-xs font-pixel uppercase tracking-wider text-zinc-400 block">
                External Channels
              </span>

              {/* LinkedIn */}
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3 bg-[#12141a] border border-black hover:border-[#55ffff] text-xs sm:text-sm font-pixel text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <LinkedinIcon className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-[#55ffff]" />
              </a>

              {/* GitHub */}
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center justify-between p-3 bg-[#12141a] border border-black hover:border-white text-xs sm:text-sm font-pixel text-zinc-300 hover:text-white transition-all group"
              >
                <div className="flex items-center space-x-2.5">
                  <GithubIcon className="w-4 h-4 text-zinc-300" />
                  <span>GitHub Repositories</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-zinc-500 group-hover:text-white" />
              </a>
            </div>

          </div>

          {/* Message Dispatch Form (Span 7) */}
          <div className="md:col-span-7 p-6 sm:p-7 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] space-y-4">
            <div className="flex items-center space-x-2 border-b border-black pb-2 text-xs font-pixel text-zinc-400 uppercase tracking-wider">
              <EnchantedBook size={16} />
              <span>Compose Transmission</span>
            </div>

            <div className="space-y-3 font-sans">
              <div>
                <label className="block text-xs font-pixel text-zinc-300 mb-1">
                  Topic / Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g. Full-Stack Role / Project Collaboration"
                  className="w-full px-3 py-2 bg-[#12141a] border-2 border-black text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#55ffff]"
                />
              </div>

              <div>
                <label className="block text-xs font-pixel text-zinc-300 mb-1">
                  Message Content
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details about what you'd like to work on..."
                  className="w-full px-3 py-2 bg-[#12141a] border-2 border-black text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#55ffff]"
                />
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-2.5">
              <a
                href={mailtoUrl}
                onClick={() => {
                  sound.playClick();
                  unlockAdvancement('contact');
                }}
                className="mc-button-diamond px-4 py-2.5 text-xs font-pixel space-x-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open Mail Client</span>
              </a>

              <a
                href={gmailWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  sound.playClick();
                  unlockAdvancement('contact');
                }}
                className="mc-button px-4 py-2.5 text-xs font-pixel space-x-1.5"
              >
                <span>Open in Gmail</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
