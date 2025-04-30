import axios from 'axios';
import { RT } from '../types/RT';
import { CTG } from '../types/CTG';
import { Usuario } from '../types/Usuario';

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

export const cadastrarUsuario = async (criarUsuario: Usuario) =>{
  return await api.post('/usuario', criarUsuario);
};

export const atualizarUsuario = (usuario: Usuario) => {
  return api.put(`/usuario/${usuario.idUsuario}`, usuario);
};

export const deleteUsuario = async (id: number) => {
  await api.delete(`/usuario/${id}`);
};

export const listarUsuriosAvaliadores = async () => {
  const response = await api.get("/usuario/usuarios/avaliadores");
  return response.data;
}