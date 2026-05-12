import { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

const plans = [
  {
    name: 'STARTER',
    price: '$0',
    period: '/mo',
    subtitle: 'Free forever',
    accent: '#00D4FF',
    features: [
      'Up to 100 vault items',
      '1 GitHub repository',
      'Basic encryption',
      'Community support',
      'Web access only',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'PRO',
    price: '$9',
    period: '/mo',
    subtitle: 'For power users',
    accent: '#FF6B35',
    features: [
      'Unlimited vault items',
      'Multiple GitHub repositories',
      'Advanced encryption + 2FA',
      'Priority sync',
      'Desktop & mobile apps',
      'Custom themes',
      'AI prompt suggestions',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
  {
    name: 'ENTERPRISE',
    price: '$29',
    period: '/mo',
    subtitle: 'For teams',
    accent: '#8B5CF6',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Shared repositories',
      'SSO / SAML',
      'Audit logs',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export default function Pricing() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const cards = gridRef.current?.querySelectorAll('.pricing-card');
        cards?.forEach((card, i) => {
          const el = card as HTMLElement;
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, i * 120);
        });
        observer.disconnect();
      }
    }, { threshold: 0.15 });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing" className="py-24 md:py-32 px-4" style={{ background: '#0D0D0D' }}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.15em] text-[#00D4FF] uppercase mb-4">PRICING</p>
          <h2 className="font-display text-h1 text-white">Choose Your Vault Tier</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="pricing-card relative bg-[#111] rounded-2xl p-8 transition-all duration-600"
              style={{
                opacity: 0,
                transform: 'translateY(60px)',
                border: plan.highlighted ? `2px solid ${plan.accent}` : '1px solid #222',
                background: plan.highlighted
                  ? `linear-gradient(180deg, ${plan.accent}0D 0%, transparent 60%), #111`
                  : '#111',
              }}
            >
              {/* Popular badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black"
                  style={{ background: plan.accent }}
                >
                  MOST POPULAR
                </div>
              )}

              <p className="font-mono text-xs tracking-wider mb-4" style={{ color: plan.accent }}>
                {plan.name}
              </p>

              <div className="flex items-baseline mb-2">
                <span className="font-display text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-[#888] ml-1">{plan.period}</span>
              </div>

              <p className="text-sm text-[#888] mb-6">{plan.subtitle}</p>

              <div className="h-px bg-[#222] mb-6" />

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Check size={14} style={{ color: plan.accent }} />
                    <span className="text-sm text-[#ccc]">{f}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                  plan.highlighted
                    ? 'wavy-pill text-black hover:shadow-[0_0_50px_rgba(255,107,53,0.4)]'
                    : 'bg-[#1A1A1A] text-white border border-[#222] hover:bg-[#00D4FF] hover:text-black hover:border-[#00D4FF]'
                }`}
                style={plan.highlighted ? { background: plan.accent } : {}}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
