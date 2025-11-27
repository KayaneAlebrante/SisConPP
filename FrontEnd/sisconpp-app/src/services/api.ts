import axios from 'axios';
import { RT } from '../types/RT';
import { CTG } from '../types/CTG';
import { Usuario } from '../types/Usuario';
import { Candidato } from '../types/Candidato';
import { Concurso } from '../types/Concurso';
import { Comissao } from '../types/Comissao';
import { PreferenciaSorteio, Quesito, CriarSorteioPayload } from '../types/SorteioDanca';

// ---- CONFIGURAÇÃO DO AXIOS ----
export const api = axios.create({
  baseURL: "http://localhost:3005",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ---- AUTENTICAÇÃO ----
export interface LoginRequest {
  login: string;
  senha: string;
}

export interface LoginResponse {
  token: string;
  usuario: {
    idUsuario: number;
    nomeCompleto: string;
    login: string;
    funcao?: string;
  };
  message?: string;
}

export const loginUsuario = async (dados: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", dados);
  return response.data;
};

// ---- RT ----
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
  const response = await api.delete(`/rt/${id}`);
  return response.data ?? true;
};

// ---- CTG ----
export const cadastrarCTG = async (novoCTG: CTG) => {
  return await api.post('/ctg', novoCTG);
};

export const listarCTGs = async () => {
  const response = await api.get("/ctg");
  return response.data;
};

export const atualizarCTG = (ctg: CTG) => {
  return api.put(`/ctg/${ctg.idCTG}`, ctg);
};

export const deleteCTG = async (id: number) => {
  const response = await api.delete(`/ctg/${id}`);
  return response.data ?? true;
};

//---- Usuarios ----
export const cadastrarUsuario = async (criarUsuario: Usuario) => {
  return await api.post('/usuario', criarUsuario);
};

export const listarUsuarios = async () => {
  const response = await api.get("/usuario");
  return response.data;
};

export const atualizarUsuario = (usuario: Usuario) => {
  return api.put(`/usuario/${usuario.idUsuario}`, usuario);
};

export const deleteUsuario = async (id: number) => {
  return await api.delete(`/usuario/${id}`);
};

export const listarUsuriosAvaliadores = async (): Promise<Usuario[]> => {
  const response = await api.get<Usuario[]>("/usuario/usuarios/avaliadores");
  return response.data;
};

export const listarUsuriosAuxiliares = async (): Promise<Usuario[]> => {
  const response = await api.get<Usuario[]>("/usuario/usuarios/auxiliares");
  return response.data;
};

//---- Categorias ----
export const listarCategorias = async () => {
  const response = await api.get("/categoria");
  return response.data;
};

//---- Candidatos ----
export const cadastrarCandidato = async (criarCandidato: Candidato) => {
  return await api.post("/candidato", criarCandidato);
};

export const atualizarCandidato = (candidato: Candidato) => {
  return api.put(`/candidato/${candidato.idCandidato}`, candidato);
};

export const listarCandidatos = async () => {
  const response = await api.get("/candidato");
  return response.data;
};

export const deletarCandidato = async (id: number) => {
  return await api.delete(`/candidato/${id}`);
};

//---- Concursos ----
export const cadastrarConcurso = async (cadastrarConcurso: Concurso) => {
  return await api.post("/concurso", cadastrarConcurso);
};

export const atualizarConcurso = (concurso: Concurso) => {
  return api.put(`/concurso/${concurso.idConcurso}`, concurso);
};

export const deletarConcurso = async (id: number) => {
  return await api.delete(`/concurso/${id}`);
};

export const listarConcurso = async () => {
  const response = await api.get("/concurso");
  return response.data;
};

//---- Comissão ----
export const criarComissao = async (criarComissao: Comissao) => {
  return await api.post("/comissao", criarComissao);
};

export const listarComissoes = async () => {
  const response = await api.get<Comissao[]>("/comissao");
  return response.data;
};

export const atualizarComissao = (comissao: Comissao) => {
  return api.put(`/comissao/${comissao.idComissao}`, comissao);
};

export const deletarComissao = async (id: number) => {
  const response = await api.delete(`/comissao/${id}`);
  return response.data ?? true;
};

export const adicionarAvaliadorComissao = async (usuarioId: number, comissaoId: number) => {
  return await api.post("/comissao/avaliador", { usuarioId, comissaoId });
};

export const adicionarAuxiliarComissao = async (usuarioId: number, comissaoId: number) => {
  return await api.post("/comissao/auxiliar", { usuarioId, comissaoId });
};

export const listarUsuariosComissao = async () => {
  const response = await api.get("/comissao/usuarios");
  return response.data;
};

export const deletarUsuarioComissao = async (idUsuario: number, idComissao: number) => {
  return await api.delete(`/comissao/usuario/${idUsuario}/${idComissao}`);
};

//---- Sorteio das Danças ----
export const getDancasTradicionais = async (): Promise<Quesito[]> => {
  const response = await api.get<Quesito[]>("/quesito/dancasTradicionais");
  return response.data;
};

export const getDancasSalao = async (): Promise<Quesito[]> => {
  const response = await api.get<Quesito[]>("/quesito/dancasSalao");
  return response.data;
};

export const criarPreferencia = async (criarPreferencia: PreferenciaSorteio) => {
  return await api.post("/preferenciaSorteioDanca", criarPreferencia);
};

export const realizarSorteio = async (realizarSorteio: CriarSorteioPayload) => {
  return await api.post("/sorteioDanca", realizarSorteio);
}