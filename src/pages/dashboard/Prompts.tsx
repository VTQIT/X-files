import { useState } from 'react';
import { Search, Plus, Copy, Star, Sparkles, X } from 'lucide-react';
import { useVault } from '../../hooks/useVault';
import type { Prompt } from '../../types';

const categories = ['All', 'Three.js', 'React', 'UI Design', 'Backend', 'Frontend', 'DevOps'];

export default function PromptsPage() {
  const { prompts: initialPrompts } = useVault();
  const [prompts, setPrompts] = useState<Prompt[]>(initialPrompts);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [newPrompt, setNewPrompt] = useState({ title: '', category: 'Frontend', content: '' });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = prompts.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFav = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, favorite: !p.favorite } : p));
  };

  const handleAdd = () => {
    if (!newPrompt.title || !newPrompt.content) return;
    const prompt: Prompt = {
      id: String(Date.now()),
      title: newPrompt.title,
      content: newPrompt.content,
      category: newPrompt.category,
      usageCount: 0,
      createdAt: '2025-01-15',
      favorite: false,
    };
    setPrompts(prev => [prompt, ...prev]);
    setNewPrompt({ title: '', category: 'Frontend', content: '' });
    setShowAdd(false);
  };

  const catColors: Record<string, string> = {
    'Three.js': '#FF6B35',
    'React': '#00D4FF',
    'UI Design': '#39FF14',
    'Backend': '#8B5CF6',
    'Frontend': '#FF6B35',
    'DevOps': '#00D4FF',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">AI Prompt Vault</h1>
        <button
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-2 bg-[#FF6B35] text-black text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all"
        >
          <Plus size={16} />
          Add Prompt
        </button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search prompts..."
            className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                category === c
                  ? 'bg-[#FF6B35] text-black font-bold'
                  : 'bg-[#111] border border-[#222] text-[#888] hover:text-white hover:border-[#333]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map(p => {
          const accent = catColors[p.category] || '#FF6B35';
          return (
            <div
              key={p.id}
              className="bg-[#111] border border-[#222] rounded-xl p-4 hover:-translate-y-0.5 hover:border-[#333] transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                    style={{ background: `${accent}20`, color: accent }}
                  >
                    {p.category}
                  </span>
                  <h3 className="text-sm font-medium text-white">{p.title}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleFav(p.id)}
                    className="p-1 hover:bg-[#222] rounded transition-colors"
                  >
                    <Star size={14} className={p.favorite ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-[#555]'} />
                  </button>
                  <button
                    onClick={() => handleCopy(p.id, p.content)}
                    className="p-1 hover:bg-[#222] rounded transition-colors"
                  >
                    <Copy size={14} className={copiedId === p.id ? 'text-[#39FF14]' : 'text-[#555]'} />
                  </button>
                </div>
              </div>
              <p className="text-xs text-[#888] line-clamp-3 leading-relaxed mb-3">{p.content}</p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#555]">{p.usageCount} uses</span>
                <span className="font-mono text-[10px] text-[#555]">{p.createdAt}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Prompt Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#222] rounded-2xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Sparkles size={20} className="text-[#FF6B35]" />
                Add Prompt
              </h2>
              <button onClick={() => setShowAdd(false)} className="p-1 hover:bg-[#222] rounded transition-colors">
                <X size={20} className="text-[#555]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Title</label>
                <input
                  type="text"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt(p => ({ ...p, title: e.target.value }))}
                  placeholder="Prompt title..."
                  className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Category</label>
                <select
                  value={newPrompt.category}
                  onChange={(e) => setNewPrompt(p => ({ ...p, category: e.target.value }))}
                  className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-[#FF6B35] transition-colors"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Prompt Content</label>
                <textarea
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt(p => ({ ...p, content: e.target.value }))}
                  placeholder="Enter your prompt..."
                  rows={5}
                  className="w-full bg-[#0A0A0A] border border-[#222] rounded-lg px-4 py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors resize-none"
                />
              </div>
              <button
                onClick={handleAdd}
                className="wavy-pill w-full bg-[#FF6B35] text-black font-bold py-3 hover:shadow-[0_0_30px_rgba(255,107,53,0.4)]"
              >
                Save Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
