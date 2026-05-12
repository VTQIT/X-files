import { Users, HardDrive, Activity, BarChart3, Database, Settings, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const stats = [
  { label: 'Total Users', value: '1,247', change: '+12%', up: true, icon: Users, color: '#00D4FF' },
  { label: 'Storage Used', value: '84.2 GB', change: '+5%', up: true, icon: HardDrive, color: '#FF6B35' },
  { label: 'Active Sessions', value: '156', change: '-3%', up: false, icon: Activity, color: '#39FF14' },
  { label: 'API Requests', value: '2.4M', change: '+28%', up: true, icon: BarChart3, color: '#8B5CF6' },
];

const recentUsers = [
  { name: 'Sarah Miller', email: 'sarah@example.com', plan: 'Pro', status: 'active', lastActive: '2 min ago' },
  { name: 'James Wilson', email: 'james@example.com', plan: 'Starter', status: 'active', lastActive: '5 min ago' },
  { name: 'Emily Chen', email: 'emily@example.com', plan: 'Enterprise', status: 'active', lastActive: '12 min ago' },
  { name: 'Michael Brown', email: 'michael@example.com', plan: 'Pro', status: 'offline', lastActive: '2 hours ago' },
  { name: 'Lisa Park', email: 'lisa@example.com', plan: 'Starter', status: 'active', lastActive: '25 min ago' },
];

const systemHealth = [
  { name: 'Database', status: 'healthy', latency: '2ms' },
  { name: 'API Server', status: 'healthy', latency: '12ms' },
  { name: 'File Storage', status: 'healthy', latency: '45ms' },
  { name: 'GitHub Sync', status: 'degraded', latency: '320ms' },
  { name: 'Auth Service', status: 'healthy', latency: '8ms' },
];

export default function CMSPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-white">CMS Admin Panel</h1>
        <span className="text-xs px-3 py-1 rounded-full bg-[rgba(255,107,53,0.2)] text-[#FF6B35] font-medium">
          Admin Access
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => (
          <div key={s.label} className="bg-[#111] border border-[#222] rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#555]">{s.label}</span>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="font-display text-2xl font-bold text-white">{s.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {s.up ? (
                <ArrowUpRight size={12} className="text-[#39FF14]" />
              ) : (
                <ArrowDownRight size={12} className="text-[#FF6B35]" />
              )}
              <span className={`text-xs ${s.up ? 'text-[#39FF14]' : 'text-[#FF6B35]'}`}>{s.change}</span>
              <span className="text-xs text-[#555]">vs last week</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Users Table */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-white">Recent Users</h3>
            <button className="text-xs text-[#00D4FF] hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {recentUsers.map(u => (
              <div key={u.email} className="flex items-center gap-3 py-2">
                <div className="w-8 h-8 rounded-full bg-[#222] flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{u.name[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{u.name}</p>
                  <p className="font-mono text-[10px] text-[#555] truncate">{u.email}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  u.plan === 'Enterprise' ? 'bg-[rgba(139,92,246,0.2)] text-[#8B5CF6]' :
                  u.plan === 'Pro' ? 'bg-[rgba(255,107,53,0.2)] text-[#FF6B35]' :
                  'bg-[rgba(0,212,255,0.2)] text-[#00D4FF]'
                }`}>
                  {u.plan}
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-[#39FF14]' : 'bg-[#555]'}`} />
                  <span className="font-mono text-[10px] text-[#555]">{u.lastActive}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-[#111] border border-[#222] rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-bold text-white">System Health</h3>
            <div className="flex items-center gap-1.5">
              <Database size={14} className="text-[#39FF14]" />
              <span className="text-xs text-[#39FF14]">All Systems OK</span>
            </div>
          </div>
          <div className="space-y-4">
            {systemHealth.map(s => (
              <div key={s.name} className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  s.status === 'healthy' ? 'bg-[#39FF14]' : 'bg-[#FF6B35]'
                }`} />
                <span className="text-sm text-white flex-1">{s.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                    s.status === 'healthy' ? 'bg-[rgba(57,255,20,0.1)] text-[#39FF14]' : 'bg-[rgba(255,107,53,0.1)] text-[#FF6B35]'
                  }`}>
                    {s.status}
                  </span>
                  <span className="font-mono text-xs text-[#555] w-12 text-right">{s.latency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111] border border-[#222] rounded-xl p-6">
        <h3 className="font-display text-lg font-bold text-white mb-4">Admin Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Manage Users', icon: Users, color: '#00D4FF' },
            { label: 'View Storage', icon: HardDrive, color: '#FF6B35' },
            { label: 'System Logs', icon: Activity, color: '#39FF14' },
            { label: 'Configure', icon: Settings, color: '#8B5CF6' },
          ].map(a => (
            <button
              key={a.label}
              className="flex flex-col items-center gap-2 p-4 bg-[#0A0A0A] border border-[#222] rounded-xl hover:border-[#333] hover:-translate-y-0.5 transition-all duration-200"
            >
              <a.icon size={20} style={{ color: a.color }} />
              <span className="text-xs text-[#888]">{a.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
