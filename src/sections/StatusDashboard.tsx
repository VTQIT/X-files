import { useEffect, useRef, useState } from 'react';

const metrics = [
  { label: 'STORAGE USED', value: 73, suffix: '%', target: 73 },
  { label: 'ITEMS SECURED', value: 0, suffix: '', target: 2847 },
  { label: 'SYNC STATUS', value: 0, suffix: '', target: 100, isText: true, text: 'Synced' },
  { label: 'LAST BACKUP', value: 0, suffix: '', target: 0, isTime: true },
];

const detailGrid = [
  { label: 'RESPONSE TIME', value: '12ms', color: '#00D4FF' },
  { label: 'UPTIME', value: '99.97%', color: '#39FF14' },
  { label: 'ENCRYPTION', value: 'AES-256', color: '#FF6B35' },
  { label: 'REPOSITORY', value: 'Connected', color: '#39FF14' },
];

const activityLog = [
  { time: '10:23:45', msg: 'File uploaded: resume.pdf', type: 'success' as const },
  { time: '09:15:22', msg: 'Note created: Project Ideas', type: 'info' as const },
  { time: '08:42:11', msg: 'Password added: AWS Console', type: 'success' as const },
  { time: '07:30:05', msg: 'Snippet saved: React Hook', type: 'info' as const },
  { time: '06:12:33', msg: 'URL bookmarked: Framer Docs', type: 'info' as const },
  { time: '05:45:18', msg: 'Prompt stored: Midjourney V6', type: 'success' as const },
  { time: '04:20:00', msg: 'Sync completed: GitHub', type: 'success' as const },
  { time: '03:00:00', msg: 'Backup: Daily complete', type: 'success' as const },
  { time: '02:30:00', msg: 'High memory usage detected', type: 'warning' as const },
];

function AnimatedCounter({ target, suffix, isText, text, isTime }: {
  target: number; suffix: string; isText?: boolean; text?: string; isTime?: boolean;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true;
        if (isText) { setCount(target); return; }
        if (isTime) { setCount(target); return; }
        const duration = 1500;
        const start = performance.now();
        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, isText, isTime]);

  return (
    <div ref={ref} className="font-mono text-white text-sm md:text-base">
      {isText ? text : isTime ? '2m ago' : `${count.toLocaleString()}${suffix}`}
    </div>
  );
}

export default function StatusDashboard() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const el = sectionRef.current;
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }
      }
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32 px-4" style={{ background: '#0D0D0D' }}>
      <div
        ref={sectionRef}
        className="max-w-[1200px] mx-auto glass-panel rounded-2xl p-6 md:p-8 transition-all duration-1000"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Status */}
          <div className="md:col-span-3 space-y-6">
            <div>
              <p className="font-mono text-xs tracking-wider text-[#00D4FF] mb-2">VAULT STATUS</p>
              <h3 className="font-display text-4xl md:text-5xl font-bold text-[#39FF14]">ACTIVE</h3>
              <p className="text-sm text-[#888] mt-1">All systems operational</p>
            </div>
            <div className="h-px bg-[#222]" />
            <div className="space-y-4">
              {metrics.map((m) => (
                <div key={m.label}>
                  <p className="font-mono text-[10px] tracking-wider text-[#555] mb-1">{m.label}</p>
                  <AnimatedCounter target={m.target} suffix={m.suffix} isText={m.isText} text={m.text} isTime={m.isTime} />
                </div>
              ))}
            </div>
          </div>

          {/* Center Column - Main Display */}
          <div className="md:col-span-6 flex flex-col justify-center">
            <div className="mb-6">
              <p className="font-mono text-h1 text-[#888] tracking-tight">
                PROMPT NOT SET<span className="text-[#FF6B35] animate-[blink_0.8s_step-end_infinite]">█</span>
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-[#222] rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-[#FF6B35] rounded-full relative"
                style={{ width: '73%' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_linear_infinite]" style={{ backgroundSize: '200% 100%' }} />
              </div>
            </div>

            {/* Detail grid */}
            <div className="grid grid-cols-2 gap-3">
              {detailGrid.map((d) => (
                <div key={d.label} className="bg-[#111] rounded-lg p-4">
                  <p className="font-mono text-[10px] tracking-wider text-[#555] mb-1">{d.label}</p>
                  <p className="font-mono text-sm" style={{ color: d.color }}>{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Activity Log */}
          <div className="md:col-span-3">
            <p className="font-mono text-xs tracking-wider text-[#FF6B35] mb-4">LIVE ACTIVITY</p>
            <div className="h-[280px] overflow-hidden relative">
              <div className="animate-[scrollUp_20s_linear_infinite]">
                {[...activityLog, ...activityLog].map((log, i) => (
                  <div key={i} className="flex items-start gap-2 py-2">
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{
                        background: log.type === 'success' ? '#39FF14' : log.type === 'warning' ? '#FF6B35' : '#00D4FF',
                      }}
                    />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] text-[#555]">{log.time}</p>
                      <p className="text-xs text-white truncate">{log.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
