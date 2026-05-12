import React, { createContext, useContext, useState, useCallback } from 'react';
import type { User, VaultItem, ActivityLog, Prompt, FileItem } from '../types';

interface VaultContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
  items: VaultItem[];
  prompts: Prompt[];
  files: FileItem[];
  activityLogs: ActivityLog[];
  theme: string;
  setTheme: (theme: string) => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (v: boolean) => void;
  addItem: (item: VaultItem) => void;
  deleteItem: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

const VaultContext = createContext<VaultContextType | null>(null);

const defaultUser: User = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex@kapten.dev',
  avatar: '/assets/avatar-default.png',
  plan: 'pro',
  storageUsed: 2.4,
  storageTotal: 10,
};

const defaultPrompts: Prompt[] = [
  { id: '1', title: 'Three.js Particle System', content: 'Create a cinematic 3D particle system with bloom and chromatic aberration post-processing effects...', category: 'Three.js', usageCount: 42, createdAt: '2025-01-15', favorite: true },
  { id: '2', title: 'React TypeScript Component', content: 'Write a TypeScript React component with Framer Motion animations and proper typing...', category: 'React', usageCount: 38, createdAt: '2025-01-14', favorite: false },
  { id: '3', title: 'Dark Dashboard Design', content: 'Generate a dark-themed dashboard with glassmorphism cards and neon accent colors...', category: 'UI Design', usageCount: 27, createdAt: '2025-01-12', favorite: true },
  { id: '4', title: 'JWT Auth System', content: 'Build a secure authentication system with JWT, bcrypt hashing, and refresh tokens...', category: 'Backend', usageCount: 55, createdAt: '2025-01-10', favorite: false },
  { id: '5', title: 'GSAP Scroll Animations', content: 'Design a responsive landing page with GSAP scroll-triggered animations and parallax effects...', category: 'Frontend', usageCount: 31, createdAt: '2025-01-08', favorite: true },
  { id: '6', title: 'GitHub Backup Script', content: 'Create a Python script for automated GitHub repository backup with error handling...', category: 'DevOps', usageCount: 19, createdAt: '2025-01-05', favorite: false },
];

const defaultFiles: FileItem[] = [
  { id: '1', name: 'resume.pdf', type: 'pdf', size: '2.4 MB', createdAt: '2025-01-15', tags: ['work'] },
  { id: '2', name: 'project-ideas.md', type: 'markdown', size: '12 KB', createdAt: '2025-01-14', tags: ['notes'] },
  { id: '3', name: 'api-keys.json', type: 'json', size: '3 KB', createdAt: '2025-01-13', tags: ['secrets'] },
  { id: '4', name: 'banner-design.png', type: 'image', size: '1.8 MB', createdAt: '2025-01-12', tags: ['design'] },
  { id: '5', name: 'server-config.yml', type: 'yaml', size: '8 KB', createdAt: '2025-01-10', tags: ['devops'] },
  { id: '6', name: 'meeting-notes.md', type: 'markdown', size: '5 KB', createdAt: '2025-01-09', tags: ['notes'] },
];

const defaultActivityLogs: ActivityLog[] = [
  { id: '1', message: 'File uploaded: resume.pdf', timestamp: '10:23:45', type: 'success' },
  { id: '2', message: 'Note created: Project Ideas', timestamp: '09:15:22', type: 'info' },
  { id: '3', message: 'Password added: AWS Console', timestamp: '08:42:11', type: 'success' },
  { id: '4', message: 'Snippet saved: React Hook', timestamp: '07:30:05', type: 'info' },
  { id: '5', message: 'URL bookmarked: Framer Docs', timestamp: '06:12:33', type: 'info' },
  { id: '6', message: 'Prompt stored: Midjourney V6', timestamp: '05:45:18', type: 'success' },
  { id: '7', message: 'Sync completed: GitHub', timestamp: '04:20:00', type: 'success' },
  { id: '8', message: 'Backup: Daily complete', timestamp: '03:00:00', type: 'success' },
];

export function VaultProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(defaultUser);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [items, setItems] = useState<VaultItem[]>([]);
  const [prompts] = useState<Prompt[]>(defaultPrompts);
  const [files] = useState<FileItem[]>(defaultFiles);
  const [activityLogs] = useState<ActivityLog[]>(defaultActivityLogs);
  const [theme, setTheme] = useState('dark-cyber');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const login = useCallback((email: string, password: string) => {
    console.log('Login:', email, password);
    setUser(defaultUser);
    setIsAuthenticated(true);
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    console.log('Register:', name, email, password);
    setUser({ ...defaultUser, name, email });
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const addItem = useCallback((item: VaultItem) => {
    setItems(prev => [...prev, item]);
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, favorite: !i.favorite } : i));
  }, []);

  return (
    <VaultContext.Provider value={{
      user, isAuthenticated, login, register, logout,
      items, prompts, files, activityLogs,
      theme, setTheme,
      sidebarCollapsed, setSidebarCollapsed,
      addItem, deleteItem, toggleFavorite,
    }}>
      {children}
    </VaultContext.Provider>
  );
}

export function useVault() {
  const context = useContext(VaultContext);
  if (!context) throw new Error('useVault must be used within VaultProvider');
  return context;
}
