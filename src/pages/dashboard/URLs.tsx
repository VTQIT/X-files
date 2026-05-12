import { useState } from 'react';
import { Search, Plus, ExternalLink, Star, Tag } from 'lucide-react';

const sampleURLs = [
  { id: '1', title: 'Framer Documentation', url: 'https://www.framer.com/docs', category: 'Design Tools', favorite: true, tags: ['design', 'docs'] },
  { id: '2', title: 'Three.js Examples', url: 'https://threejs.org/examples', category: 'Development', favorite: true, tags: ['3d', 'webgl'] },
  { id: '3', title: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Reference', favorite: false, tags: ['reference', 'web'] },
  { id: '4', title: 'GitHub Copilot', url: 'https://github.com/features/copilot', category: 'AI Tools', favorite: true, tags: ['ai', 'productivity'] },
  { id: '5', title: 'Vercel Dashboard', url: 'https://vercel.com/dashboard', category: 'Deployment', favorite: false, tags: ['hosting', 'devops'] },
  { id: '6', title: 'Figma Community', url: 'https://www.figma.com/community', category: 'Design Tools', favorite: false, tags: ['design', 'community'] },
];

export default function URLsPage() {
  const [search, setSearch] = useState('');
  const [urls, setUrls] = useState(sampleURLs);

  const filtered = urls.filter(u =>
    u.title.toLowerCase().includes(search.toLowerCase()) ||
    u.url.toLowerCase().includes(search.toLowerCase())
  );

  const toggleFav = (id: string) => {
    setUrls(prev => prev.map(u => u.id === id ? { ...u, favorite: !u.favorite } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">URL Manager</h1>
        <button className="flex items-center gap-2 bg-[#FF6B35] text-black text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all">
          <Plus size={16} />
          Add URL
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search URLs..."
          className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(u => (
          <div
            key={u.id}
            className="group bg-[#111] border border-[#222] rounded-xl p-4 hover:-translate-y-1 hover:border-[#333] transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#222] text-[#00D4FF]">{u.category}</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleFav(u.id)}
                  className="p-1 hover:bg-[#222] rounded transition-colors"
                >
                  <Star size={14} className={u.favorite ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-[#555]'} />
                </button>
                <a href={u.url} target="_blank" rel="noopener noreferrer" className="p-1 hover:bg-[#222] rounded transition-colors">
                  <ExternalLink size={14} className="text-[#555] hover:text-[#00D4FF]" />
                </a>
              </div>
            </div>

            <h3 className="text-sm font-medium text-white mb-1 truncate">{u.title}</h3>
            <p className="font-mono text-[10px] text-[#555] truncate mb-3">{u.url}</p>

            <div className="flex items-center gap-1.5 flex-wrap">
              {u.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#888] flex items-center gap-1">
                  <Tag size={8} />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
