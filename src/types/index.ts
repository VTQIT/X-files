export interface VaultItem {
  id: string;
  type: 'file' | 'note' | 'url' | 'code' | 'prompt' | 'password';
  title: string;
  content?: string;
  category?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
  size?: string;
  language?: string;
  favorite?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'starter' | 'pro' | 'enterprise';
  storageUsed: number;
  storageTotal: number;
}

export interface ActivityLog {
  id: string;
  message: string;
  timestamp: string;
  type: 'success' | 'info' | 'warning';
}

export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
}

export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  usageCount: number;
  createdAt: string;
  favorite: boolean;
}

export interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string;
  createdAt: string;
  tags: string[];
  thumbnail?: string;
}
