import API from './Api';

export const getAllExperience = () => API.get('/api/experience');
export const getExperience = (id) => API.get(`/api/experience/${id}`);
export const createExperience = (data) => API.post('/api/experience', data);
export const updateExperience = (id, data) => API.put(`/api/experience/${id}`, data);
export const deleteExperience = (id) => API.delete(`/api/experience/${id}`);
