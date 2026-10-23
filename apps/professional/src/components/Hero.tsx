import React, { useEffect, useState } from 'react';
import MascotPortfolioHero from './ui/mascot-portfolio-hero';

export const Hero: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <section id="home" className="relative w-full overflow-x-clip pt-16 sm:pt-20">
      <MascotPortfolioHero
        height="calc(100svh - 4rem)"
        minHeight="600px"
        headline="Hi, I'm Shreeharsha."
        description="Information Science & Engineering undergraduate at NIE Mysuru (CGPA 8.65 / 10.0) building functional full-stack web applications and applied AI systems."
        index="08/27"
        discipline="Full-Stack & AI"
        tagline="NIE Mysuru · CGPA 8.65"
        collection={["NeoNexus", "Winner"]}
        reel={["NIE Mysuru @ 2027", "Information Science"]}
        href="#projects"
        services={[
          "Full-Stack Web Development",
          "Applied AI & Computer Vision",
          "FastAPI & Node.js Backend",
          "Cloudflare Edge Infrastructure",
        ]}
        greetings={[
          "Hi, I'm Shreeharsha N. L.!",
          "B.E. Information Science @ NIE Mysuru.",
          "Winner of NeoNexus 36.1 Hackathon at BITM Ballari!",
          "Building practical software & AI systems.",
          "Check out my projects below ↓",
          "Okay, you can stop poking me :)",
        ]}
        accent="#5fb57a"
        paper={isDark ? "#0b0c10" : "#ebebea"}
        ink={isDark ? "#f8fafc" : "#111111"}
      />
    </section>
  );
};
