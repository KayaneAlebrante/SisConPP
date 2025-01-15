import { PrismaClient, Funcao } from "@prisma/client";
import PessoaService from "./pessoa-service";

const prisma = new PrismaClient();

class UsuarioService extends PessoaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
    }

    async criarUsuario(
        nomeCompleto: string,
        cidade: string,
        estado: string,
        numCarteirinha: string,
        login: string,
        senha: string,
        funcao: Funcao,
        cTGIdCTG: number,
        concursoId: number,
        comissaoId: number,
        numCredenciamento?: string
    ) {
        try {
            const pessoaId = await this.criarPessoa(
                nomeCompleto,
                cidade,
                estado,
                numCarteirinha
            );
    
            const usuario = await this.prisma.usuario.create({
                data: {
                    login,
                    senha,
                    funcao,
                    numCredenciamento: numCredenciamento ?? '',
                    cTGIdCTG,
                    pessoaId: pessoaId.idPessoa,
                    concursoId: concursoId,
                    comissaoId: comissaoId,
                },
            });
    
            return { usuario, pessoaId };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao criar usuário com pessoa. Verifique os dados fornecidos.");
        }
    }
    

    async atualizarUsuario(
        idUsuario: number,
        data: { login?: string; senha?: string; funcao?: Funcao; numCredenciamento?: string },
        pessoaData: { nomeCompleto?: string; cidade?: string; estado?: string; numCarteirinha?: string }
    ) {
        try {
            const usuario = await this.prisma.usuario.update({
                where: { idUsuario: idUsuario },
                data: data,
            });

            if (pessoaData) {
                const pessoa = await this.atualizarPessoa(usuario.pessoaId, pessoaData);
                return { usuario, pessoa };
            }

            return usuario;
        } catch (error) {
            throw new Error("Erro ao atualizar usuário com pessoa. Verifique os dados fornecidos.");
        }
    }

    async buscarUsuarioPorId(idUsuario: number) {
        try {
            const Usuario = await this.prisma.usuario.findUnique({
                where: { idUsuario: idUsuario },
            });
            return Usuario;
        } catch (error) {
            throw new Error("Erro ao buscar usuário.");
        }
    }

    async buscarUsuarios() {
        try {
            const Usuarios = await this.prisma.usuario.findMany();
            return Usuarios;
        } catch (error) {
            throw new Error("Erro ao buscar usuários.");
        }
    }

    async deletarUsuario(idUsuario: number) {
        try {
            const usuario = await this.buscarUsuarioPorId(idUsuario);
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            await this.deletarPessoa(usuario.pessoaId);
            await this.prisma.usuario.delete({
                where: { idUsuario: idUsuario },
            });
        } catch (error) {
            throw new Error("Erro ao deletar usuário com pessoa.");
        }
    }  
}

const usuarioService = new UsuarioService(prisma);
export default usuarioService;