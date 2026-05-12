import { useState } from 'react';
import { Palette, User, Lock, Github, Key, Bell, Shield } from 'lucide-react';

const themes = [
  { id: 'dark-cyber', name: 'Dark Cyber', primary: '#FF6B35', secondary: '#00D4FF' },
  { id: 'neon-blue', name: 'Neon Blue', primary: '#00D4FF', secondary: '#0066FF' },
  { id: 'crimson-aura', name: 'Crimson Aura', primary: '#FF3333', secondary: '#FF6666' },
  { id: 'matrix-green', name: 'Matrix Green', primary: '#39FF14', secondary: '#00CC66' },
  { id: 'midnight-purple', name: 'Midnight Purple', primary: '#8B5CF6', secondary: '#A78BFA' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('appearance');
  const [selectedTheme, setSelectedTheme] = useState('dark-cyber');
  const [notifications, setNotifications] = useState({
    sync: true,
    security: true,
    updates: false,
    marketing: false,
  });

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'github', label: 'GitHub', icon: Github },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold text-white">Settings</h1>

      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 text-xs px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === t.id
                ? 'bg-[#FF6B35] text-black font-bold'
                : 'bg-[#111] border border-[#222] text-[#888] hover:text-white hover:border-[#333]'
            }`}
          >
            <t.icon size={14} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Appearance Tab */}
      {activeTab === 'appearance' && (
        <div className="space-y-6">
          <div className="bg-[#111] border border-[#222] rounded-xl p-6">
            <h3 className="font-display text-lg font-bold text-white mb-2">Theme</h3>
            <p className="text-sm text-[#888] mb-6">Choose your vault color scheme</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTheme(t.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedTheme === t.id ? 'border-[#FF6B35]' : 'border-[#222] hover:border-[#333]'
                  }`}
                >
                  <div className="flex gap-2 mb-3 justify-center">
                    <div className="w-6 h-6 rounded-full" style={{ background: t.primary }} />
                    <div className="w-6 h-6 rounded-full" style={{ background: t.secondary }} />
                  </div>
                  <p className="text-xs text-center text-white">{t.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6 max-w-lg">
          <div className="flex items-center gap-4">
            <img src="/assets/avatar-default.png" alt="" className="w-16 h-16 rounded-full bg-[#222]" />
            <div>
              <h3 className="font-display text-lg font-bold text-white">Alex Chen</h3>
              <p className="text-sm text-[#888]">alex@kapten.dev</p>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[rgba(255,107,53,0.2)] text-[#FF6B35] font-medium mt-1 inline-block">Pro Plan</span>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Display Name</label>
              <input type="text" defaultValue="Alex Chen" className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Email</label>
              <input type="email" defaultValue="alex@kapten.dev" className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-[#FF6B35]" />
            </div>
          </div>
          <button className="bg-[#FF6B35] text-black text-sm font-bold px-6 py-2.5 rounded-lg hover:shadow-[0_0_20px_rgba(255,107,53,0.3)] transition-all">
            Save Changes
          </button>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-[#39FF14]" />
            <h3 className="font-display text-lg font-bold text-white">Security Settings</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <p className="text-sm text-white">Two-Factor Authentication</p>
                <p className="text-xs text-[#888]">Add an extra layer of security</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-[rgba(57,255,20,0.1)] text-[#39FF14] font-medium">Enabled</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <p className="text-sm text-white">Master Password</p>
                <p className="text-xs text-[#888]">Last changed 30 days ago</p>
              </div>
              <button className="text-xs text-[#00D4FF] hover:underline">Change</button>
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#222]">
              <div>
                <p className="text-sm text-white">Session Timeout</p>
                <p className="text-xs text-[#888]">Auto-lock after 30 minutes</p>
              </div>
              <button className="text-xs text-[#00D4FF] hover:underline">Configure</button>
            </div>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm text-white">Active Sessions</p>
                <p className="text-xs text-[#888]">2 devices currently logged in</p>
              </div>
              <button className="text-xs text-[#FF6B35] hover:underline">Manage</button>
            </div>
          </div>
        </div>
      )}

      {/* GitHub Tab */}
      {activeTab === 'github' && (
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6 max-w-lg">
          <div className="flex items-center gap-3 mb-4">
            <Github size={20} className="text-white" />
            <h3 className="font-display text-lg font-bold text-white">GitHub Integration</h3>
          </div>

          <div className="flex items-center gap-4 p-4 bg-[rgba(57,255,20,0.05)] border border-[rgba(57,255,20,0.2)] rounded-xl">
            <div className="w-10 h-10 rounded-lg bg-[rgba(57,255,20,0.1)] flex items-center justify-center">
              <Key size={18} className="text-[#39FF14]" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">Connected</p>
              <p className="text-xs text-[#888]">github.com/alexkapten/vault</p>
            </div>
            <span className="ml-auto font-mono text-xs text-[#39FF14]">Active</span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Repository</label>
              <input type="text" defaultValue="alexkapten/vault" className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-[#FF6B35]" />
            </div>
            <div>
              <label className="block font-mono text-[10px] tracking-wider text-[#555] uppercase mb-2">Sync Frequency</label>
              <select className="w-full h-10 bg-[#0A0A0A] border border-[#222] rounded-lg px-4 text-sm text-white focus:outline-none focus:border-[#FF6B35]">
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Every hour</option>
                <option>Manual only</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-medium py-2.5 rounded-lg hover:bg-[#39FF14]/20 transition-colors">
              Force Sync
            </button>
            <button className="flex-1 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-sm font-medium py-2.5 rounded-lg hover:bg-[#FF6B35]/20 transition-colors">
              Disconnect
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-[#111] border border-[#222] rounded-xl p-6 space-y-6 max-w-lg">
          <h3 className="font-display text-lg font-bold text-white">Notification Preferences</h3>
          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between py-3 border-b border-[#222] last:border-0">
                <div>
                  <p className="text-sm text-white capitalize">{key} Alerts</p>
                  <p className="text-xs text-[#888]">
                    {key === 'sync' && 'Get notified when sync completes'}
                    {key === 'security' && 'Security-related notifications'}
                    {key === 'updates' && 'New feature announcements'}
                    {key === 'marketing' && 'Tips, offers, and updates'}
                  </p>
                </div>
                <button
                  onClick={() => setNotifications(p => ({ ...p, [key]: !p[key as keyof typeof p] }))}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    value ? 'bg-[#FF6B35]' : 'bg-[#222]'
                  }`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                    value ? 'translate-x-5' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
