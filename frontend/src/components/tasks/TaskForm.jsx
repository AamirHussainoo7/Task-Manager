import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Pencil, FileText, Flag, Zap, CalendarDays, ChevronDown, ClipboardList } from 'lucide-react';
import Modal from '../ui/Modal';
import { useTheme } from '../../context/ThemeContext';
import { STAGE_LABELS, PRIORITY_LABELS } from '../../utils/constants';

const stageOpts = Object.entries(STAGE_LABELS);
const priorityOpts = Object.entries(PRIORITY_LABELS);

const stageDotColors = { TODO: '#22c55e', IN_PROGRESS: '#f59e0b', DONE: '#3b82f6' };
const priorityDotColors = { LOW: '#94a3b8', MEDIUM: '#f59e0b', HIGH: '#f97316', URGENT: '#ef4444' };

/* ─── Custom Select dropdown with colored dots ─── */
function CustomSelect({ id, value, onChange, options, dotColors, isDark }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectedLabel = options.find(([v]) => v === value)?.[1] || value;
  const dotColor = dotColors?.[value];

  const t = {
    bg: isDark ? '#1e293b' : '#f1f5f9',
    border: isDark ? '#334155' : '#e2e8f0',
    text: isDark ? '#e2e8f0' : '#1e293b',
    dropBg: isDark ? '#1e293b' : '#ffffff',
    dropBorder: isDark ? '#334155' : '#e2e8f0',
    dropItemHover: isDark ? '#334155' : '#f1f5f9',
    chevron: isDark ? '#64748b' : '#94a3b8',
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px',
          width: '100%', height: '44px', borderRadius: '10px',
          border: `1px solid ${t.border}`, backgroundColor: t.bg,
          padding: '0 14px', fontSize: '14px', color: t.text,
          cursor: 'pointer', transition: 'all 0.15s',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {dotColor && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dotColor, flexShrink: 0 }} />}
          {selectedLabel}
        </span>
        <ChevronDown style={{ width: '16px', height: '16px', color: t.chevron, transition: 'transform 0.15s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            style={{
              position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 20,
              backgroundColor: t.dropBg, border: `1px solid ${t.dropBorder}`,
              borderRadius: '10px', overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
            }}
          >
            {options.map(([v, l]) => (
              <button
                key={v}
                type="button"
                onClick={() => { onChange(v); setOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  width: '100%', padding: '10px 14px', border: 'none',
                  backgroundColor: v === value ? t.dropItemHover : 'transparent',
                  color: t.text, fontSize: '14px', cursor: 'pointer',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.dropItemHover}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = v === value ? t.dropItemHover : 'transparent'}
              >
                {dotColors?.[v] && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: dotColors[v], flexShrink: 0 }} />}
                {l}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Main TaskForm Component ─── */
export default function TaskForm({ isOpen, onClose, onSubmit, task, defaultStage }) {
  const isEditing = !!task;
  const { isDark } = useTheme();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ title: '', description: '', stage: 'TODO', priority: 'MEDIUM', due_date: '' });

  useEffect(() => {
    if (task) setForm({ title: task.title || '', description: task.description || '', stage: task.stage || 'TODO', priority: task.priority || 'MEDIUM', due_date: task.due_date || '' });
    else setForm({ title: '', description: '', stage: defaultStage || 'TODO', priority: 'MEDIUM', due_date: '' });
    setErrors({});
  }, [task, defaultStage, isOpen]);

  const validate = () => {
    const e = {};
    if (!form.title.trim()) e.title = 'Title is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit({ ...form, title: form.title.trim(), due_date: form.due_date || null }); onClose(); } catch {} finally { setLoading(false); }
  };

  const set = (f, v) => { setForm((p) => ({ ...p, [f]: v })); if (errors[f]) setErrors((p) => ({ ...p, [f]: undefined })); };

  /* Theme tokens */
  const t = {
    cardBg: isDark ? '#0f172a' : '#ffffff',
    cardBorder: isDark ? '#1e293b' : '#e2e8f0',
    headerIconBg: isDark ? '#1e3a5f' : '#dbeafe',
    headerIconColor: '#3b82f6',
    titleColor: isDark ? '#f1f5f9' : '#0f172a',
    subtitleColor: isDark ? '#64748b' : '#94a3b8',
    closeBtnColor: isDark ? '#64748b' : '#94a3b8',
    closeBtnHover: isDark ? '#1e293b' : '#f1f5f9',
    labelColor: isDark ? '#e2e8f0' : '#1e293b',
    labelIconColor: isDark ? '#60a5fa' : '#3b82f6',
    inputBg: isDark ? '#1e293b' : '#f1f5f9',
    inputBorder: isDark ? '#334155' : '#e2e8f0',
    inputText: isDark ? '#e2e8f0' : '#1e293b',
    inputPlaceholder: isDark ? '#475569' : '#94a3b8',
    dividerColor: isDark ? '#1e293b' : '#e2e8f0',
    cancelBg: isDark ? '#1e293b' : '#f1f5f9',
    cancelText: isDark ? '#cbd5e1' : '#475569',
    cancelBorder: isDark ? '#334155' : '#e2e8f0',
    cancelHoverBg: isDark ? '#334155' : '#e2e8f0',
  };

  const inputStyle = {
    width: '100%', height: '44px', borderRadius: '10px',
    border: `1px solid ${t.inputBorder}`, backgroundColor: t.inputBg,
    padding: '0 14px', fontSize: '14px', color: t.inputText,
    outline: 'none', transition: 'all 0.15s',
  };

  const textareaStyle = {
    ...inputStyle,
    height: 'auto', minHeight: '100px', padding: '12px 14px',
    resize: 'vertical', lineHeight: 1.6,
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div style={{
        backgroundColor: t.cardBg, borderRadius: '16px',
        border: `1px solid ${t.cardBorder}`,
        boxShadow: '0 25px 50px rgba(0,0,0,0.25)',
        overflow: 'hidden',
      }}>
        {/* ── Header with icon ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', padding: '28px 28px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '14px',
              backgroundColor: t.headerIconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <ClipboardList style={{ width: '24px', height: '24px', color: t.headerIconColor }} />
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 700, color: t.titleColor, letterSpacing: '-0.01em' }}>
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
              <p style={{ fontSize: '14px', color: t.subtitleColor, marginTop: '2px' }}>
                {isEditing ? 'Update the details of your task' : 'Add details and organize your work'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px', borderRadius: '10px', border: 'none',
              backgroundColor: 'transparent', color: t.closeBtnColor,
              cursor: 'pointer', transition: 'all 0.15s', marginTop: '2px',
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.closeBtnHover}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            <X style={{ width: '20px', height: '20px' }} />
          </button>
        </div>

        {/* ── Form fields ── */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 28px 28px' }}>
          {/* Title */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="task-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: t.labelColor, marginBottom: '10px' }}>
              <Pencil style={{ width: '16px', height: '16px', color: t.labelIconColor }} />
              Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              id="task-title" type="text"
              placeholder="What needs to be done?"
              value={form.title}
              onChange={(e) => set('title', e.target.value)}
              autoFocus
              style={inputStyle}
              onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = t.inputBorder; e.target.style.boxShadow = 'none'; }}
            />
            {errors.title && <p style={{ marginTop: '6px', fontSize: '12px', color: '#ef4444' }}>{errors.title}</p>}
          </div>

          {/* Description */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="task-desc" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: t.labelColor, marginBottom: '10px' }}>
              <FileText style={{ width: '16px', height: '16px', color: t.labelIconColor }} />
              Description
            </label>
            <textarea
              id="task-desc" rows={4}
              placeholder="Add some details..."
              value={form.description}
              onChange={(e) => set('description', e.target.value)}
              style={textareaStyle}
              onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'; }}
              onBlur={(e) => { e.target.style.borderColor = t.inputBorder; e.target.style.boxShadow = 'none'; }}
            />
          </div>

          {/* Stage & Priority */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label htmlFor="task-stage" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: t.labelColor, marginBottom: '10px' }}>
                <Flag style={{ width: '16px', height: '16px', color: t.labelIconColor }} />
                Stage
              </label>
              <CustomSelect id="task-stage" value={form.stage} onChange={(v) => set('stage', v)} options={stageOpts} dotColors={stageDotColors} isDark={isDark} />
            </div>
            <div>
              <label htmlFor="task-priority" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: t.labelColor, marginBottom: '10px' }}>
                <Zap style={{ width: '16px', height: '16px', color: t.labelIconColor }} />
                Priority
              </label>
              <CustomSelect id="task-priority" value={form.priority} onChange={(v) => set('priority', v)} options={priorityOpts} dotColors={priorityDotColors} isDark={isDark} />
            </div>
          </div>

          {/* Due Date */}
          <div style={{ marginBottom: '24px' }}>
            <label htmlFor="task-due" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', fontWeight: 600, color: t.labelColor, marginBottom: '10px' }}>
              <CalendarDays style={{ width: '16px', height: '16px', color: t.labelIconColor }} />
              Due Date
            </label>
            <div style={{ position: 'relative' }}>
              <CalendarDays style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: t.inputPlaceholder, pointerEvents: 'none' }} />
              <input
                id="task-due" type="date"
                value={form.due_date}
                onChange={(e) => set('due_date', e.target.value)}
                style={{ ...inputStyle, paddingLeft: '40px' }}
                onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.15)'; }}
                onBlur={(e) => { e.target.style.borderColor = t.inputBorder; e.target.style.boxShadow = 'none'; }}
              />
            </div>
          </div>

          {/* ── Actions ── */}
          <div style={{ borderTop: `1px solid ${t.dividerColor}`, paddingTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button
              type="button" onClick={onClose}
              style={{
                padding: '10px 24px', borderRadius: '10px',
                border: `1px solid ${t.cancelBorder}`, backgroundColor: t.cancelBg,
                color: t.cancelText, fontSize: '14px', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = t.cancelHoverBg}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = t.cancelBg}
            >
              Cancel
            </button>
            <button
              type="submit" disabled={loading}
              style={{
                padding: '10px 24px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: '#fff', fontSize: '14px', fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1, transition: 'all 0.15s',
                boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
              }}
              onMouseEnter={(e) => { if (!loading) e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,99,235,0.45)'; }}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(37,99,235,0.3)'}
            >
              {loading ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
