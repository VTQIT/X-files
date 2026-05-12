import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Github, Lock, Server } from 'lucide-react';
import VaultParticleBackground from './VaultParticleBackground';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const elements = sectionRef.current?.querySelectorAll('.hero-animate');
    elements?.forEach((el, i) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.opacity = '0';
      htmlEl.style.transform = 'translateY(40px)';
      setTimeout(() => {
        htmlEl.style.transition = 'opacity 0.8s cubic-bezier(0.33, 1, 0.68, 1), transform 0.8s cubic-bezier(0.33, 1, 0.68, 1)';
        htmlEl.style.opacity = '1';
        htmlEl.style.transform = 'translateY(0)';
      }, 100 + i * 150);
    });
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <VaultParticleBackground />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Eyebrow */}
        <p className="hero-animate font-mono text-xs tracking-[0.15em] text-[#00D4FF] uppercase mb-6">
          PERSONAL DIGITAL VAULT
        </p>

        {/* Headline */}
        <h1 className="font-display text-hero text-white mb-2" style={{ lineHeight: 0.9 }}>
          <span className="hero-animate block">Your Digital Life,</span>
          <span className="hero-animate block text-[#FF6B35]">Fortified.</span>
        </h1>

        {/* Subheadline */}
        <p className="hero-animate text-base md:text-lg text-[#888] font-light max-w-[560px] mx-auto mt-6 mb-8 leading-relaxed">
          Store files, notes, passwords, code, and AI prompts in a single encrypted vault. Sync everything to your own GitHub repository.
        </p>

        {/* CTA Row */}
        <div className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="wavy-pill bg-[#FF6B35] text-black font-bold text-sm md:text-base px-10 py-4 flex items-center gap-2 hover:shadow-[0_0_40px_rgba(255,107,53,0.5)]"
          >
            Enter Vault
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="wavy-pill bg-transparent border border-[#222] text-black text-sm md:text-base px-10 py-4 hover:border-[#00D4FF] hover:text-[#00D4FF]"
          >
            View Demo
          </button>
        </div>

        {/* Trust Bar */}
        <div className="hero-animate flex flex-wrap items-center justify-center gap-6 mt-12">
          {[
            { icon: Lock, label: 'End-to-End Encryption' },
            { icon: Github, label: 'GitHub Sync' },
            { icon: Shield, label: 'Open Source' },
            { icon: Server, label: 'Self-Hostable' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-[#555]">
              <item.icon size={16} className="text-[#555]" />
              <span className="text-xs font-medium tracking-wide">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
        <span className="text-[10px] font-mono text-[#555] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-[#555] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#FF6B35] animate-[scrollIndicator_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
