import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { LogOut, ChevronRight, CheckSquare, X, LayoutDashboard, ListTodo, Clock, CheckCircle2, Flag, BarChart3 } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'All Tasks', icon: BarChart3, id: 'all' },
  { name: 'Todo', icon: ListTodo, id: 'TODO' },
  { name: 'In Progress', icon: Clock, id: 'IN_PROGRESS' },
  { name: 'Done', icon: CheckCircle2, id: 'DONE' },
];

export default function Sidebar({ isOpen, onClose, activeFilter, onFilterChange, statistics }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const onNav = (id) => {
    onFilterChange(id);
    onClose();
  };

  const rate = statistics?.total ? Math.round((statistics.done / statistics.total) * 100) : 0;

  const getCount = (id) => {
    if (id === 'dashboard') return null;
    if (id === 'all') return statistics?.total;
    if (id === 'TODO') return statistics?.todo;
    if (id === 'IN_PROGRESS') return statistics?.in_progress;
    if (id === 'DONE') return statistics?.done;
    return null;
  };

  // Theme tokens
  const t = {
    bg: isDark ? '#0f172a' : '#ffffff',
    borderColor: isDark ? '#1e293b' : '#e2e8f0',
    borderLight: isDark ? '#1e293b' : '#f1f5f9',
    logoText: isDark ? '#f1f5f9' : '#0f172a',
    sectionLabel: isDark ? '#64748b' : '#94a3b8',
    navText: isDark ? '#cbd5e1' : '#475569',
    navActiveText: isDark ? '#60a5fa' : '#2563eb',
    navActiveBg: isDark ? 'rgba(59,130,246,0.15)' : '#eff6ff',
    navHoverBg: isDark ? '#1e293b' : '#f8fafc',
    navIcon: isDark ? '#64748b' : '#94a3b8',
    navActiveIcon: isDark ? '#60a5fa' : '#3b82f6',
    nameText: isDark ? '#f1f5f9' : '#0f172a',
    emailText: isDark ? '#94a3b8' : '#64748b',
    avatarBg: isDark ? '#1e3a5f' : '#dbeafe',
    avatarText: isDark ? '#60a5fa' : '#2563eb',
    logoutText: isDark ? '#94a3b8' : '#475569',
    logoutHoverBg: isDark ? '#1e293b' : '#f8fafc',
  };

  const content = (
    <nav className="flex flex-col h-full" style={{ backgroundColor: t.bg }}>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 shrink-0" style={{ height: '56px', borderBottom: `1px solid ${t.borderLight}` }}>
        <div className="h-8 w-8 rounded-lg flex items-center justify-center text-white" style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
          <CheckSquare className="h-4 w-4" />
        </div>
        <span style={{ fontSize: '15px', fontWeight: 700, color: t.logoText, letterSpacing: '-0.01em' }}>Task Manager</span>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto" style={{ padding: '24px 16px 16px' }}>
        <p style={{ padding: '0 12px', marginBottom: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.sectionLabel }}>Menu</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {navItems.map((item) => {
            const active = activeFilter === item.id;
            const count = getCount(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onNav(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  border: 'none',
                  transition: 'all 0.15s',
                  backgroundColor: active ? t.navActiveBg : 'transparent',
                  color: active ? t.navActiveText : t.navText,
                }}
                onMouseEnter={(e) => { if (!active) e.target.style.backgroundColor = t.navHoverBg; }}
                onMouseLeave={(e) => { if (!active) e.target.style.backgroundColor = 'transparent'; }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <item.icon style={{ width: '18px', height: '18px', color: active ? t.navActiveIcon : t.navIcon, flexShrink: 0 }} />
                  {item.name}
                </span>
                {count != null && (
                  <span style={{ fontSize: '12px', fontWeight: 600, color: active ? t.navActiveIcon : t.navIcon }}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Overview */}
        <div style={{ marginTop: '32px' }}>
          <p style={{ padding: '0 12px', marginBottom: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: t.sectionLabel }}>Overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, color: t.navText }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Flag style={{ width: '18px', height: '18px', color: t.navIcon, flexShrink: 0 }} />
                High priority
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#ef4444' }}>{statistics?.high_priority || 0}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, color: t.navText }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle2 style={{ width: '18px', height: '18px', color: t.navIcon, flexShrink: 0 }} />
                Completed
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{rate}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom user section */}
      <div style={{ borderTop: `1px solid ${t.borderLight}`, padding: '12px 16px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', borderRadius: '8px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: t.avatarBg, color: t.avatarText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, flexShrink: 0 }}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: '14px', fontWeight: 600, color: t.nameText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.username}</p>
            <p style={{ fontSize: '12px', color: t.emailText, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.email}</p>
          </div>
          <ChevronRight style={{ width: '16px', height: '16px', color: t.navIcon, flexShrink: 0 }} />
        </div>

        <button
          onClick={logout}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '8px 12px', marginTop: '4px', borderRadius: '8px', fontSize: '14px', fontWeight: 500, color: t.logoutText, border: 'none', backgroundColor: 'transparent', cursor: 'pointer', transition: 'background 0.15s' }}
          onMouseEnter={(e) => e.target.style.backgroundColor = t.logoutHoverBg}
          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
        >
          <LogOut style={{ width: '18px', height: '18px', color: t.navIcon, flexShrink: 0 }} />
          Logout
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:flex lg:flex-col lg:shrink-0" style={{ width: '240px', borderRight: `1px solid ${t.borderColor}` }}>
        {content}
      </aside>

      {/* Mobile */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 lg:hidden" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} onClick={onClose} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
              style={{ width: '280px', borderRight: `1px solid ${t.borderColor}`, boxShadow: '0 20px 25px rgba(0,0,0,0.15)' }}
            >
              <div style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10 }}>
                <button onClick={onClose} style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: t.navIcon, cursor: 'pointer' }}><X style={{ width: '20px', height: '20px' }} /></button>
              </div>
              {content}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
