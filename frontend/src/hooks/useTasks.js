import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { STAGE_ORDER } from '../utils/constants';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getTasks(params);
      // Handle paginated and non-paginated responses
      const taskList = data.results || data;
      setTasks(Array.isArray(taskList) ? taskList : []);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch tasks');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      const data = await taskService.getStatistics();
      setStatistics(data);
    } catch {
      // Silently fail for stats
    }
  }, []);

  const createTask = async (taskData) => {
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
      fetchStatistics();
      toast.success('Task created');
      return newTask;
    } catch (err) {
      const msg = err.response?.data?.title?.[0] || err.response?.data?.detail || 'Failed to create task';
      toast.error(msg);
      throw err;
    }
  };

  const updateTask = async (id, taskData) => {
    try {
      const updated = await taskService.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      fetchStatistics();
      toast.success('Task updated');
      return updated;
    } catch (err) {
      toast.error('Failed to update task');
      throw err;
    }
  };

  const deleteTask = async (id) => {
    // Optimistic delete
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await taskService.deleteTask(id);
      fetchStatistics();
      toast.success('Task deleted');
    } catch (err) {
      setTasks(previous);
      toast.error('Failed to delete task');
      throw err;
    }
  };

  const moveTask = async (taskId, newStage, newPosition = 0) => {
    // Optimistic update
    const previous = tasks;
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, stage: newStage, position: newPosition } : t))
    );
    try {
      await taskService.updateStage(taskId, newStage, newPosition);
      fetchStatistics();
    } catch (err) {
      setTasks(previous);
      toast.error('Failed to move task');
    }
  };

  const getTasksByStage = useCallback(
    (stage) => tasks.filter((t) => t.stage === stage).sort((a, b) => a.position - b.position),
    [tasks]
  );

  useEffect(() => {
    fetchTasks();
    fetchStatistics();
  }, [fetchTasks, fetchStatistics]);

  return {
    tasks,
    statistics,
    loading,
    error,
    fetchTasks,
    fetchStatistics,
    createTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStage,
  };
}
