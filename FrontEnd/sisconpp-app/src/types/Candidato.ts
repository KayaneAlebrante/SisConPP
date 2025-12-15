export enum ProvaCampeiraEsportiva {
    CAMPEIRA = "CAMPEIRA",
    ESPORTIVA = "ESPORTIVA",
    AMBAS = "AMBAS",
    NENHUMA = "NENHUMA"
}

export interface Candidato {
    idCandidato: number;
    nomeCompleto: string;
    cidade: string;
    estado: string;
    CTGId: number;
    numCarteirinha: string;
    CPF: string;
    RG: string;
    endereco: string
    numEndereco: number;
    bairro: string;
    escolaridade: string;
    filiacaoPai: string;
    filiacaoMae: string;
    ProvaCampeiraEsportiva?: ProvaCampeiraEsportiva;
    anexoFoto?: Blob;
    anexoDocumento?: Blob;
    anexoCarteirinha?: Blob;
    anexoEscolaridade?: Blob;
    anexoResidencia?: Blob;
    anexoAtaConcurso?: Blob;
    fichaInscricao?: Blob;
    anexoTermoCandidato?: Blob;
    anexoRelatorioVivencia?: Blob;
    anexoResponsavel?: Blob;
    anexoProvaEsportivaCampeira?: Blob;
    categoriaId: number;
}
