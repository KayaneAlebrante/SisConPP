export enum Funcao {
    AVALIADOR = 'AVALIADOR',
    ADMIN = 'ADMIN',
    OUTRO = 'OUTRO'
}
  
export interface Usuario {
    idUsuario: number;
    pessoaId: number;
    nomeCompleto: string;
    cidade: string;
    estado: string;
    CTGId: number;
    numCarteirinha: string;
    login: string;
    senha: string;
    funcao: Funcao;
    numCredenciamento: string;
    concursoId: number;
    comissaoIdUsuario: number;
}    