import axios from 'axios';
import { RT } from '../types/RT';

const api = axios.create({
  baseURL: 'http://localhost:3002',
});

export const cadastrarRT = async (novaRT: RT) => {
  return await api.post('/rt', novaRT);
};

export const listarRTs = async () => {
  const response = await api.get("/rt");
  return response.data;
};

export const deleteRT = async (id: number) => {
  await api.delete(`/rt/${id}`);
};