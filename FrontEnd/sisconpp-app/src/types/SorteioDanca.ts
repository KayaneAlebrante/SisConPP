export enum DancaSalaoTradicional {
  DANCA_DE_SALAO = 'DANCA_DE_SALAO',
  DANCA_TRADICIONAL = 'DANCA_TRADICIONAL',
  NENHUMA = 'NENHUMA',
}

export interface Quesito {
  idQuesito: number;
  nomeQuesito: string;
}

export interface PreferenciaSorteio {
  nomeSorteioDanca: DancaSalaoTradicional;
  candidatoId: number;
  quesitos: number[];
}

export interface SorteioDanca {
  idSorteio: number;
  resultadoSorteio: number;
  dataSorteio: Date;
  tipoDanca: DancaSalaoTradicional;
  candidatoId: number;
  usuarioId: number;
  quesitoSorteado?: Quesito;
}

export interface CriarSorteioPayload{
  candidatoId: number;
  usuarioId: number;
  tipoDanca: DancaSalaoTradicional;
}