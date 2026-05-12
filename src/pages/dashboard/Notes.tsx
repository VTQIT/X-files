import { useState } from 'react';
import { Search, Plus, Clock } from 'lucide-react';

const sampleNotes = [
  { id: '1', title: 'Project Ideas 2025', content: '# Project Ideas\n\n## AI-Powered Tools\n- Auto code reviewer\n- Smart documentation generator\n- Bug prediction system\n\n## Web Apps\n- Collaborative markdown editor\n- Real-time sync dashboard...', preview: 'AI-Powered Tools, Web Apps, Developer Tools...', date: '2025-01-14', tags: ['ideas'] },
  { id: '2', title: 'Meeting Notes: Sprint 12', content: '# Sprint 12 Planning\n\n### Attendees\n- Sarah (PM)\n- Mike (Dev)\n- Alex (Design)\n\n### Goals\n1. Launch v2.0 beta\n2. Fix critical bugs\n3. Performance optimization...', preview: 'Sprint goals, attendees, action items...', date: '2025-01-13', tags: ['work'] },
  { id: '3', title: 'Docker Cheat Sheet', content: '# Docker Commands\n\n```bash\n# Build image\ndocker build -t myapp .\n\n# Run container\ndocker run -p 3000:3000 myapp\n\n# List containers\ndocker ps -a\n```', preview: 'Common Docker commands and tips...', date: '2025-01-10', tags: ['devops'] },
  { id: '4', title: 'Book Recommendations', content: '# Books to Read\n\n## Tech\n- Designing Data-Intensive Applications\n- Clean Architecture\n- The Pragmatic Programmer\n\n## Fiction\n- Project Hail Mary\n- The Three-Body Problem...', preview: 'Tech books, fiction recommendations...', date: '2025-01-08', tags: ['personal'] },
];

export default function NotesPage() {
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState<string | null>(null);

  const filtered = sampleNotes.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const currentNote = sampleNotes.find(n => n.id === selectedNote);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">Markdown Notes</h1>
        <button className="flex items-center gap-2 bg-[#FF6B35] text-black text-sm font-bold px-4 py-2 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all">
          <Plus size={16} />
          New Note
        </button>
      </div>

      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search notes..."
          className="w-full h-10 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Notes List */}
        <div className="space-y-2">
          {filtered.map(note => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                selectedNote === note.id
                  ? 'bg-[rgba(255,107,53,0.1)] border-[#FF6B35]'
                  : 'bg-[#111] border-[#222] hover:border-[#333]'
              }`}
            >
              <h3 className="text-sm font-medium text-white mb-1">{note.title}</h3>
              <p className="text-xs text-[#888] line-clamp-2 mb-2">{note.preview}</p>
              <div className="flex items-center gap-2">
                <Clock size={10} className="text-[#555]" />
                <span className="font-mono text-[10px] text-[#555]">{note.date}</span>
                {note.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#222] text-[#888]">{tag}</span>
                ))}
              </div>
            </button>
          ))}
        </div>

        {/* Editor/Preview */}
        <div className="lg:col-span-2 bg-[#111] border border-[#222] rounded-xl overflow-hidden">
          {currentNote ? (
            <div className="h-full flex flex-col">
              <div className="flex items-center gap-2 p-3 border-b border-[#222] bg-[#0A0A0A]">
                <button className="text-xs px-3 py-1 rounded bg-[#222] text-white">Edit</button>
                <button className="text-xs px-3 py-1 rounded hover:bg-[#222] text-[#888]">Preview</button>
                <span className="ml-auto font-mono text-[10px] text-[#555]">{currentNote.date}</span>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <pre className="font-mono text-sm text-[#ccc] whitespace-pre-wrap leading-relaxed">
                  {currentNote.content}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center">
              <p className="text-sm text-[#555]">Select a note to view</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
