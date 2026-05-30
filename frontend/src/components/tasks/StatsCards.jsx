import { motion } from 'framer-motion';
import { BarChart3, ListTodo, Clock, CheckCircle2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const cards = [
  { key: 'total', label: 'Total Tasks', icon: BarChart3, iconColor: '#3b82f6', iconBg: '#eff6ff', darkIconBg: '#1e3a5f' },
  { key: 'todo', label: 'Todo', icon: ListTodo, iconColor: '#64748b', iconBg: '#f1f5f9', darkIconBg: '#1e293b' },
  { key: 'in_progress', label: 'In Progress', icon: Clock, iconColor: '#f59e0b', iconBg: '#fffbeb', darkIconBg: '#422006' },
  { key: 'done', label: 'Done', icon: CheckCircle2, iconColor: '#10b981', iconBg: '#ecfdf5', darkIconBg: '#064e3b' },
];

export default function StatsCards({ statistics }) {
  const { isDark } = useTheme();

  if (!statistics) return null;

  const t = {
    cardBg: isDark ? '#1e293b' : '#fff',
    cardBorder: isDark ? '#334155' : '#e2e8f0',
    valueColor: isDark ? '#f1f5f9' : '#0f172a',
    labelColor: isDark ? '#94a3b8' : '#64748b',
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
      {cards.map((c, i) => (
        <motion.div
          key={c.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05, duration: 0.3 }}
          style={{ backgroundColor: t.cardBg, borderRadius: '12px', border: `1px solid ${t.cardBorder}`, padding: '16px' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: isDark ? c.darkIconBg : c.iconBg }}>
              <c.icon style={{ width: '20px', height: '20px', color: c.iconColor }} />
            </div>
            <div>
              <p style={{ fontSize: '24px', fontWeight: 700, color: t.valueColor, lineHeight: 1 }}>{statistics[c.key] ?? 0}</p>
              <p style={{ fontSize: '12px', color: t.labelColor, marginTop: '4px' }}>{c.label}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
