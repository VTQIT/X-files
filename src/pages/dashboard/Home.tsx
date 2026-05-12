import { useNavigate } from 'react-router-dom';
import {
  FolderOpen, FileText,
  Sparkles, Lock, Github, Upload
} from 'lucide-react';
import { useVault } from '../../hooks/useVault';

const quickActions = [
  { label: 'Upload File', icon: Upload, color: '#FF6B35', path: 'files' },
  { label: 'New Note', icon: FileText, color: '#00D4FF', path: 'notes' },
  { label: 'Add Password', icon: Lock, color: '#FF6B35', path: 'passwords' },
  { label: 'Save Prompt', icon: Sparkles, color: '#00D4FF', path: 'prompts' },
];

const stats = [
  { label: 'Total Items', value: '2,847', icon: FolderOpen, color: '#00D4FF' },
  { label: 'Storage Used', value: '73%', icon: FolderOpen, color: '#FF6B35', progress: 73 },
  { label: 'Last Sync', value: '2m ago', icon: Github, color: '#39FF14' },
  { label: 'Security Score', value: '98%', icon: Lock, color: '#39FF14' },
];

export default function DashboardHome() {
  const { activityLogs } = useVault();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#555]">{s.label}</span>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            {'progress' in s && (
              <div className="mt-3 h-1 bg-[#222] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${s.progress}%`, background: s.color }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <h3 className="font-mono text-xs tracking-wider text-[#555] uppercase mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => navigate(`/dashboard/${a.path}`)}
                className="group flex flex-col items-center gap-3 p-5 bg-[#111] border border-[#222] rounded-xl hover:-translate-y-1 transition-all duration-300"
                style={{
                  '--card-accent': a.color,
                } as React.CSSProperties}
              >
                <div
                  className="p-[2px] rounded-xl"
                  style={{
                    background: `conic-gradient(${a.color} 90deg, transparent 90deg 180deg, ${a.color} 180deg 270deg, transparent 270deg)`,
                    backgroundSize: '8px 8px',
                  }}
                >
                  <div className="bg-[#111] rounded-[10px] p-2">
                    <a.icon size={20} style={{ color: a.color }} />
                  </div>
                </div>
                <span className="text-xs text-[#888] group-hover:text-white transition-colors">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <h3 className="font-mono text-xs tracking-wider text-[#555] uppercase mb-4">Recent Activity</h3>
          <div className="bg-[#111] border border-[#222] rounded-xl p-5">
            <div className="space-y-3">
              {activityLogs.slice(0, 6).map((log) => (
                <div key={log.id} className="flex items-start gap-3 py-2">
                  <div
                    className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                    style={{
                      background: log.type === 'success' ? '#39FF14' : log.type === 'warning' ? '#FF6B35' : '#00D4FF',
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white truncate">{log.message}</p>
                  </div>
                  <span className="font-mono text-xs text-[#555] shrink-0">{log.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Preview Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#FF6B35]/10 via-[#00D4FF]/10 to-[#8B5CF6]/10 border border-[#222] p-8">
        <div className="relative z-10">
          <h3 className="font-display text-xl font-bold text-white mb-2">Your Vault Dashboard</h3>
          <p className="text-sm text-[#888] max-w-md mb-4">
            Welcome to Kapten Vault. All your digital assets are secure and synced with GitHub.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
            <span className="font-mono text-xs text-[#39FF14]">All systems operational</span>
          </div>
        </div>
        <img
          src="/assets/dashboard-preview.jpg"
          alt=""
          className="absolute right-0 top-0 w-1/2 h-full object-cover opacity-20 mask-gradient"
          style={{ maskImage: 'linear-gradient(to right, transparent, black 50%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 50%)' }}
        />
      </div>
    </div>
  );
}
