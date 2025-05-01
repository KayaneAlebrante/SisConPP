import { PrismaClient, Funcao, Credenciamento } from "@prisma/client";

const prisma = new PrismaClient();

class UsuarioService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async criarUsuario(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        CTGId: number,
        numCarteirinha: string,
        login: string,
        senha: string,
        funcao: Funcao,
        numCredenciamento: Credenciamento,
        comissaoUsuarioId?: number,
    ) {
        try {
            const usuario = await this.prisma.usuario.create({
                data: {
                    nomeCompleto,
                    cidade,
                    estado,
                    CTGId,
                    numCarteirinha,
                    login,
                    senha,
                    funcao,
                    numCredenciamento,
                    comissaoUsuarioId,
                },
            });

            return { usuario };
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar usuário com pessoa. Verifique os dados fornecidos.");
        }
    }

    async atualizarUsuario(
        idUsuario: number,
        data: {
            nomeCompleto?: string,
            cidade?: string,
            estado?: string,
            CTGId?: number,
            numCarteirinha?: string,
            login?: string,
            senha?: string,
            funcao?: Funcao,
            numCredenciamento?: Credenciamento,
            comissaoUsuarioId?: number,
        },
    ) {
        try {
            const usuario = await this.prisma.usuario.update({
                where: { idUsuario },
                data,
            });

            return usuario;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao atualizar usuário com pessoa. Verifique os dados fornecidos.");
        }
    }

    async listarUsuariosAvaliadores() {
        try {
            const avaliadores = await this.prisma.usuario.findMany({
                where: { funcao: Funcao.AVALIADOR }
            });
            return avaliadores;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao listar usuários avaliadores.");
        }
    };

    async listarUsuariosSecretarios() {
        try {
            const secretarios = await this.prisma.usuario.findMany({
                where: { funcao: Funcao.SECRETARIO }
            });
            return secretarios;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao listar usuários secretários.");
        }
    }

    async listarUsuariosAuxiliares() {
        try {
            const auxiliares = await this.prisma.usuario.findMany({
                where: { funcao: Funcao.AUXILIAR }
            });
            return auxiliares;
        }
        catch (error) {
            console.error(error);
            throw new Error("Erro ao listar usuários auxiliares.");
        }
    }


    async buscarUsuarioPorId(idUsuario: number) {
        try {
            const Usuario = await this.prisma.usuario.findUnique({
                where: { idUsuario: idUsuario }
            });
            return Usuario;
        } catch (error) {
            throw new Error("Erro ao buscar usuário.");
        }
    }

    async buscarUsuarios() {
        try {
            const Usuarios = await this.prisma.usuario.findMany({});
            return Usuarios;
        } catch (error) {
            throw new Error("Erro ao buscar usuários.");
        }
    }

    async deletarUsuario(idUsuario: number) {
        try {
            const usuario = await this.prisma.usuario.delete({
                where: { idUsuario: idUsuario }
            })

            return { mensagem: "Usuário deletado com sucesso." };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar usuário.");
        }
    }
}

const usuarioService = new UsuarioService(prisma);
export default usuarioService;