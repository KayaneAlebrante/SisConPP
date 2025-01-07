import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import PessoaService from "./pessoa-service"; 

enum Funcao {
    SECRETARIO = "Secretario",
    AVALIADOR = "Avaliador",
    AUXILIAR = "Auxiliar",
}

/*class UserService extends //PessoaService {
    constructor(prisma: PrismaClient) {
        super(prisma); 
    }

    async createUser(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        login: string,
        senha: string,
        funcao: Funcao,
        numCredenciamento?: string,
        cTGIdCTG?: number,
        concursoIdConcurso?: number,
        comissaoIdComissao?: number
    ) {
        try {
            const pessoa = await this.createPessoa(
                nomeCompleto,
                cidade,
                estado,
                numCredenciamento
            );

            const user = await prisma.user.create({
                data: {
                    pessoaId: pessoa.idPessoa,
                    login: login,
                    senha: senha,
                    funcao: funcao,
                    numCredenciamento: numCredenciamento,
                    cTGIdCTG: cTGIdCTG,
                    concursoIdConcurso: concursoIdConcurso,
                    comissaoIdComissao: comissaoIdComissao,
                },
            });

            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao criar usuário");
        }
    }

    async getUserById(idUser: number) {
        try {
            const user = await prisma.user.findUnique({
                where: { idUser: idUser },
                include: { Pessoa: true },
            });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao buscar usuário");
        }
    }

    async updateUserWithPessoa(idUser: number, data: any) {
        try {
            const user = await prisma.user.update({
                where: { idUser: idUser },
                data: {
                    ...data.user,
                    Pessoa: {
                        update: data.pessoa,
                    },
                },
                include: { Pessoa: true },
            });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao atualizar usuário");
        }
    }

    async deleteUser(idUser: number) {
        try {
            const user = await prisma.user.delete({
                where: { idUser: idUser },
            });
            return user;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar usuário");
        }
    }
}

export default new UserService(prisma);*/
