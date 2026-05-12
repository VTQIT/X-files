import { useState } from 'react';
import { Search, Plus, Eye, EyeOff, Copy, Shield } from 'lucide-react';

const passwords = [
  { id: '1', name: 'AWS Console', username: 'admin@company.com', password: 'SuperSecret123!@#', category: 'Cloud', strength: 'strong' },
  { id: '2', name: 'GitHub', username: 'alexkapten', password: 'ghp_xxxxxxxxxxxx', category: 'Development', strength: 'strong' },
  { id: '3', name: 'Vercel', username: 'alex@kapten.dev', password: 'VercelPass789!', category: 'Deployment', strength: 'medium' },
  { id: '4', name: 'MongoDB Atlas', username: 'cluster-admin', password: 'Mongo$ecure2025', category: 'Database', strength: 'strong' },
  { id: '5', name: 'Stripe Dashboard', username: 'finance@company.com', password: 'Stripe$$456', category: 'Finance', strength: 'medium' },
  { id: '6', name: 'Figma', username: 'alex@kapten.dev', password: 'FigmaDesign99!', category: 'Design', strength: 'strong' },
];

export default function PasswordsPage() {
  const [search, setSearch] = useState('');
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = passwords.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleVisibility = (id: string) => {
    setVisibleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCopy = (id: string, password: string) => {
    navigator.clipboard.writeText(password).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const strengthColor = (s: string) => {
    if (s === 'strong') return '#39FF14';
    if (s === 'medium') return '#FF6B35';
    return '#FF4444';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Shield size={24} className="text-[#FF6B35]" />
          <h1 className="font-display text-2xl font-bold text-white">Password Vault</h1>
        </div>
        <button className="flex items-center gap-2 bg-[#FF6B35] text-black text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all">
          <Plus size={16} />
          Add Password
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search passwords..."
          className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      {/* Security Banner */}
      <div className="flex items-center gap-4 p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)] rounded-xl">
        <div className="w-10 h-10 rounded-lg bg-[rgba(57,255,20,0.1)] flex items-center justify-center">
          <Shield size={20} className="text-[#39FF14]" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">AES-256 Encryption Active</p>
          <p className="text-xs text-[#888]">All passwords are encrypted before storage. Zero-knowledge architecture.</p>
        </div>
        <span className="ml-auto font-mono text-xs text-[#39FF14] px-2 py-1 rounded-full bg-[rgba(57,255,20,0.1)]">SECURE</span>
      </div>

      <div className="space-y-2">
        {filtered.map(p => (
          <div
            key={p.id}
            className="flex items-center gap-4 p-4 bg-[#111] border border-[#222] rounded-xl hover:border-[#333] transition-all duration-200"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0">
              <span className="font-display text-lg font-bold text-[#FF6B35]">{p.name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">{p.name}</p>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{ background: `${strengthColor(p.strength)}20`, color: strengthColor(p.strength) }}
                >
                  {p.strength}
                </span>
              </div>
              <p className="font-mono text-xs text-[#555] truncate">{p.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-[#0A0A0A] rounded-lg px-3 py-1.5">
                <span className="font-mono text-xs text-[#888]">
                  {visibleIds.has(p.id) ? p.password : '\u2022'.repeat(12)}
                </span>
              </div>
              <button
                onClick={() => toggleVisibility(p.id)}
                className="p-1.5 hover:bg-[#222] rounded transition-colors"
              >
                {visibleIds.has(p.id) ? <EyeOff size={14} className="text-[#888]" /> : <Eye size={14} className="text-[#555]" />}
              </button>
              <button
                onClick={() => handleCopy(p.id, p.password)}
                className="p-1.5 hover:bg-[#222] rounded transition-colors"
              >
                <Copy size={14} className={copiedId === p.id ? 'text-[#39FF14]' : 'text-[#555]'} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
