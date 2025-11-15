export enum Funcao {
    AVALIADOR = 'AVALIADOR',
    AUXILIAR = 'AUXILIAR',
    SECRETARIO = 'SECRETARIO',
}

export enum Credenciamento{
    CREDENCIADO = 'CREDENCIADO',
    NAO_CREDENCIADO = 'NÃO CREDENCIADO'
}

export interface Usuario {
    idUsuario: number;
    nomeCompleto: string;
    cidade: string;
    estado: string;
    CTGId: number;
    numCarteirinha: string;
    login: string;
    senha: string;
    funcao: Funcao;
    credenciamento: Credenciamento;
    numCredenciamento?: number;
    comissaoUsuarioId?: number;
}    