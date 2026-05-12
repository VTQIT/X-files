export default function TickerTape() {
  const items = 'FILE VAULT \u25C6 MARKDOWN EDITOR \u25C6 URL MANAGER \u25C6 CODE SNIPPETS \u25C6 PASSWORD VAULT \u25C6 AI PROMPTS \u25C6 GITHUB SYNC \u25C6 CMS ADMIN \u25C6 ';

  return (
    <div className="w-full overflow-hidden py-4 border-y border-[#222]" style={{ background: '#080808' }}>
      <div className="flex whitespace-nowrap animate-[tickerScroll_40s_linear_infinite]">
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-[#555] shrink-0">
          {items.repeat(4)}
        </span>
        <span className="font-mono text-xs tracking-[0.15em] uppercase text-[#555] shrink-0">
          {items.repeat(4)}
        </span>
      </div>
    </div>
  );
}
