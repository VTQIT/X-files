import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Github } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4" style={{ background: '#0A0A0A' }}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: ['#FF6B35', '#00D4FF', '#39FF14', '#8B5CF6'][i % 4],
              opacity: 0.3,
              animation: `float ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 2}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#111] border border-[#222] mb-4 animate-[pulse-glow_2s_ease-in-out_infinite]">
            <img src="/assets/shield-logo.png" alt="" className="w-8 h-8" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">Create Account</h1>
          <p className="text-sm text-[#888] mt-1">Start securing your digital life</p>
        </div>

        <div className="glass-panel rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full h-11 bg-[#111] border border-[#222] rounded-lg px-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 bg-[#111] border border-[#222] rounded-lg px-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022"
                  className="w-full h-11 bg-[#111] border border-[#222] rounded-lg px-4 pr-11 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" className="w-4 h-4 rounded border-[#222] bg-[#111] accent-[#FF6B35] mt-0.5" />
              <span className="text-xs text-[#888]">
                I agree to the{' '}
                <button type="button" className="text-[#00D4FF] hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button type="button" className="text-[#00D4FF] hover:underline">Privacy Policy</button>
              </span>
            </div>

            <button
              type="submit"
              className="wavy-pill w-full bg-[#FF6B35] text-black font-bold py-3 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]"
            >
              Create Account
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-[#222]" />
            <span className="text-xs text-[#555]">or</span>
            <div className="flex-1 h-px bg-[#222]" />
          </div>

          <button className="w-full flex items-center justify-center gap-3 h-11 bg-[#111] border border-[#222] rounded-lg text-sm text-white hover:bg-[#1A1A1A] hover:border-[#333] transition-all">
            <Github size={16} />
            Continue with GitHub
          </button>
        </div>

        <p className="text-center text-sm text-[#888] mt-6">
          Already have an account?{' '}
          <button onClick={() => navigate('/login')} className="text-[#FF6B35] hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
