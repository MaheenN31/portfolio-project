import API from './Api';

export const getAllEducation = () => API.get('/api/education');
export const getEducation = (id) => API.get(`/api/education/${id}`);
export const createEducation = (data) => API.post('/api/education', data);
export const updateEducation = (id, data) => API.put(`/api/education/${id}`, data);
export const deleteEducation = (id) => API.delete(`/api/education/${id}`);
