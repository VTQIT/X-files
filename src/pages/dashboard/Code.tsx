import { useState } from 'react';
import { Search, Plus, Copy, Star, FileCode } from 'lucide-react';

const snippets = [
  { id: '1', title: 'React Custom Hook', language: 'TypeScript', code: `import { useState, useEffect } from 'react';\n\nexport function useLocalStorage<T>(key: string, initial: T) {\n  const [value, setValue] = useState<T>(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initial;\n  });\n\n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n\n  return [value, setValue] as const;\n}`, favorite: true, tags: ['react', 'hooks'] },
  { id: '2', title: 'Python Decorator', language: 'Python', code: `import functools\nimport time\n\ndef timer(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        elapsed = time.time() - start\n        print(f'{func.__name__} took {elapsed:.4f}s')\n        return result\n    return wrapper`, favorite: false, tags: ['python', 'decorators'] },
  { id: '3', title: 'Docker Compose', language: 'YAML', code: `version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      - NODE_ENV=production\n    volumes:\n      - ./data:/app/data\n  db:\n    image: postgres:15\n    environment:\n      POSTGRES_PASSWORD: secret`, favorite: true, tags: ['docker', 'devops'] },
  { id: '4', title: 'SQL Query', language: 'SQL', code: `WITH recent_orders AS (\n  SELECT *\n  FROM orders\n  WHERE created_at >= NOW() - INTERVAL '30 days'\n)\nSELECT\n  u.name,\n  COUNT(o.id) as order_count,\n  SUM(o.total) as total_spent\nFROM users u\nJOIN recent_orders o ON o.user_id = u.id\nGROUP BY u.id\nORDER BY total_spent DESC\nLIMIT 10;`, favorite: false, tags: ['sql', 'database'] },
];

const langColors: Record<string, string> = {
  TypeScript: '#00D4FF',
  Python: '#39FF14',
  YAML: '#FF6B35',
  SQL: '#8B5CF6',
};

export default function CodePage() {
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = snippets.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.language.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Code Snippets</h1>
        <button className="flex items-center gap-2 bg-[#FF6B35] text-black text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all">
          <Plus size={16} />
          New Snippet
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search snippets..."
          className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      <div className="space-y-3">
        {filtered.map(s => (
          <div
            key={s.id}
            className="bg-[#111] border border-[#222] rounded-xl overflow-hidden hover:border-[#333] transition-all duration-200"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#222]">
              <div className="flex items-center gap-3">
                <FileCode size={16} style={{ color: langColors[s.language] || '#888' }} />
                <span className="text-sm font-medium text-white">{s.title}</span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                  style={{ background: `${langColors[s.language]}20`, color: langColors[s.language] }}
                >
                  {s.language}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="p-1.5 hover:bg-[#222] rounded transition-colors">
                  <Star size={14} className={s.favorite ? 'text-[#FF6B35] fill-[#FF6B35]' : 'text-[#555]'} />
                </button>
                <button
                  onClick={() => handleCopy(s.id, s.code)}
                  className="p-1.5 hover:bg-[#222] rounded transition-colors"
                >
                  <Copy size={14} className={copiedId === s.id ? 'text-[#39FF14]' : 'text-[#555]'} />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-x-auto">
              <pre className="font-mono text-xs text-[#ccc] leading-relaxed">
                {s.code}
              </pre>
            </div>
            <div className="px-4 py-2 border-t border-[#222] flex items-center gap-2">
              {s.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#1A1A1A] text-[#888]">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
