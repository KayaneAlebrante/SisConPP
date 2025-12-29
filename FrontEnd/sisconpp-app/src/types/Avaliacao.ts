export interface Avaliacao {
  idAvaliacao: number;
  dataAvaliacao: Date;
  notaFinal: number;
  avaliadorId: number;
  candidatoId: number;
  provaPraticaId?: number;
  provaTeoricaId?: number;
  blocoProvaId?: number;
  fichaCandidatoFicha: number;
  quesitosAvaliados: AvaliacaoQuesito[]
}

export interface AvaliacaoQuesito {
  idAvaliacaoQuesito: number;
  notaQuesito: number;
  comentario: string;
  subQuesitosAvaliados: AvaliacaoSubQuesito[];
  avaliacaoId: number;
  quesitoId: number;
}

export interface AvaliacaoSubQuesito {
  idAvaliacaoSubQuesito: number;
  notaSubQuesito: number;
  subQuesitoId: number;
  avaliacaoQuesitoId?: number;
}

export interface CriarAvaliacaoPayload {
  avaliadorId: number
  candidatoId: number
  provasSelecionadas: number[]

  subQuesitos: {
    subQuesitoId: number
    nota: number
  }[]
}

export interface ProvaAccordionDTO {
  idProvaPratica: number;
  nomeProva: string;
  notaMaxima: number;
  blocosProvas: BlocoProvaDTO[];
}

export interface BlocoProvaDTO {
  idBloco: number;
  nomeBloco: string;
  notaMaximaBloco: number;
  quesitos: QuesitoDTO[];
}

export interface QuesitoDTO {
  idQuesito: number;
  nomeQuesito: string;
  notaMaximaQuesito: number;
  opcional: boolean;
  subQuesitos: SubQuesitoDTO[];
}

export interface SubQuesitoDTO {
  idSubequestios: number;
  nomeSubquesito: string;
  notaSubequesito: number;
}
