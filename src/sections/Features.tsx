import { useEffect, useRef } from 'react';
import {
  FolderOpen, FileText, Link2, Code2,
  Lock, Sparkles, GitBranch, LayoutDashboard
} from 'lucide-react';

const features = [
  { icon: FolderOpen, title: 'File Vault', desc: 'Secure storage for all your documents, images, and files with drag-and-drop upload.', color: '#FF6B35' },
  { icon: FileText, title: 'Markdown Editor', desc: 'Live preview markdown editor with syntax highlighting and auto-save.', color: '#00D4FF' },
  { icon: Link2, title: 'URL Manager', desc: 'Save and categorize bookmarks with thumbnails, tags, and smart search.', color: '#39FF14' },
  { icon: Code2, title: 'Code Snippets', desc: 'Store code with syntax highlighting for 15+ languages, copy in one click.', color: '#8B5CF6' },
  { icon: Lock, title: 'Password Vault', desc: 'Encrypted password storage with AES-256. Never forget a password again.', color: '#FF6B35' },
  { icon: Sparkles, title: 'AI Prompts', desc: 'Organize your best AI prompts with categories, favorites, and quick copy.', color: '#00D4FF' },
  { icon: GitBranch, title: 'GitHub Sync', desc: 'Auto-sync your vault to a private GitHub repository. You own your data.', color: '#39FF14' },
  { icon: LayoutDashboard, title: 'CMS Admin', desc: 'Full admin panel with user management, analytics, and system controls.', color: '#8B5CF6' },
];

export default function Features() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const cards = gridRef.current?.querySelectorAll('.feature-card');
        cards?.forEach((card, i) => {
          const el = card as HTMLElement;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 80);
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="py-24 md:py-32 px-4" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="font-mono text-xs tracking-[0.15em] text-[#00D4FF] uppercase mb-4">FEATURES</p>
          <h2 className="font-display text-h1 text-white mb-2">
            Everything You Need to
          </h2>
          <h2 className="font-display text-h1 text-[#FF6B35] mb-6">
            Secure Your Digital Life
          </h2>
          <p className="text-base text-[#888] max-w-xl mx-auto">
            A complete vault system built for developers, creators, and privacy-conscious users.
          </p>
        </div>

        {/* Features Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card group rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{
                opacity: 0,
                transform: 'translateY(40px)',
                transition: 'opacity 0.6s cubic-bezier(0.33, 1, 0.68, 1), transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)',
              }}
            >
              {/* Checkerboard border wrapper */}
              <div
                className="p-[2px] rounded-xl transition-all duration-300 group-hover:brightness-125"
                style={{
                  background: `conic-gradient(
                    ${f.color} 90deg,
                    transparent 90deg 180deg,
                    ${f.color} 180deg 270deg,
                    transparent 270deg
                  )`,
                  backgroundSize: '8px 8px',
                }}
              >
                <div className="bg-[#0A0A0A] rounded-[10px] p-6">
                  <f.icon size={40} style={{ color: f.color }} className="mb-4" />
                  <h3 className="font-display text-xl font-semibold text-white mb-2">{f.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
