import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class RTService {
  constructor(private prisma: PrismaClient) {}

  async criarRT(nomeRT: string, numeroRT: number) {
    try {
      const rt = await this.prisma.rT.create({
        data: {
          nomeRT: nomeRT,
          numeroRT: numeroRT,
        },
      });
      return rt;
    } catch (error) {
      throw new Error("Erro ao criar RT. Verifique os dados fornecidos.");
    }
  }

  async atualizarRT(
    idRt: number,
    data: {
      nomeRT?: string;
      numeroRT?: number;
    }
  ) {
    try {
      const rt = await this.prisma.rT.update({
        where: { idRT: idRt },
        data: data,
      });
      return rt;
    } catch (error) {
      throw new Error("Erro ao atualizar RT. Verifique os dados fornecidos.");
    }
  }

  async buscarRTPorId(idRt: number) {
    try {
      const rt = await this.prisma.rT.findUnique({
        where: { idRT: idRt },
      });
      return rt;
    } catch (error) {
      throw new Error("Erro ao buscar RT.");
    }
  }

  async buscarRTs() {
    try {
      const rt = await this.prisma.rT.findMany();
      return rt;
    } catch (error) {
      throw new Error("Erro ao buscar RTs.");
    }
  }

  async deletarRT(idRt: number) {
    try {
      const rt = await this.prisma.rT.delete({
        where: { idRT: idRt },
      });
      return rt;
    } catch (error) {
      throw new Error("Erro ao deletar RT.");
    }
  }
}

const rtService = new RTService(prisma);
export default rtService;
