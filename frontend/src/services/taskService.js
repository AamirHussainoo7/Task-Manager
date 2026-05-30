import api from './api';

export const taskService = {
  async getTasks(params = {}) {
    const { data } = await api.get('/api/tasks/', { params });
    return data;
  },

  async getTask(id) {
    const { data } = await api.get(`/api/tasks/${id}/`);
    return data;
  },

  async createTask(taskData) {
    const { data } = await api.post('/api/tasks/', taskData);
    return data;
  },

  async updateTask(id, taskData) {
    const { data } = await api.patch(`/api/tasks/${id}/`, taskData);
    return data;
  },

  async deleteTask(id) {
    await api.delete(`/api/tasks/${id}/`);
  },

  async updateStage(id, stage, position = 0) {
    const { data } = await api.patch(`/api/tasks/${id}/stage/`, { stage, position });
    return data;
  },

  async reorderTasks(tasks) {
    const { data } = await api.post('/api/tasks/reorder/', { tasks });
    return data;
  },

  async getStatistics() {
    const { data } = await api.get('/api/tasks/statistics/');
    return data;
  },
};
