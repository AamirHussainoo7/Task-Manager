import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const profile = await authService.getProfile();
      setUser(profile);
    } catch {
      setUser(null);
      authService.logout();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authService.isAuthenticated()) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, [fetchProfile]);

  const login = async (credentials) => {
    await authService.login(credentials);
    await fetchProfile();
  };

  const register = async (data) => {
    const result = await authService.register(data);
    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
