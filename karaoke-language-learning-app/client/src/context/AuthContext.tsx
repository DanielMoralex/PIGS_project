import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface HistoryEntry {
  songId: string;
  date: string;
  score: number;
  totalGaps: number;
  correctGaps: number;
}

export interface User {
  username: string;
  email: string;
  age: number;
  nationality: string;
  favorites: string[];
  history: HistoryEntry[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  register: (username: string, password: string, email: string, age: number, nationality: string) => boolean;
  logout: () => void;
  toggleFavorite: (songId: string) => void;
  addToHistory: (songId: string, correctGaps: number, totalGaps: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('current-user');
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem('current-user', JSON.stringify(user));
    else localStorage.removeItem('current-user');
  }, [user]);

  const getUsers = () => JSON.parse(localStorage.getItem('users') || '{}');
  const saveUsers = (users: Record<string, { password: string; data: User }>) =>
    localStorage.setItem('users', JSON.stringify(users));

  const register = (username: string, password: string, email: string, age: number, nationality: string) => {
    const users = getUsers();
    if (users[username]) return false;
    const newUser: User = { username, email, age, nationality, favorites: [], history: [] };
    users[username] = { password, data: newUser };
    saveUsers(users);
    setUser(newUser);
    return true;
  };

  const login = (username: string, password: string) => {
    const users = getUsers();
    if (!users[username] || users[username].password !== password) return false;
    setUser(users[username].data);
    return true;
  };

  const logout = () => setUser(null);

  const updateUser = (updated: User) => {
    setUser(updated);
    const users = getUsers();
    if (users[updated.username]) {
      users[updated.username].data = updated;
      saveUsers(users);
    }
  };

  const toggleFavorite = (songId: string) => {
    if (!user) return;
    const favs = user.favorites.includes(songId)
      ? user.favorites.filter(id => id !== songId)
      : [...user.favorites, songId];
    updateUser({ ...user, favorites: favs });
  };

  const addToHistory = (songId: string, correctGaps: number, totalGaps: number) => {
    if (!user) return;
    const score = Math.round((correctGaps / totalGaps) * 100);
    const entry: HistoryEntry = {
      songId,
      score,
      correctGaps,
      totalGaps,
      date: new Date().toLocaleDateString(),
    };
    updateUser({ ...user, history: [entry, ...user.history].slice(0, 20) });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, toggleFavorite, addToHistory }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};