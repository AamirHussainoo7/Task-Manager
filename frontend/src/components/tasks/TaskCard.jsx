import { Pencil, Trash2, Calendar, GripVertical } from 'lucide-react';
import { formatDate, formatRelativeDate, getDueDateStatus } from '../../utils/helpers';
import { PRIORITY_LABELS } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

const priorityStyles = {
  LOW: { bg: '#f1f5f9', darkBg: '#1e293b', color: '#475569', darkColor: '#94a3b8' },
  MEDIUM: { bg: '#eff6ff', darkBg: '#1e3a5f', color: '#1d4ed8', darkColor: '#60a5fa' },
  HIGH: { bg: '#fffbeb', darkBg: '#422006', color: '#b45309', darkColor: '#fbbf24' },
  URGENT: { bg: '#fef2f2', darkBg: '#450a0a', color: '#b91c1c', darkColor: '#f87171' },
};

const dueColors = {
  overdue: '#dc2626',
  today: '#d97706',
  tomorrow: '#2563eb',
  upcoming: '#94a3b8',
};

export default function TaskCard({ task, onEdit, onDelete, provided, isDragging }) {
  const { isDark } = useTheme();
  const dueStatus = getDueDateStatus(task.due_date);
  const ps = priorityStyles[task.priority] || priorityStyles.LOW;
  const priority = { bg: isDark ? ps.darkBg : ps.bg, color: isDark ? ps.darkColor : ps.color };

  const t = {
    cardBg: isDark ? '#1e293b' : '#fff',
    cardBorder: isDark ? '#334155' : 'rgba(226,232,240,0.8)',
    dragBorder: isDark ? '#60a5fa' : '#93c5fd',
    titleColor: isDark ? '#f1f5f9' : '#0f172a',
    descColor: isDark ? '#94a3b8' : '#64748b',
    footerBorder: isDark ? '#334155' : '#f1f5f9',
    dateColor: isDark ? '#64748b' : '#94a3b8',
    actionColor: isDark ? '#64748b' : '#94a3b8',
    gripColor: isDark ? '#475569' : '#cbd5e1',
  };

  return (
    <div
      ref={provided?.innerRef}
      {...(provided?.draggableProps || {})}
      {...(provided?.dragHandleProps || {})}
      className="group"
      style={{
        backgroundColor: t.cardBg,
        border: isDragging ? `1px solid ${t.dragBorder}` : `1px solid ${t.cardBorder}`,
        borderRadius: '12px',
        padding: '16px',
        cursor: 'grab',
        transition: 'box-shadow 0.15s, border-color 0.15s',
        boxShadow: isDragging ? '0 20px 25px rgba(0,0,0,0.15)' : '0 1px 2px rgba(0,0,0,0.05)',
        transform: isDragging ? 'rotate(1deg) scale(1.02)' : undefined,
        ...(provided?.draggableProps?.style || {}),
      }}
    >
      {/* Top: priority + actions */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <GripVertical className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ width: '14px', height: '14px', color: t.gripColor }} />
          <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', padding: '2px 8px', borderRadius: '6px', backgroundColor: priority.bg, color: priority.color }}>
            {PRIORITY_LABELS[task.priority]}
          </span>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <button onClick={(e) => { e.stopPropagation(); onEdit(task); }} style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: t.actionColor, cursor: 'pointer' }} title="Edit">
            <Pencil style={{ width: '14px', height: '14px' }} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(task.id); }} style={{ padding: '6px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: t.actionColor, cursor: 'pointer' }} title="Delete">
            <Trash2 style={{ width: '14px', height: '14px' }} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h3 style={{ fontSize: '14px', fontWeight: 600, color: t.titleColor, marginBottom: '6px', lineHeight: 1.4 }}>{task.title}</h3>

      {/* Description */}
      {task.description && (
        <p style={{ fontSize: '13px', color: t.descColor, marginBottom: '14px', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{task.description}</p>
      )}

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', paddingTop: '12px', borderTop: `1px solid ${t.footerBorder}` }}>
        <span style={{ color: t.dateColor }}>{formatRelativeDate(task.created_at)}</span>
        {task.due_date && (
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500, color: dueColors[dueStatus] || t.dateColor }}>
            <Calendar style={{ width: '12px', height: '12px' }} />
            {formatDate(task.due_date)}
          </span>
        )}
      </div>
    </div>
  );
}
