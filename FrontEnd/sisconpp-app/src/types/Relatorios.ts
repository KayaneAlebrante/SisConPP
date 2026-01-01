export interface RelatorioGeralCandidatoDTO {
  candidatoId: number;
  nomeCandidato: string;
  categoria: string;
  concurso: string;
  notaProvaTeorica: number;
  notaProvasPraticas: number;
  notaFinal: number;
}

export interface RelatorioRankingDTO {
  candidatoId: number;
  nomeCandidato: string;
  concurso: string;
  categoria: string;
  notaFinal: number;
  classificacao: number;
}

export interface RankingCategoriaDTO {
  posicao: number;
  candidatoId: number;
  nomeCandidato: string;
  categoria: string;
  ctg: string;
  notaFinal: number;
}

