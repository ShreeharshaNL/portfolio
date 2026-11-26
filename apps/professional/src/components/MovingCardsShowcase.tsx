import React from 'react';
import { ArrowUpRight, Award, Globe, Terminal, Sparkles } from 'lucide-react';

interface ShowcaseCard {
  id: string;
  title: string;
  subdomain?: string;
  url?: string;
  badge?: string;
  description: string;
  tags: string[];
  icon: 'award' | 'terminal' | 'globe' | 'sparkles';
}

const TICKER_CARDS: ShowcaseCard[] = [
  {
    id: 'legallens',
    title: 'LegalLens',
    subdomain: 'legallens.shreeharsha.online',
    url: 'https://legallens.shreeharsha.online',
    badge: 'AI Legal Assistant',
    description: 'AI legal document analysis and clause breakdown assistant using NLP.',
    tags: ['FastAPI', 'Cosine Similarity', 'React'],
    icon: 'terminal',
  },
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
    id: 'scfp',
    title: 'Student-Centric Freelancing Platform',
    subdomain: 'scfp.shreeharsha.online',
    url: 'https://scfp.shreeharsha.online',
    badge: 'Full-Stack Marketplace',
    description: 'Campus freelance gig discovery with JWT authentication and portfolio matching.',
    tags: ['Node.js', 'Express', 'JWT', 'TypeScript'],
    icon: 'globe',
  },
  {
    id: 'post-your-cat',
    title: 'Post Your Cat',
    subdomain: 'post-your-cat.shreeharsha.online',
    url: 'https://post-your-cat.shreeharsha.online',
    badge: 'Community Web App',
    description: 'Community photo sharing feed and interactive feline showcase.',
    tags: ['React', 'TypeScript', 'Tailwind CSS'],
    icon: 'sparkles',
  },
  {
    id: 'blog',
    title: 'Engineering Blog',
    subdomain: 'blog.shreeharsha.online',
    url: 'https://blog.shreeharsha.online',
    badge: 'Technical Writing',
    description: 'Deep dives on systems architecture, edge infrastructure, and devlogs.',
    tags: ['Markdown', 'Web Architecture', 'Devlogs'],
    icon: 'terminal',
  },
  {
    id: 'academics',
    title: 'NIE Mysuru',
    subdomain: 'Class of 2027',
    badge: 'CGPA 8.65 / 10.0',
    description: 'B.E. Information Science and Engineering undergraduate degree.',
    tags: ['Data Structures', 'Algorithms', 'DBMS'],
    icon: 'award',
  },
  {
    id: 'minecraft',
    title: 'Minecraft Edition',
    subdomain: 'minecraft.shreeharsha.online',
    url: 'https://minecraft.shreeharsha.online',
    badge: 'Interactive Portfolio',
    description: 'Retro pixel-art experience with Web Audio sound effects and custom biome atmospheres.',
    tags: ['Web Audio API', 'React', 'Pixel UI'],
    icon: 'sparkles',
  },
];

export const MovingCardsShowcase: React.FC = () => {
  const renderIcon = (type: ShowcaseCard['icon']) => {
    switch (type) {
      case 'award':
        return <Award className="w-3.5 h-3.5 text-[#D9A441]" />;
      case 'terminal':
        return <Terminal className="w-3.5 h-3.5 text-[#6FCF7F]" />;
      case 'sparkles':
        return <Sparkles className="w-3.5 h-3.5 text-[#D9A441]" />;
      default:
        return <Globe className="w-3.5 h-3.5 text-[#D9A441]" />;
    }
  };

  return (
    <section className="py-8 sm:py-10 overflow-hidden relative border-y border-cad-border bg-cad-panel-subtle/90 backdrop-blur-md">
      
      {/* Section Header with Live Radar Beacon */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center space-x-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cad-status opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cad-status"></span>
          </span>
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-cad-text">
            LIVE SUBDOMAIN ECOSYSTEM · <span className="text-cad-accent">*.shreeharsha.online</span>
          </span>
        </div>

        <span className="text-[11px] font-mono text-cad-muted">
          Hover to pause · Click card to visit
        </span>
      </div>

      {/* SINGLE MOVING ROW ONLY */}
      <div className="relative w-full overflow-hidden mask-marquee py-2 group">
        <div className="flex w-max space-x-4 animate-marquee group-hover:[animation-play-state:paused]">
          {[...TICKER_CARDS, ...TICKER_CARDS].map((card, idx) => (
            <a
              key={`${card.id}-${idx}`}
              href={card.url || '#projects'}
              target={card.url ? '_blank' : '_self'}
              rel={card.url ? 'noopener noreferrer' : undefined}
              className="w-72 sm:w-80 p-3.5 rounded-sm bg-cad-panel border border-cad-border hover:border-cad-accent block shrink-0 cursor-pointer text-left transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(217,164,65,0.15)] group/card"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center space-x-2 truncate">
                  <div className="p-1 rounded-sm bg-cad-bg border border-cad-border shrink-0">
                    {renderIcon(card.icon)}
                  </div>
                  <h3 className="font-bold text-xs sm:text-sm text-cad-text tracking-tight truncate group-hover/card:text-cad-accent transition-colors">
                    {card.title}
                  </h3>
                </div>

                {card.badge && (
                  <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono font-medium bg-cad-accent/10 text-cad-accent border border-cad-accent/30 shrink-0">
                    {card.badge}
                  </span>
                )}
              </div>

              {card.subdomain && (
                <div className="mt-1.5 flex items-center space-x-1 font-mono text-[11px] text-cad-muted group-hover/card:text-cad-accent transition-colors">
                  <span className="truncate">{card.subdomain}</span>
                  <ArrowUpRight className="w-3 h-3 shrink-0 transition-transform group-hover/card:translate-x-0.5 group-hover/card:-translate-y-0.5" />
                </div>
              )}

              <p className="mt-1.5 text-xs text-cad-muted leading-relaxed font-sans line-clamp-1">
                {card.description}
              </p>

              <div className="mt-2.5 flex flex-wrap gap-1 pt-2 border-t border-cad-border">
                {card.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-1.5 py-0.5 rounded-sm text-[10px] font-mono text-cad-muted bg-cad-bg border border-cad-border"
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
