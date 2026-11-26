import React from 'react';
import { ArrowUpRight, Award, Sparkles, Globe, Terminal } from 'lucide-react';

interface ShowcaseCard {
  id: string;
  title: string;
  subdomain?: string;
  url?: string;
  badge?: string;
  description: string;
  tags: string[];
  icon: 'globe' | 'award' | 'sparkles' | 'terminal';
}

const ROW_ONE_CARDS: ShowcaseCard[] = [
  {
    id: 'labelwise',
    title: 'LabelWise',
    subdomain: 'labelwise.shreeharsha.online',
    url: 'https://labelwise.shreeharsha.online',
    badge: 'NeoNexus 36.1 Winner',
    description: 'OCR food ingredient analyzer built with team Code4Care at BITM Ballari.',
    tags: ['Google Vision OCR', 'Python', 'React'],
    icon: 'award',
  },
  {
    id: 'legallens',
    title: 'LegalLens',
    subdomain: 'legallens.shreeharsha.online',
    url: 'https://legallens.shreeharsha.online',
    badge: 'AI Legal Tech',
    description: 'AI legal document analysis and clause breakdown assistant using NLP.',
    tags: ['FastAPI', 'Cosine Similarity', 'React'],
    icon: 'terminal',
  },
  {
    id: 'scfp',
    title: 'Student-Centric Freelancing Platform',
    subdomain: 'scfp.shreeharsha.online',
    url: 'https://scfp.shreeharsha.online',
    badge: 'Marketplace',
    description: 'Full-stack marketplace connecting students with freelance gigs using JWT auth.',
    tags: ['Node.js', 'JWT', 'TypeScript', 'Tailwind'],
    icon: 'globe',
  },
  {
    id: 'post-your-cat',
    title: 'Post Your Cat',
    subdomain: 'post-your-cat.shreeharsha.online',
    url: 'https://post-your-cat.shreeharsha.online',
    badge: 'Community App',
    description: 'Community web application for sharing and browsing cat photos.',
    tags: ['React', 'TypeScript', 'Cloudflare'],
    icon: 'sparkles',
  },
];

const ROW_TWO_CARDS: ShowcaseCard[] = [
  {
    id: 'blog',
    title: 'Engineering Blog',
    subdomain: 'blog.shreeharsha.online',
    url: 'https://blog.shreeharsha.online',
    badge: 'Devlogs & Notes',
    description: 'Technical writing, systems engineering notes, and project logs.',
    tags: ['Markdown', 'Architecture', 'Web Systems'],
    icon: 'terminal',
  },
  {
    id: 'academics',
    title: 'NIE Mysuru',
    subdomain: 'Class of 2027',
    badge: 'CGPA 8.65 / 10.0',
    description: 'Bachelor of Engineering in Information Science & Engineering.',
    tags: ['Data Structures', 'Algorithms', 'DBMS'],
    icon: 'award',
  },
  {
    id: 'minecraft',
    title: 'Minecraft Edition',
    subdomain: 'minecraft.shreeharsha.online',
    url: 'https://minecraft.shreeharsha.online',
    badge: 'Alternate Dimension',
    description: 'Interactive portfolio with Web Audio SFX, dynamic biome skies & mining.',
    tags: ['Web Audio API', 'React', 'Pixel UI'],
    icon: 'sparkles',
  },
  {
    id: 'codebase',
    title: 'Open Source Hub',
    subdomain: 'github.com/ShreeharshaNL',
    url: 'https://github.com/ShreeharshaNL',
    badge: 'GitHub Profile',
    description: 'Public repositories, hackathon submissions, and experimental tools.',
    tags: ['Git', 'Python', 'TypeScript'],
    icon: 'globe',
  },
];

export const MovingCardsShowcase: React.FC = () => {
  const renderIcon = (type: ShowcaseCard['icon']) => {
    switch (type) {
      case 'award':
        return <Award className="w-3.5 h-3.5 text-[#1d7eb6]" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-[#38bdf8]" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-amber-500" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#1d7eb6]" />;
    }
  };

  return (
    <section className="py-14 sm:py-18 overflow-hidden relative border-y border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#0b0d14]/40 backdrop-blur-sm">
      
      {/* Section Header with Live Radar Beacon */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-slate-700 dark:text-slate-300">
            Live Subdomain Ecosystem · <span className="text-[#1d7eb6] dark:text-[#38bdf8]">*.shreeharsha.online</span>
          </span>
        </div>

        <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
          Hover to pause · Click card to visit deployment
        </span>
      </div>

      {/* Marquee Row 1 (Moving Left) */}
      <div className="relative w-full overflow-hidden mask-marquee py-2 group">
        <div className="flex w-max space-x-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[...ROW_ONE_CARDS, ...ROW_ONE_CARDS].map((card, idx) => (
            <a
              key={`${card.id}-${idx}`}
              href={card.url || '#projects'}
              target={card.url ? '_blank' : '_self'}
              rel={card.url ? 'noopener noreferrer' : undefined}
              className="w-80 sm:w-96 p-4 rounded-xl glass-card glass-card-hover block shrink-0 cursor-pointer text-left transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80">
                    {renderIcon(card.icon)}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                    {card.title}
                  </h3>
                </div>

                {card.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1d7eb6]/10 text-[#1d7eb6] dark:text-[#38bdf8] border border-[#1d7eb6]/30 shrink-0">
                    {card.badge}
                  </span>
                )}
              </div>

              {card.subdomain && (
                <div className="mt-2 flex items-center space-x-1 font-mono text-xs text-slate-500 dark:text-slate-400 group-hover:text-[#1d7eb6] dark:group-hover:text-[#38bdf8] transition-colors">
                  <span>{card.subdomain}</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              )}

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
                {card.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 (Moving Right) */}
      <div className="relative w-full overflow-hidden mask-marquee py-2 mt-2 group">
        <div className="flex w-max space-x-4 animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...ROW_TWO_CARDS, ...ROW_TWO_CARDS].map((card, idx) => (
            <a
              key={`${card.id}-${idx}`}
              href={card.url || '#projects'}
              target={card.url ? '_blank' : '_self'}
              rel={card.url ? 'noopener noreferrer' : undefined}
              className="w-80 sm:w-96 p-4 rounded-xl glass-card glass-card-hover block shrink-0 cursor-pointer text-left transition-all duration-200 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-md bg-slate-100 dark:bg-slate-800/80">
                    {renderIcon(card.icon)}
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 tracking-tight">
                    {card.title}
                  </h3>
                </div>

                {card.badge && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-[#1d7eb6]/10 text-[#1d7eb6] dark:text-[#38bdf8] border border-[#1d7eb6]/30 shrink-0">
                    {card.badge}
                  </span>
                )}
              </div>

              {card.subdomain && (
                <div className="mt-2 flex items-center space-x-1 font-mono text-xs text-slate-500 dark:text-slate-400 group-hover:text-[#1d7eb6] dark:group-hover:text-[#38bdf8] transition-colors">
                  <span>{card.subdomain}</span>
                  <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              )}

              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans line-clamp-2">
                {card.description}
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>

    </section>
  );
};
