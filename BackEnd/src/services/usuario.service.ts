import { PrismaClient, Funcao, Credenciamento, Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError";


const prisma = new PrismaClient();

class UsuarioService {
    private prisma: PrismaClient;

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async criarUsuarioComPessoa(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        CTGId: number,
        numCarteirinha: string,
        login: string,
        senha: string,
        funcao: Funcao,
        credenciamento?: Credenciamento,
        numCredenciamento?: number,
        comissaoUsuarioId?: number,
    ) {
        try {
            const senhaCriptografada = await bcrypt.hash(senha, 10);

            const usuario = await this.prisma.usuario.create({
                data: {
                    nomeCompleto,
                    cidade,
                    estado,
                    CTGId,
                    numCarteirinha,
                    login,
                    senha: senhaCriptografada,
                    funcao,
                    credenciamento,
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
            nomeCompleto?: string;
            cidade?: string;
            estado?: string;
            CTGId?: number;
            numCarteirinha?: string;
            login?: string;
            senha?: string;
            funcao?: Funcao;
            credenciamento?: Credenciamento;
            numCredenciamento?: number;
            comissaoUsuarioId?: number;
        },
    ) {
        try {
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => value !== undefined)
            );

            if (data.credenciamento === Credenciamento.NAO_CREDENCIADO) {
                filteredData.numCredenciamento = 0;
            }

            const usuario = await this.prisma.usuario.update({
                where: { idUsuario },
                data: filteredData,
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
                where: { funcao: Funcao.AVALIADOR },
                include: {
                    ComissaoUsuario: {
                        include: {
                            Comissao: true,
                        },
                    },
                },
            });

            return avaliadores;
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao listar usuários avaliadores.");
        }
    }

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
            const usuario = await this.prisma.usuario.findUnique({
                where: { idUsuario }
            });

            if (!usuario) {
                throw new AppError("Usuário não encontrado.", 404);
            }

            await this.prisma.usuario.delete({
                where: { idUsuario }
            });

            return { message: "Usuário deletado com sucesso." };

        } catch (error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2003') {
                throw new AppError("Não é possível deletar o usuário pois ele está associado a outros registros.", 409);
            }

            if (error instanceof AppError) {
                throw error;
            }

            throw new AppError("Erro ao deletar usuário.", 500);
        }
    }
}

const usuarioService = new UsuarioService(prisma);
export default usuarioService;