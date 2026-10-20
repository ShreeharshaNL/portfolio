import React from 'react';
import { GraduationCap, Layout, Cpu, Database } from 'lucide-react';
import { personalInfo } from '../config/portfolio';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: GraduationCap,
      title: "Information Science & Engineering",
      desc: "Undergraduate student at NIE Mysuru focusing on data structures, algorithms, and core engineering fundamentals.",
    },
    {
      icon: Layout,
      title: "Full-Stack Web Development",
      desc: "Building responsive, modern web applications with React, Node.js, Flask, and RESTful APIs.",
    },
    {
      icon: Cpu,
      title: "AI & Computer Vision",
      desc: "Developing practical tools with Google Vision OCR, cosine similarity search, and classification pipelines.",
    },
    {
      icon: Database,
      title: "Database Systems",
      desc: "Designing and querying relational and document data models with MySQL and MongoDB.",
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-[#232b3b]/60 relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181e29] border border-[#232b3b] text-xs font-mono text-amber-400">
            <span>BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            About Me
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            A brief introduction to my background and technical interests.
          </p>
        </div>

        {/* Narrative */}
        <div className="max-w-3xl mx-auto text-zinc-300 text-base sm:text-lg leading-relaxed space-y-4 text-center mb-14">
          {personalInfo.aboutText.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        {/* 4 Clean Focus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-[#121620]/90 border border-[#232b3b] hover:border-amber-500/30 transition-all space-y-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#181e2b] border border-[#232b3b] group-hover:border-amber-500/40 flex items-center justify-center text-amber-400 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-white text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
