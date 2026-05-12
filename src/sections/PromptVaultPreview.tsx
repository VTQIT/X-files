import { useRef, useEffect, useState } from 'react';
import { Copy, Star } from 'lucide-react';

const prompts = [
  { id: '1', content: 'Create a cinematic 3D particle system with bloom and chromatic aberration post-processing effects...', category: 'Three.js', accent: '#FF6B35', usageCount: 42 },
  { id: '2', content: 'Write a TypeScript React component with Framer Motion animations and proper typing...', category: 'React', accent: '#00D4FF', usageCount: 38 },
  { id: '3', content: 'Generate a dark-themed dashboard with glassmorphism cards and neon accent colors...', category: 'UI Design', accent: '#39FF14', usageCount: 27 },
  { id: '4', content: 'Build a secure authentication system with JWT, bcrypt hashing, and refresh tokens...', category: 'Backend', accent: '#8B5CF6', usageCount: 55 },
  { id: '5', content: 'Design a responsive landing page with GSAP scroll-triggered animations and parallax effects...', category: 'Frontend', accent: '#FF6B35', usageCount: 31 },
  { id: '6', content: 'Create a Python script for automated GitHub repository backup with error handling...', category: 'DevOps', accent: '#00D4FF', usageCount: 19 },
];

export default function PromptVaultPreview() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className="py-24 md:py-32 overflow-hidden" style={{ background: '#080808' }}>
      <div className="px-4 mb-12 max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.15em] text-[#00D4FF] uppercase mb-4">AI PROMPT VAULT</p>
        <h2 className="font-display text-h2 text-white mb-3">Your Prompt Library, Organized</h2>
        <p className="text-sm text-[#888] max-w-md">
          Store, categorize, and instantly copy your best AI prompts.
        </p>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {prompts.map((p) => (
          <div
            key={p.id}
            className="flex-shrink-0 w-[380px] max-w-[85vw] bg-[rgba(17,17,17,0.8)] border border-[#222] rounded-xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-opacity-50 group"
            style={{ '--hover-color': p.accent } as React.CSSProperties}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${p.accent}80`;
              (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.5)`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = '#222';
              (e.currentTarget as HTMLElement).style.boxShadow = 'none';
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs font-medium px-3 py-1 rounded-full"
                style={{ background: `${p.accent}20`, color: p.accent }}
              >
                {p.category}
              </span>
              <button
                onClick={() => handleCopy(p.id, p.content)}
                className="p-1.5 rounded-lg hover:bg-[#222] transition-colors"
              >
                <Copy size={14} className={copiedId === p.id ? 'text-[#39FF14]' : 'text-[#555]'} />
              </button>
            </div>

            <p className="text-sm text-[#888] line-clamp-3 mb-4 leading-relaxed">
              {p.content}
            </p>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-[#555]">{p.usageCount} uses</span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-[#555]">Jan 2025</span>
                <Star size={14} className="text-[#555] hover:text-[#FF6B35] cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
