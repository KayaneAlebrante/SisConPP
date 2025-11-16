import { Usuario } from "./Usuario";

export interface ComissaoUsuario {
    idComissaoUsuario: number;
    comissaoId: number;
    usuarioId: number;
    Usuarios: Usuario;
}

export interface Comissao {
    idComissao: number;
    nomeComissao: string;
    concursoId: number;

    concurso: {
        idConcurso: number;
        nomeConcurso: string;
        lancamentoEdital: string;
        inscricoesInicio: string;
        inscricoesFinal: string;
        dataProvaEscrita: string;
        dataProvasPraticas: string;
        dataResultado: string;
        local: string;
        anexoEdital: string | null;
    };
    
    usuarios: ComissaoUsuario[];
}
