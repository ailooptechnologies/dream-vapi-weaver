import api from './api';

export const aiAgentService = {
  getAgents: async () => {
    const response = await api.get('/ai-agents');
    return response.data;
  },

  createAgent: async (agentData: any) => {
    const response = await api.post('/ai-agents', agentData);
    return response.data;
  },

  updateAgent: async (id: string, agentData: any) => {
    const response = await api.put(`/ai-agents/${id}`, agentData);
    return response.data;
  },

  deleteAgent: async (id: string) => {
    const response = await api.delete(`/ai-agents/${id}`);
    return response.data;
  },
};