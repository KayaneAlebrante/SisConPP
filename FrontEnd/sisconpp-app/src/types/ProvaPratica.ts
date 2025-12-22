import { Categoria } from "./Categoria";

export interface ProvaPratica {
    idProvaPratica: number;
    nomeProva: string;
    notaMaxima: number;
    provaId: number;
    blocosProvas: BlocoProva[]; 
    categorias: Categoria[];
}

export enum DancaSalaoTradicional {
    SALAO = "SALAO",
    TRADICIONAL = "TRADICIONAL",
    NENHUMA = "NENHUMA"
}

export interface SubQuesitos {
    idSubequestios?: number; 
    nomeSubquesito: string;
    notaSubequesito: number;
    quesitoId: number;
}

export interface Quesitos {
    idQuesito?: number;
    nomeQuesito: string;
    notaMaximaQuesito: number;
    danca: boolean;
    dancaSalaoTradicional: DancaSalaoTradicional;
    blocoProvaId?: number;
    subQuesitos?: SubQuesitos[]; 
}

export interface BlocoProva {
    idBloco?: number; 
    nomeBloco: string;
    notaMaximaBloco: number;
    provaPraticaId: number;
    quesitos?: Quesitos[]; 
}