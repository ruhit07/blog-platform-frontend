import http from './http';

const apiUrl = `${import.meta.env.VITE_API_URL}/posts`;

export function getBlogs() {
  return http.get(apiUrl);
};

export function getBlog(id) {
  return http.get(`${apiUrl}/${id}`)
};

export function saveBlog(data) {
  if (data.id) return http.put(`${apiUrl}/${data.id}`, data)
  return http.post(apiUrl, data);
};

export function deleteBlog(id) {
  return http.delete(`${apiUrl}/${id}`)
};