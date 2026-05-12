import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FolderOpen, FileText, Link2, Code2,
  Sparkles, Lock, Github, Settings, Shield, LogOut,
  ChevronLeft, ChevronRight, Search, Bell, Palette
} from 'lucide-react';
import { useVault } from '../hooks/useVault';
import DashboardHome from './dashboard/Home';
import FilesPage from './dashboard/Files';
import NotesPage from './dashboard/Notes';
import URLsPage from './dashboard/URLs';
import CodePage from './dashboard/Code';
import PromptsPage from './dashboard/Prompts';
import PasswordsPage from './dashboard/Passwords';
import SettingsPage from './dashboard/Settings';
import CMSPage from './dashboard/CMS';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '' },
  { id: 'files', label: 'Files', icon: FolderOpen, path: 'files' },
  { id: 'notes', label: 'Notes', icon: FileText, path: 'notes' },
  { id: 'urls', label: 'URLs', icon: Link2, path: 'urls' },
  { id: 'code', label: 'Code', icon: Code2, path: 'code' },
  { id: 'prompts', label: 'Prompts', icon: Sparkles, path: 'prompts' },
  { id: 'passwords', label: 'Passwords', icon: Lock, path: 'passwords' },
  { id: 'github', label: 'GitHub Sync', icon: Github, path: 'github' },
  { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
  { id: 'cms', label: 'CMS Panel', icon: Shield, path: 'cms' },
];

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useVault();
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.replace('/dashboard/', '');

  return (
    <div className="flex min-h-[100dvh]" style={{ background: '#0A0A0A' }}>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:relative z-50 h-[100dvh] bg-[#111] border-r border-[#222] flex flex-col transition-all duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        style={{ width: collapsed ? 64 : 260 }}
      >
        {/* Logo area */}
        <div className="h-16 flex items-center px-4 border-b border-[#222]">
          <div className="flex items-center gap-3 overflow-hidden">
            <img src="/assets/shield-logo.png" alt="" className="w-6 h-6 shrink-0" />
            {!collapsed && (
              <span className="font-display text-xs font-bold tracking-[0.1em] text-white whitespace-nowrap">
                KAPTEN VAULT
              </span>
            )}
          </div>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="ml-auto hidden md:flex items-center justify-center w-7 h-7 rounded-lg hover:bg-[#222] text-[#555] hover:text-white transition-colors"
          >
            {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
          <button
            onClick={() => setMobileOpen(false)}
            className="ml-auto md:hidden text-[#555]"
          >
            <ChevronLeft size={20} />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (currentPath === '' && item.path === '');
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigate(`/dashboard/${item.path}`);
                  setMobileOpen(false);
                }}
                className={`w-full flex items-center h-11 px-4 transition-all duration-200 group ${
                  isActive
                    ? 'bg-[rgba(255,107,53,0.1)] border-l-[3px] border-[#FF6B35] text-white'
                    : 'border-l-[3px] border-transparent text-[#888] hover:bg-[rgba(255,255,255,0.03)] hover:text-white'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <item.icon size={20} className="shrink-0" />
                {!collapsed && (
                  <span className="ml-3 text-sm whitespace-nowrap">{item.label}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* User section */}
        <div className="p-4 border-t border-[#222]">
          <div className="flex items-center gap-3">
            <img
              src={user?.avatar || '/assets/avatar-default.png'}
              alt=""
              className="w-8 h-8 rounded-full bg-[#222] shrink-0"
            />
            {!collapsed && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm text-white truncate">{user?.name}</p>
                <p className="text-xs text-[#555] truncate">{user?.email}</p>
              </div>
            )}
            <button
              onClick={() => { logout(); navigate('/'); }}
              className="p-1.5 rounded-lg hover:bg-[#222] text-[#555] hover:text-[#FF6B35] transition-colors shrink-0"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 flex items-center px-4 border-b border-[#222] bg-[rgba(10,10,10,0.8)] backdrop-blur-lg">
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden mr-4 text-[#555]"
          >
            <ChevronRight size={20} />
          </button>

          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555]" />
              <input
                type="text"
                placeholder="Search your vault..."
                className="w-full h-9 bg-[#111] border border-[#222] rounded-lg pl-9 pr-4 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#FF6B35] transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 ml-4">
            <button className="relative p-2 rounded-lg hover:bg-[#222] text-[#555] hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B35] rounded-full" />
            </button>
            <button className="p-2 rounded-lg hover:bg-[#222] text-[#555] hover:text-white transition-colors">
              <Palette size={18} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Routes>
            <Route path="" element={<DashboardHome />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="notes" element={<NotesPage />} />
            <Route path="urls" element={<URLsPage />} />
            <Route path="code" element={<CodePage />} />
            <Route path="prompts" element={<PromptsPage />} />
            <Route path="passwords" element={<PasswordsPage />} />
            <Route path="github" element={<GitHubSyncPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="cms" element={<CMSPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function GitHubSyncPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-white mb-6">GitHub Sync</h1>
      <div className="glass-panel rounded-xl p-8 max-w-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 flex items-center justify-center">
            <Github size={24} className="text-[#39FF14]" />
          </div>
          <div>
            <p className="text-white font-medium">Repository Connected</p>
            <p className="text-sm text-[#888]">github.com/alexkapten/vault</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-[#222]">
            <span className="text-sm text-[#888]">Last Sync</span>
            <span className="font-mono text-sm text-white">2 minutes ago</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#222]">
            <span className="text-sm text-[#888]">Sync Frequency</span>
            <span className="font-mono text-sm text-[#00D4FF]">Every 5 min</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-[#222]">
            <span className="text-sm text-[#888]">Total Commits</span>
            <span className="font-mono text-sm text-white">1,247</span>
          </div>
        </div>

        <button className="mt-6 w-full py-2.5 bg-[#39FF14]/10 border border-[#39FF14]/30 rounded-lg text-[#39FF14] text-sm font-medium hover:bg-[#39FF14]/20 transition-colors">
          Force Sync Now
        </button>
      </div>
    </div>
  );
}
