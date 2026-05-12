import { Github, Twitter, MessageCircle } from 'lucide-react';

const linkGroups = [
  {
    title: 'Product',
    links: ['Features', 'Security', 'Pricing', 'Changelog', 'Roadmap'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'GitHub', 'Community', 'Blog'],
  },
  {
    title: 'Legal',
    links: ['Privacy Policy', 'Terms of Service', 'License'],
  },
];

export default function Footer() {
  return (
    <footer className="pt-16 pb-8 px-4 border-t border-[#222]" style={{ background: '#050505' }}>
      <div className="max-w-6xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/assets/shield-logo.png" alt="" className="w-5 h-5" />
              <span className="font-display text-xs font-bold tracking-[0.1em] text-white">KAPTEN VAULT</span>
            </div>
            <p className="text-sm text-[#888] mb-4">Secure Everything.</p>
            <div className="flex items-center gap-4">
              {[
                { icon: Github, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: MessageCircle, href: '#' },
              ].map((s) => (
                <a key={s.icon.name} href={s.href} className="text-[#555] hover:text-white transition-colors duration-200">
                  <s.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-mono text-xs tracking-wider text-[#555] uppercase mb-4">{group.title}</h4>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#888] hover:text-white transition-colors duration-200 relative group"
                    >
                      {link}
                      <span className="absolute bottom-0 left-0 w-0 h-px bg-white group-hover:w-full transition-all duration-200" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-[#222]">
          <p className="font-mono text-[10px] text-[#555]">&copy; 2025 Kapten Vault. Open source under MIT License.</p>
          <p className="font-mono text-[10px] text-[#555] mt-2 sm:mt-0">Built with &hearts; for digital security</p>
        </div>
      </div>
    </footer>
  );
}
