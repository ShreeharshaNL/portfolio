import React from 'react';
import { GraduationCap, Award, Code2, MapPin } from 'lucide-react';

export const HighlightMetrics: React.FC = () => {
  const metrics = [
    {
      icon: GraduationCap,
      label: "Education",
      value: "B.E. Information Science",
      sub: "The National Institute of Engineering, Mysuru",
      accent: "text-amber-500",
      borderAccent: "group-hover:border-amber-500/50",
    },
    {
      icon: Award,
      label: "Hackathon Recognition",
      value: "Winner · NeoNexus 36.1",
      sub: "Project: LabelWise · Team Code4Care",
      accent: "text-emerald-500",
      borderAccent: "group-hover:border-emerald-500/50",
    },
    {
      icon: Code2,
      label: "Specialization",
      value: "Full-Stack & Applied AI",
      sub: "React, Node.js, Python, Vision OCR",
      accent: "text-sky-500",
      borderAccent: "group-hover:border-sky-500/50",
    },
    {
      icon: MapPin,
      label: "Location & Timezone",
      value: "Mysuru, India",
      sub: "Indian Standard Time (UTC +5:30)",
      accent: "text-amber-500",
      borderAccent: "group-hover:border-amber-500/50",
    },
  ];

  return (
    <section className="py-6 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-white/85 dark:bg-[#121620]/85 backdrop-blur-xl border border-zinc-200/90 dark:border-[#232b3b] ${m.borderAccent} transition-all duration-300 space-y-2 group shadow-xl shadow-black/5 dark:shadow-black/20`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-medium">
                    {m.label}
                  </span>
                  <Icon className={`w-4 h-4 ${m.accent}`} />
                </div>
                <div className="space-y-0.5">
                  <div className="font-bold text-zinc-900 dark:text-white text-sm group-hover:text-amber-500 transition-colors">
                    {m.value}
                  </div>
                  <div className="text-xs text-zinc-600 dark:text-zinc-400 leading-tight">
                    {m.sub}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
