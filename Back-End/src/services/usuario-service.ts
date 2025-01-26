import { PrismaClient, Funcao } from "@prisma/client";
import PessoaService from "./pessoa-service";
import { error, log } from "console";

const prisma = new PrismaClient();

class UsuarioService extends PessoaService {
    constructor(prisma: PrismaClient) {
        super(prisma);
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
        concursoId: number,
        comissaoIdUsuario: number,         
        numCredenciamento?: string
             
    ) {
        const pessoaId = await this.criarPessoa(
            nomeCompleto,
            cidade,
            estado,
            CTGId,    
            numCarteirinha     
        );
    
        const pessoaExistente = await this.prisma.pessoa.findUnique({
            where: { idPessoa: pessoaId.idPessoa },
            include: { Usuario: true, Candidato: true },
        });
    
        if (pessoaExistente?.Usuario || pessoaExistente?.Candidato) {
            throw new Error("Esta pessoa já está associada a um usuário ou candidato.");
        }
    
        try {
            const usuario = await this.prisma.usuario.create({
                data: {
                    login,
                    senha,
                    funcao,
                    pessoaId: pessoaId.idPessoa,
                    concursoId: concursoId,
                    comissaoUsuarioId: comissaoIdUsuario,
                    numCredenciamento: numCredenciamento,                    
                },
            });
    
            return { usuario, pessoaId };
        } catch (error) {
            console.error("Erro detalhado:", error);
            throw new Error("Erro ao criar usuário com pessoa. Verifique os dados fornecidos.");
        }
    }
    
    async atualizarUsuario(
        idUsuario: number,
        data: { 
            login?: string; 
            senha?: string; 
            funcao?: Funcao;
            numCredenciamento?: string;
            concursoId?: number;
            comissaoIdUsuario?: number;            
        },
        pessoaData: { 
            nomeCompleto?: string; 
            cidade?: string; 
            estado?: string; 
            CTGId?: number; 
            numCarteirinha?: string }
    ) {
        try {
            const usuario = await this.prisma.usuario.update({
                where: { idUsuario },
                data,
                include: { Pessoa: true }, 
            });

            console.log(data);
            

            if (pessoaData && usuario.pessoaId) {
                const pessoa = await this.atualizarPessoa(usuario.pessoaId, pessoaData);
                return { usuario, pessoa };
            }
    
            return usuario;
        } catch (error) {
            console.error(error);
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
            console.log("IdUsuario:", idUsuario);
    
            const usuario = await this.prisma.usuario.findUnique({
                where: { idUsuario },
                include: { Pessoa: true },
            });
    
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }
    
            const idPessoa = usuario.pessoaId;
    
            await this.prisma.usuario.delete({
                where: { idUsuario },
            });
    
            if (idPessoa) {
                await this.deletarPessoa(idPessoa);
                console.log("Pessoa Deletada com Sucesso!");
            }
    
            return { mensagem: "Usuário deletado com sucesso." };
        } catch (error) {
            console.error(error);
            throw new Error("Erro ao deletar usuário.");
        }
    }
}

const usuarioService = new UsuarioService(prisma);
export default usuarioService;