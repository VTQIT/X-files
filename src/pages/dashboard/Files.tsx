import { useState } from 'react';
import { Upload, Search, MoreVertical, FileText, Image, FileJson, FileCode } from 'lucide-react';
import { useVault } from '../../hooks/useVault';

const typeIcons: Record<string, React.ReactNode> = {
  pdf: <FileText size={20} className="text-[#FF6B35]" />,
  markdown: <FileText size={20} className="text-[#00D4FF]" />,
  json: <FileJson size={20} className="text-[#39FF14]" />,
  image: <Image size={20} className="text-[#8B5CF6]" />,
  yaml: <FileCode size={20} className="text-[#FF6B35]" />,
};

export default function FilesPage() {
  const { files } = useVault();
  const [search, setSearch] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);

  const filtered = files.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">File Vault</h1>
        <span className="font-mono text-xs text-[#555]">{files.length} files</span>
      </div>

      {/* Upload Zone */}
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-[#00D4FF] bg-[rgba(0,212,255,0.03)]'
            : 'border-[#222] hover:border-[#333]'
        }`}
        onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setIsDragOver(false); }}
      >
        <Upload size={32} className="mx-auto mb-3 text-[#555]" />
        <p className="text-sm text-white mb-1">Drop files here or click to upload</p>
        <p className="text-xs text-[#555]">Supports images, PDFs, documents up to 50MB</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search files..."
          className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      {/* File Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((file) => (
          <div
            key={file.id}
            className="flex items-center gap-4 p-4 bg-[#111] border border-[#222] rounded-xl hover:border-[#333] hover:-translate-y-0.5 transition-all duration-200 group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#1A1A1A] flex items-center justify-center shrink-0">
              {typeIcons[file.type] || <FileText size={20} className="text-[#888]" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white truncate">{file.name}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-mono text-[10px] text-[#555]">{file.size}</span>
                <span className="font-mono text-[10px] text-[#555]">{file.createdAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
              {file.tags.map(tag => (
                <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#222] text-[#888]">{tag}</span>
              ))}
              <button className="p-1 hover:bg-[#222] rounded transition-colors">
                <MoreVertical size={14} className="text-[#555]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
