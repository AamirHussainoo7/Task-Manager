import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Plus, MoreVertical, ClipboardCheck } from 'lucide-react';
import TaskCard from './TaskCard';
import { STAGE_LABELS } from '../../utils/constants';
import { useTheme } from '../../context/ThemeContext';

const stageTheme = {
  TODO: { dotColor: '#3b82f6' },
  IN_PROGRESS: { dotColor: '#f59e0b' },
  DONE: { dotColor: '#10b981' },
};

export default function TaskColumn({ stage, tasks, onEdit, onDelete, onAddTask }) {
  const theme = stageTheme[stage];
  const { isDark } = useTheme();

  const t = {
    headingColor: isDark ? '#e2e8f0' : '#1e293b',
    countColor: isDark ? '#64748b' : '#94a3b8',
    moreColor: isDark ? '#64748b' : '#94a3b8',
    zoneBg: isDark ? '#0f172a' : '#f8fafc',
    zoneBorder: isDark ? '#1e293b' : '#e2e8f0',
    zoneDragBg: isDark ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.04)',
    emptyIconBg: isDark ? '#1e293b' : '#f1f5f9',
    emptyTitle: isDark ? '#e2e8f0' : '#334155',
    emptyText: isDark ? '#64748b' : '#94a3b8',
    emptyBtnBg: isDark ? '#1e293b' : '#fff',
    emptyBtnBorder: isDark ? '#334155' : '#e2e8f0',
    emptyBtnText: isDark ? '#cbd5e1' : '#475569',
    emptyBtnHoverBg: isDark ? '#334155' : '#f8fafc',
    emptyBtnHoverBorder: isDark ? '#475569' : '#cbd5e1',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minWidth: '280px', flex: 1 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 4px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: theme.dotColor }} />
          <h2 style={{ fontSize: '14px', fontWeight: 600, color: t.headingColor }}>{STAGE_LABELS[stage]}</h2>
          <span style={{ fontSize: '12px', fontWeight: 500, color: t.countColor }}>{tasks.length}</span>
        </div>
        <button
          onClick={() => onAddTask(stage)}
          style={{ padding: '4px', borderRadius: '6px', border: 'none', backgroundColor: 'transparent', color: t.moreColor, cursor: 'pointer' }}
        >
          <MoreVertical style={{ width: '16px', height: '16px' }} />
        </button>
      </div>

      {/* Drop zone */}
      <Droppable droppableId={stage}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              flex: 1,
              borderRadius: '12px',
              padding: '10px',
              minHeight: '320px',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              border: snapshot.isDraggingOver ? '2px dashed rgba(59,130,246,0.3)' : `1px solid ${t.zoneBorder}`,
              backgroundColor: snapshot.isDraggingOver ? t.zoneDragBg : t.zoneBg,
            }}
          >
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '260px', textAlign: 'center', padding: '0 16px' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '16px', backgroundColor: t.emptyIconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <ClipboardCheck style={{ width: '32px', height: '32px', color: '#34d399' }} strokeWidth={1.5} />
                </div>
                <p style={{ fontSize: '14px', fontWeight: 600, color: t.emptyTitle, marginBottom: '4px' }}>No tasks yet</p>
                <p style={{ fontSize: '12px', color: t.emptyText, marginBottom: '16px' }}>Create your first task to get started.</p>
                <button
                  onClick={() => onAddTask(stage)}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: `1px solid ${t.emptyBtnBorder}`, backgroundColor: t.emptyBtnBg, fontSize: '14px', fontWeight: 500, color: t.emptyBtnText, cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={(e) => { e.target.style.borderColor = t.emptyBtnHoverBorder; e.target.style.backgroundColor = t.emptyBtnHoverBg; }}
                  onMouseLeave={(e) => { e.target.style.borderColor = t.emptyBtnBorder; e.target.style.backgroundColor = t.emptyBtnBg; }}
                >
                  <Plus style={{ width: '16px', height: '16px' }} />
                  Create Task
                </button>
              </div>
            )}
            {tasks.map((task, i) => (
              <Draggable key={task.id} draggableId={String(task.id)} index={i}>
                {(dp, ds) => <TaskCard task={task} onEdit={onEdit} onDelete={onDelete} provided={dp} isDragging={ds.isDragging} />}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
