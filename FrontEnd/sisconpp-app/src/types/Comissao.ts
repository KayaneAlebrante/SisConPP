
export interface Comissao{
    idComissao: number;
    nomeComissao: string;
    concursoId: number;
}

export interface ComissaoUsuario{
    idComissaoUsuario: number;
    comissaoId: number;
    usuarioId: number;
}