import { useState, useCallback } from 'react';
import { Search, GripVertical, X } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';
import TaskBoard from '../components/tasks/TaskBoard';
import TaskForm from '../components/tasks/TaskForm';
import StatsCards from '../components/tasks/StatsCards';
import { useTasks } from '../hooks/useTasks';
import { useTheme } from '../context/ThemeContext';

export default function DashboardPage() {
  const { tasks, statistics, loading, createTask, updateTask, deleteTask, moveTask } = useTasks();
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [defaultStage, setDefaultStage] = useState('TODO');

  const handleAddTask = useCallback((stage = 'TODO') => { setEditingTask(null); setDefaultStage(stage); setFormOpen(true); }, []);
  const handleEditTask = useCallback((task) => { setEditingTask(task); setFormOpen(true); }, []);
  const handleFormSubmit = async (data) => { if (editingTask) await updateTask(editingTask.id, data); else await createTask(data); };
  const handleDeleteTask = useCallback(async (id) => { if (window.confirm('Delete this task?')) await deleteTask(id); }, [deleteTask]);

  const filteredTasks = tasks.filter((t) => {
    const matchStage = activeFilter === 'all' || activeFilter === 'dashboard' || t.stage === activeFilter;
    const matchSearch = !searchQuery || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStage && matchSearch;
  });

  // Theme tokens
  const t = {
    pageBg: isDark ? '#0a0f1a' : '#f8fafc',
    headingColor: isDark ? '#f1f5f9' : '#0f172a',
    subtextColor: isDark ? '#94a3b8' : '#64748b',
    searchBg: isDark ? '#1e293b' : '#fff',
    searchBorder: isDark ? '#334155' : '#e2e8f0',
    searchText: isDark ? '#e2e8f0' : '#1e293b',
    hintColor: isDark ? '#64748b' : '#94a3b8',
    clearBtnColor: isDark ? '#64748b' : '#94a3b8',
  };

  return (
    <div style={{ height: '100vh', display: 'flex', backgroundColor: t.pageBg }}>
      {/* Sidebar — full height on left */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} activeFilter={activeFilter} onFilterChange={setActiveFilter} statistics={statistics} />

      {/* Right: Navbar + Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Navbar
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          isMobileMenuOpen={sidebarOpen}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onNewTask={() => handleAddTask('TODO')}
        />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          <div style={{ padding: '28px 28px 28px 32px' }}>

            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: t.headingColor, letterSpacing: '-0.02em' }}>Dashboard</h1>
              <p style={{ fontSize: '14px', color: t.subtextColor, marginTop: '4px' }}>Manage and track your tasks across stages</p>
            </div>

            {/* Stats */}
            <StatsCards statistics={statistics} />

            {/* Search + hint */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '24px' }}>
              <div style={{ position: 'relative', width: '100%', maxWidth: '280px' }}>
                <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: t.hintColor, pointerEvents: 'none' }} />
                <input
                  id="search-tasks"
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ width: '100%', height: '36px', borderRadius: '8px', border: `1px solid ${t.searchBorder}`, backgroundColor: t.searchBg, paddingLeft: '36px', paddingRight: '32px', fontSize: '14px', color: t.searchText, outline: 'none' }}
                  onFocus={(e) => { e.target.style.borderColor = '#3b82f6'; e.target.style.boxShadow = '0 0 0 3px rgba(59,130,246,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = t.searchBorder; e.target.style.boxShadow = 'none'; }}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', color: t.clearBtnColor, cursor: 'pointer', padding: 0 }}>
                    <X style={{ width: '14px', height: '14px' }} />
                  </button>
                )}
              </div>
              <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: t.hintColor, flexShrink: 0 }}>
                <GripVertical style={{ width: '12px', height: '12px' }} />
                Drag tasks between columns to change their status
              </p>
            </div>

            {/* Board */}
            <TaskBoard
              tasks={filteredTasks}
              loading={loading}
              getTasksByStage={(stage) => filteredTasks.filter((t) => t.stage === stage).sort((a, b) => a.position - b.position)}
              onMoveTask={moveTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onAddTask={handleAddTask}
            />
          </div>
        </main>
      </div>

      <TaskForm
        isOpen={formOpen}
        onClose={() => { setFormOpen(false); setEditingTask(null); }}
        onSubmit={handleFormSubmit}
        task={editingTask}
        defaultStage={defaultStage}
      />
    </div>
  );
}
