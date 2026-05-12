import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (!isLanding) {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'Security', id: 'security' },
    { label: 'Pricing', id: 'pricing' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,10,10,0.9)] backdrop-blur-[20px] border-b border-[#222]'
            : 'bg-transparent'
        }`}
        style={{ padding: '0 clamp(1rem, 4vw, 3rem)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/assets/shield-logo.png" alt="" className="w-5 h-5 object-contain" />
          <span className="font-display text-xs font-bold tracking-[0.1em] text-white">KAPTEN VAULT</span>
        </div>

        {/* Center links - desktop */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="relative text-sm text-[#888] hover:text-white transition-colors duration-200 group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#FF6B35] group-hover:w-full transition-all duration-200" />
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">
          <button
            onClick={() => navigate('/login')}
            className="hidden md:block text-sm text-white hover:opacity-70 transition-opacity duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/dashboard')}
            className="hidden md:block bg-[#FF6B35] text-black font-semibold text-sm px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)] transition-all duration-200"
          >
            Enter Vault
          </button>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[rgba(0,0,0,0.95)] backdrop-blur-[30px] flex flex-col items-center justify-center">
          <button className="absolute top-4 right-4 text-white" onClick={() => setMobileOpen(false)}>
            <X size={32} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-h2 font-display text-[#888] hover:text-white transition-colors duration-200 py-4"
              style={{ animation: `fadeInUp 0.5s ease ${i * 0.08}s both` }}
            >
              {link.label}
            </button>
          ))}
          <div className="flex flex-col gap-4 mt-8">
            <button
              onClick={() => { setMobileOpen(false); navigate('/login'); }}
              className="text-lg text-white"
            >
              Login
            </button>
            <button
              onClick={() => { setMobileOpen(false); navigate('/dashboard'); }}
              className="bg-[#FF6B35] text-black font-bold px-8 py-3 rounded-full"
            >
              Enter Vault
            </button>
          </div>
        </div>
      )}
    </>
  );
}
