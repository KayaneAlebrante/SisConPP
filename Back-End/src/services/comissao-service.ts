import { PrismaClient, Avaliacao, ComissaoUsuario } from "@prisma/client";

const prisma = new PrismaClient();

class ComissaoService {
    constructor(private prisma: PrismaClient) {}

    async criarComissao(
        nomeComissao: string,
        concursoId: number,
        avaliacoes: Avaliacao[],
        usuarios: ComissaoUsuario[]
    ) {
        try {
            const comissao = await this.prisma.comissao.create({
                data: {
                    nomeComissao: nomeComissao,
                    concursoId: concursoId,
                    avalicao: {
                        create: avaliacoes,
                    },
                    usuarios: {
                        create: usuarios,
                    },
                },
            });

            return comissao;
        } catch (error) {
            console.error("Erro ao criar comissão:", error);
            throw new Error("Erro ao criar comissão. Verifique os dados fornecidos.");
        }
    }
}

const comissaoService = new ComissaoService(prisma);
export default comissaoService;
