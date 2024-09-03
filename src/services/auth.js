import { jwtDecode } from "jwt-decode";
import http from './http';

const apiUrl = `${import.meta.env.VITE_API_URL}/auth`;
const tokenKey = "token";

setTimeout(() => {
  http.setJWT(getJWT());
}, 1000);

export function getJWT() {
  return localStorage.getItem(tokenKey);
}

export async function register(data) {
  const { username, email, password } = data;
  const { data: { data: user } } = await http.post(`${apiUrl}/register`, { username, email, password });
  localStorage.setItem(tokenKey, user.token);
  return user

}

export async function login(data) {
  const { username, password } = data;
  const { data: { data: user } } = await http.post(`${apiUrl}/login`, { username, password });
  localStorage.setItem(tokenKey, user.token);
  return user
}

export function getCurrentUser() {
  const token = getJWT();

  return token ? jwtDecode(token) : null;
}

export default {
  register,
  login,
  getCurrentUser,
  getJWT,
};
