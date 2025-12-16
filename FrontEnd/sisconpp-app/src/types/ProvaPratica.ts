import { Categoria } from "./Categoria";

export interface ProvaPratica {
    idProvaPratica: number;
    provaId: number;
    blocosProvas: [];
    categorias: Categoria[];
}

export interface BlocoProva{
    idBloco: number;
    nomeBloco: string;
    notaMaximaBloco: number;
    provaPraticaId: number;
    quesitos: Quesitos[];
}

export enum DancaSalaoTradicional {
    SALAO = "SALAO",
    TRADICIONAL = "TRADICIONAL",
    NENHUMA = "NENHUMA"
}

export interface Quesitos {
    idQuesito: number;
    nomeQuesito: string;
    notaMaximaQuesito: number;
    danca: boolean;
    dancaSalaoTradicional: DancaSalaoTradicional;
    blocoProvaId?: number;
    subQuesitos: SubQuesitos[];
}

export interface SubQuesitos {
    idSubequestios: number;
    nomeSubquesito: string;
    notaSubequesito: number;
    quesitoId: number;
}
