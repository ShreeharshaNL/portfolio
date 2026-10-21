import React from 'react';
import { personalInfo } from '../config/portfolio';
import { EnchantedBook, DiamondSword, DiamondGem, RedstoneDust } from './MinecraftIcons';
import { sound } from '../utils/audio';

export const About: React.FC = () => {
  const highlights = [
    {
      icon: <EnchantedBook size={24} />,
      title: "Information Science & Engineering",
      desc: "Undergraduate student at NIE Mysuru focusing on data structures, algorithms, and core engineering fundamentals.",
      badge: "Core Discipline",
    },
    {
      icon: <DiamondSword size={24} />,
      title: "Full-Stack Web Development",
      desc: "Building responsive, modern web applications with React, Node.js, Flask, and RESTful APIs.",
      badge: "Production Stack",
    },
    {
      icon: <DiamondGem size={24} />,
      title: "AI & Computer Vision",
      desc: "Developing practical tools with Google Vision OCR, cosine similarity search, and classification pipelines.",
      badge: "Applied Intelligence",
    },
    {
      icon: <RedstoneDust size={24} />,
      title: "Database & Backend Systems",
      desc: "Designing and querying relational and document data models with MySQL and MongoDB.",
      badge: "Persistence Layer",
    },
  ];

  return (
    <section id="about" className="py-24 border-t-2 border-black relative z-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#181b24] border-2 border-black text-xs font-pixel text-[#55ffff] shadow-[inset_1px_1px_#3d4559,2px_2px_0px_rgba(0,0,0,0.5)]">
            <span>[DEVELOPER LORE]</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-pixel font-bold text-white tracking-wide mc-text-shadow">
            About Shreeharsha
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 font-sans">
            A look into my engineering background, technical interests, and craft.
          </p>
        </div>

        {/* Narrative Box (Minecraft Slate Frame) */}
        <div className="max-w-3xl mx-auto p-6 sm:p-8 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,6px_6px_0px_rgba(0,0,0,0.6)] mb-12 space-y-4">
          <div className="flex items-center space-x-2 border-b border-black pb-2 text-xs font-pixel text-[#fcee4b] uppercase tracking-wider">
            <span>✦ Character Lore & Philosophy</span>
          </div>
          {personalInfo.aboutText.map((paragraph, index) => (
            <p key={index} className="text-zinc-200 text-sm sm:text-base font-sans leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* 4 Clean Focus Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {highlights.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => sound.playPop()}
              className="p-5 sm:p-6 bg-[#181b24]/90 border-2 border-black shadow-[inset_2px_2px_#3d4559,inset_-2px_-2px_#0e1015,4px_4px_0px_rgba(0,0,0,0.5)] hover:border-zinc-400 hover:translate-y-[-2px] transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 bg-[#12141a] border-2 border-black shadow-[inset_1px_1px_#0a0c10,inset_-1px_-1px_#32394c] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-pixel px-2 py-0.5 bg-[#232938] border border-black text-[#55ffff]">
                  {item.badge}
                </span>
              </div>

              <h3 className="font-pixel font-bold text-white text-base group-hover:text-[#ffffa0] transition-colors mc-text-shadow">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
