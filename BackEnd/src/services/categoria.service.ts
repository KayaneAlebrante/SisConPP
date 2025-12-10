import { PrismaClient } from "@prisma/client";
import { prisma } from '../prisma';

class CategoriaService {
    constructor(private prisma: PrismaClient){}

    async criarCategoria(
        nomeCategoria: string, 
        escolaridade: string, 
        sorteioDanca: number, 
        idadeInicial: number, 
        idadeLimite: number | null, 
        provaTeoricaId: number, 
        provaPraticaId: number) {
        try {
            return await this.prisma.categoria.create({
                data: {
                    nomeCategoria,
                    escolaridade,
                    sorteioDanca,
                    idadeInicial,
                    idadeLimite,
                    provaTeoricaId,
                    provaPraticaId, 
                },
            });
        } catch (error: any) {
            throw new Error(`Erro ao criar categoria: ${error.message}`);
        }
    }

    async listarCategorias() {
        try {
            return await this.prisma.categoria.findMany();
        } catch (error: any) {
            throw new Error(`Erro ao listar categorias: ${error.message}`);
        }
    }

    async atualizarCategoria(idCategoria: number, dados: Partial<{ nomeCategoria: string; idadeInicial: number; idadeLimite: number | null; escolaridade: string; sorteioDanca: number }>) {
        try {
            return await this.prisma.categoria.update({
                where: { idCategoria },
                data: dados,
            });
        } catch (error: any) {
            throw new Error(`Erro ao atualizar categoria: ${error.message}`);
        }
    }

    async deletarCategoria(idCategoria: number) {
        try {
            return await this.prisma.categoria.delete({
                where: { idCategoria },
            });
        } catch (error: any) {
            throw new Error(`Erro ao deletar categoria: ${error.message}`);
        }
    }

}

const categoriaService = new CategoriaService(prisma);
export default categoriaService;

