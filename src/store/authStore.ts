import { create } from 'zustand';

interface User {
  id: number;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,
  login: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ token: null, user: null });
  },
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Invalid token');
      const data = await res.json();
      set({ user: data.user });
    } catch (err) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      set({ token: null, user: null });
    }
  }
}));
