import API from './Api';

export const getAllProjects = () => API.get('/api/projects');
export const getProject = (id) => API.get(`/api/projects/${id}`);
export const createProject = (data) => API.post('/api/projects', data);
export const updateProject = (id, data) => API.put(`/api/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/api/projects/${id}`);
