import API from './Api';

export const getAllSkills = () => API.get('/api/skills');
export const getSkill = (id) => API.get(`/api/skills/${id}`);
export const createSkill = (data) => API.post('/api/skills', data);
export const updateSkill = (id, data) => API.put(`/api/skills/${id}`, data);
export const deleteSkill = (id) => API.delete(`/api/skills/${id}`);
