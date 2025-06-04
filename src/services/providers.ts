import api from './api';

export const providerService = {
  getProviders: async () => {
    const response = await api.get('/providers');
    return response.data;
  },

  createProvider: async (providerData: any) => {
    const response = await api.post('/providers', providerData);
    return response.data;
  },

  updateProvider: async (id: string, providerData: any) => {
    const response = await api.put(`/providers/${id}`, providerData);
    return response.data;
  },

  deleteProvider: async (id: string) => {
    const response = await api.delete(`/providers/${id}`);
    return response.data;
  },
};