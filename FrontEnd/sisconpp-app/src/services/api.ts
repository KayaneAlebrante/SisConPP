import axios from 'axios';
import { RT } from '../types/RT';
import { CTG } from '../types/CTG';

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

export const atualizarRT = (rt: RT) => {
  return api.put(`/rt/${rt.idRT}`, rt);
};

export const deleteRT = async (id: number) => {
  await api.delete(`/rt/${id}`);
};

export const cadastrarCTG = async (novoCTG: CTG) => {
  return await api.post('/ctg', novoCTG);
}

export const listarCTGs = async () => {
  const response = await api.get("/ctg");
  return response.data;
};

export const atualizarCTG = (ctg: CTG) => {
  return api.put(`/ctg/${ctg.idCTG}`, ctg);
};

export const deleteCTG = async (id: number) => {
  await api.delete(`/ctg/${id}`);
};