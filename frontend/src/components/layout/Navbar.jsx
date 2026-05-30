import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { ChevronDown, Sun, Moon, Menu, Search, Plus } from 'lucide-react';

export default function Navbar({ onMenuToggle, isMobileMenuOpen, searchQuery, onSearchChange, onNewTask }) {
  const { user } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const [profileOpen, setProfileOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setProfileOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Theme tokens
  const t = {
    bg: isDark ? '#0f172a' : '#ffffff',
    border: isDark ? '#1e293b' : '#e2e8f0',
    icon: isDark ? '#64748b' : '#94a3b8',
    searchBg: isDark ? '#1e293b' : '#f8fafc',
    searchBorder: isDark ? '#334155' : '#e2e8f0',
    searchText: isDark ? '#e2e8f0' : '#1e293b',
    searchFocusBg: isDark ? '#0f172a' : '#fff',
    kbdBg: isDark ? '#1e293b' : '#fff',
    kbdBorder: isDark ? '#334155' : '#e2e8f0',
    kbdText: isDark ? '#64748b' : '#94a3b8',
    dropBg: isDark ? '#1e293b' : '#fff',
    dropBorder: isDark ? '#334155' : '#e2e8f0',
    dropName: isDark ? '#f1f5f9' : '#0f172a',
    dropEmail: isDark ? '#94a3b8' : '#64748b',
    dropDivider: isDark ? '#334155' : '#f1f5f9',
    avatarBg: isDark ? '#1e3a5f' : '#dbeafe',
    avatarText: isDark ? '#60a5fa' : '#2563eb',
  };

  return (
    <header style={{ flexShrink: 0, zIndex: 40, height: '56px', backgroundColor: t.bg, borderBottom: `1px solid ${t.border}` }}>
      <div style={{ display: 'flex', height: '100%', alignItems: 'center', gap: '16px', padding: '0 24px' }}>
        {/* Hamburger */}
        <button onClick={onMenuToggle} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: t.icon, cursor: 'pointer' }}>
          <Menu style={{ width: '20px', height: '20px' }} />
        </button>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: '480px' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: t.icon, pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${t.searchBorder}`, backgroundColor: t.searchBg, paddingLeft: '36px', paddingRight: '48px', fontSize: '14px', color: t.searchText, outline: 'none' }}
              onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; e.target.style.backgroundColor = t.searchFocusBg; }}
              onBlur={(e) => { e.target.style.borderColor = t.searchBorder; e.target.style.boxShadow = 'none'; e.target.style.backgroundColor = t.searchBg; }}
            />
            <kbd style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', display: 'inline-flex', alignItems: 'center', gap: '2px', borderRadius: '4px', border: `1px solid ${t.kbdBorder}`, backgroundColor: t.kbdBg, padding: '2px 6px', fontSize: '10px', fontWeight: 500, color: t.kbdText }}>⌘K</kbd>
          </div>
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <button
            onClick={onNewTask}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: 'none', backgroundColor: '#3b82f6', color: '#fff', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'background 0.15s' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <Plus style={{ width: '16px', height: '16px' }} />
            New Task
          </button>

          <button
            onClick={toggleTheme}
            style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: isDark ? '#fbbf24' : '#94a3b8', cursor: 'pointer' }}
          >
            {isDark ? <Sun style={{ width: '18px', height: '18px' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
          </button>

          <div style={{ position: 'relative' }} ref={ref}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}
            >
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: t.avatarBg, color: t.avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <ChevronDown style={{ width: '14px', height: '14px', color: t.icon }} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.12 }}
                  style={{ position: 'absolute', right: 0, marginTop: '4px', width: '192px', backgroundColor: t.dropBg, borderRadius: '8px', border: `1px solid ${t.dropBorder}`, boxShadow: '0 10px 15px rgba(0,0,0,0.15)', overflow: 'hidden' }}
                >
                  <div style={{ padding: '12px', borderBottom: `1px solid ${t.dropDivider}` }}>
                    <p style={{ fontSize: '14px', fontWeight: 500, color: t.dropName }}>{user?.username}</p>
                    <p style={{ fontSize: '12px', color: t.dropEmail, marginTop: '2px' }}>{user?.email}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}
