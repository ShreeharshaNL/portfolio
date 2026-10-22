import React from 'react';
import { ArrowDown, Mail, Sparkles, Code2, Award, GraduationCap, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personalInfo, educationData } from '../config/portfolio';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-32 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial & Engineering Introduction */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Status / Eyebrow Badge */}
            <div className="inline-flex items-center space-x-2.5 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/80 text-indigo-700 dark:text-indigo-300 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{personalInfo.eyebrow}</span>
            </div>

            {/* Main Headings */}
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                Hi, I'm <span className="text-indigo-600 dark:text-indigo-400">Shreeharsha</span>.
              </h1>
              <p className="text-2xl sm:text-3xl font-semibold text-slate-700 dark:text-slate-200 tracking-tight">
                {personalInfo.headline}
              </p>
            </div>

            {/* Supporting Paragraph */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {personalInfo.bio} I enjoy translating complex challenges into elegant web applications, architecting robust backends, and exploring practical machine learning.
            </p>

            {/* Call To Actions */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-sm hover:shadow transition-all focus-ring"
              >
                <span>View My Projects</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 bg-white dark:bg-slate-900/60 text-slate-800 dark:text-slate-200 font-medium text-sm transition-all focus-ring"
              >
                <Mail className="w-4 h-4 text-slate-500" />
                <span>Get In Touch</span>
              </a>

              {/* Social Links */}
              <div className="flex items-center space-x-1 pl-2">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                  aria-label="GitHub Profile"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                  aria-label="LinkedIn Profile"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Micro-facts */}
            <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/80 dark:border-slate-800/80">
              <span className="inline-flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{personalInfo.location}</span>
              </span>
              <span className="inline-flex items-center space-x-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
                <span>Class of 2027 · CGPA {educationData.cgpa}</span>
              </span>
            </div>

          </div>

          {/* Right Column: Refined Technical Profile Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-[#10141e] border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none p-6 sm:p-7 space-y-6">
              
              {/* Header with status pill */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500"></div>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 font-semibold">
                    Engineering Profile
                  </span>
                </div>
                <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  NIE Mysuru
                </span>
              </div>

              {/* Verified Snapshot Items */}
              <div className="space-y-4">
                
                {/* Academic */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                      Education
                    </h2>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">
                      B.E. Information Science & Engineering
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      The National Institute of Engineering · CGPA {educationData.cgpa}/10.0
                    </p>
                  </div>
                </div>

                {/* Major Achievement */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                      Recent Milestone
                    </h2>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-100 mt-0.5">
                      Winner — NeoNexus 36.1 Hackathon
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Team Code4Care with project LabelWise (Google Vision OCR)
                    </p>
                  </div>
                </div>

                {/* Core Stack */}
                <div className="flex items-start space-x-3.5">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-xs font-semibold text-slate-900 dark:text-slate-200 uppercase tracking-wider font-mono">
                      Core Stack & Tools
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      React · TypeScript · Python · Node.js · Cloudflare Edge · MySQL
                    </p>
                  </div>
                </div>

              </div>

              {/* Footer info pill */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Seeking Software Internships</span>
                </span>
                <a
                  href="#contact"
                  className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Reach Out →
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
