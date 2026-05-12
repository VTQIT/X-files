import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const features = [
  'Client-side AES-256 encryption',
  'Zero-knowledge architecture',
  'GitHub repository as your personal cloud',
  'Open source and auditable',
];

export default function Security() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (leftRef.current) {
          leftRef.current.style.opacity = '1';
          leftRef.current.style.transform = 'translateY(0)';
        }
        const panels = rightRef.current?.querySelectorAll('.float-panel');
        panels?.forEach((panel, i) => {
          const el = panel as HTMLElement;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'rotateY(0deg) translateY(0)';
          }, i * 150);
        });
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    const section = document.getElementById('security');
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="security" className="py-24 md:py-32 px-4" style={{ background: '#0A0A0A' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div
          ref={leftRef}
          className="md:col-span-6 transition-all duration-800"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          <p className="font-mono text-xs tracking-[0.15em] text-[#39FF14] uppercase mb-4">SECURITY</p>
          <h2 className="font-display text-h1 text-white mb-6">
            Military-Grade Encryption, Zero Compromise
          </h2>
          <p className="text-base text-[#888] leading-relaxed mb-8">
            Your data is encrypted with AES-256 before it ever leaves your device. We never store your master password. Your vault syncs to your own private GitHub repository — you own the infrastructure.
          </p>

          <ul className="space-y-4 mb-8">
            {features.map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-[#39FF14]/10 flex items-center justify-center">
                  <Check size={12} className="text-[#39FF14]" />
                </div>
                <span className="text-sm text-white">{f}</span>
              </li>
            ))}
          </ul>

          <button className="wavy-pill bg-transparent border border-[#39FF14] text-[#39FF14] px-8 py-3 text-sm font-semibold hover:bg-[#39FF14] hover:text-black transition-all duration-300">
            Learn More
          </button>
        </div>

        {/* Right Column - Floating Panels */}
        <div ref={rightRef} className="md:col-span-6 relative h-[400px] md:h-[500px] perspective-[1000px]">
          {/* Panel 1 - Front */}
          <div
            className="float-panel absolute top-0 left-0 w-[280px] holographic-card rounded-xl p-5"
            style={{
              opacity: 0,
              transform: 'rotateY(15deg) translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
              animation: 'float 4s ease-in-out infinite',
              zIndex: 3,
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#39FF14]/10 flex items-center justify-center">
                <img src="/assets/shield-logo.png" alt="" className="w-6 h-6" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-[#555]">STATUS</p>
                <p className="font-mono text-sm text-[#39FF14] font-medium">ENCRYPTED</p>
              </div>
            </div>
            <div className="h-1 bg-[#222] rounded-full overflow-hidden">
              <div className="h-full w-[95%] bg-[#39FF14] rounded-full" />
            </div>
            <p className="font-mono text-[10px] text-[#555] mt-2">Security Score: 98%</p>
          </div>

          {/* Panel 2 - Mid */}
          <div
            className="float-panel absolute top-[120px] right-0 w-[260px] holographic-card rounded-xl p-4"
            style={{
              opacity: 0,
              transform: 'rotateY(15deg) translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
              animation: 'float 4s ease-in-out 0.5s infinite',
              zIndex: 2,
            }}
          >
            <img
              src="/assets/security-panel-2.jpg"
              alt="Code editor"
              className="w-full h-36 object-cover rounded-lg mb-3"
            />
            <p className="font-mono text-[10px] text-[#555]">ENCRYPTION LAYER</p>
            <p className="font-mono text-xs text-[#00D4FF]">AES-256-GCM</p>
          </div>

          {/* Panel 3 - Back */}
          <div
            className="float-panel absolute bottom-0 left-[40px] w-[240px] holographic-card rounded-xl p-4"
            style={{
              opacity: 0,
              transform: 'rotateY(15deg) translateY(20px)',
              transition: 'all 0.8s cubic-bezier(0.33, 1, 0.68, 1)',
              animation: 'float 4s ease-in-out 1s infinite',
              zIndex: 1,
            }}
          >
            <img
              src="/assets/security-panel-3.jpg"
              alt="GitHub repository"
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <p className="font-mono text-[10px] text-[#555]">REPOSITORY</p>
            <p className="font-mono text-xs text-[#39FF14]">github.com/vault/secure</p>
          </div>
        </div>
      </div>
    </section>
  );
}
