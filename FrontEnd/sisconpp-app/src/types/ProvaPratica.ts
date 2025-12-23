export interface ProvaPratica {
    idProvaPratica: number;
    nomeProva: string;
    notaMaxima: number;
    categorias: number[];
    blocosProvas: BlocoProva[];    
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
    opcional: boolean;
    dancaSalaoTradicional: DancaSalaoTradicional;
    blocoProvaIdBloco?: number;
    subQuesitos?: SubQuesitos[]; 
}

export interface BlocoProva {
    idBloco?: number; 
    nomeBloco: string;
    notaMaximaBloco: number;
    provaPraticaId: number;
    quesitos?: Quesitos[]; 
}