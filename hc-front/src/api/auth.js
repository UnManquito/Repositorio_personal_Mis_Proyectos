import axios from './axios.js';

export const registerRequest = async (user) => axios.post('/registro', user);

export const loginRequest = async (user) => axios.post('/login', user);

export const verifyTokenRequest = async () => axios.get('/verify');

export const logoutRequest = async () => axios.post('/logout');

export const updateUserRequest = async (id, data) => axios.put(`/actualizar/${id}`, data);

export const deleteUserRequest = async (id) => axios.delete(`/eliminar/${id}`);

export const desactivarUsuarioRequest = async (id) => axios.put(`/desactivar/${id}`);

export const activarUsuarioRequest = async (id) => axios.put(`/activar/${id}`);

