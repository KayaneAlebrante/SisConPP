import axios from 'axios';
import { RT } from '../types/RT';
import { CTG } from '../types/CTG';
import { Usuario } from '../types/Usuario';
import { Candidato } from '../types/Candidato';
import { Concurso } from '../types/Concurso';
import { Comissao } from '../types/Comissao';

export const api = axios.create({
  baseURL: 'http://localhost:3005',
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

export const cadastrarUsuario = async (criarUsuario: Usuario) => {
  return await api.post('/usuario', criarUsuario);
};

export const listarUsuarios = async () => {
  const response = await api.get("/usuario");
  return response.data;
}

export const atualizarUsuario = (usuario: Usuario) => {
  return api.put(`/usuario/${usuario.idUsuario}`, usuario);
};

export const deleteUsuario = async (id: number) => {
  return await api.delete(`/usuario/${id}`);
};

export const listarUsuriosAvaliadores = async () => {
  const response = await api.get("/usuario/usuarios/avaliadores");
  return response.data;
}

export const listarUsuriosAuxiliares = async () => {
  const response = await api.get("/usuario/usuarios/auxiliares");
  return response.data;
}

export const listarCategorias = async () => {
  const response = await api.get("/categoria");
  return response.data;
}

export const cadastrarCandidato = async (criarCandidato: Candidato) => {
  return await api.post("/candidato", criarCandidato);
}

export const atualizarCandidato = (candidato: Candidato) => {
  return api.put(`/candidato/${candidato.idCandidato}`, candidato);
};

export const listarCandidatos = async () => {
  const response = await api.get("/candidato");
  return response.data;
}

export const deletarCandidato = async (id: number) => {
  return await api.delete(`/candidato/${id}`);
}

export const cadastrarConcurso = async (cadastrarConcurso: Concurso) => {
  return await api.post("/concurso", cadastrarConcurso);
}

export const atualizarConcurso = (concurso: Concurso) => {
  return api.put(`/concurso/${concurso.idConcurso}`, concurso);
}

export const deletarConcurso = async (id: number) => {
  return await api.delete(`/concurso/${id}`);
}

export const listarConcurso = async () => {
  const response = await api.get("/concurso");
  return response.data;
}

export const criarComissao = async (criarComissao: Comissao) => {
  return await api.post("/comissao", criarComissao);
}

export const listarComissoes = async () => {
  const response = await api.get("/comissao");
  return response.data;
}

export const adicionarAvaliadorComissao = async (idUsuario: number, idComissao: number) => {
  return await api.post("/comissao/avaliador", { idUsuario, idComissao });
}

export const adicionarAuxiliarComissao = async (idUsuario: number, idComissao: number) => {
  return await api.post("/comissao/auxiliar", { idUsuario, idComissao });
}

export const listarUsuariosComissao = async () => {
  const response = await api.get("/comissao/usuarios");
  return response.data;
}

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
