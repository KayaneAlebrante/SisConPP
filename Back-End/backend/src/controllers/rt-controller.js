const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const rtController = {
  async adicionarRT(req, res) {
    try {
      const { nomeRT } = req.body;

      if (!nomeRT) {
        return res.status(400).json({ message: "nomeRT é obrigatório" });
      }

      const novoRT = await prisma.rT.create({
        data: { nomeRT },
      });

      res.status(201).json(novoRT);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao adicionar RT" });
    }
  },

  async consultarRT(req, res) {
    try {
      const rts = await prisma.rT.findMany();
      res.status(200).json(rts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao consultar RTs" });
    }
  },

  async consultarRTPorId(req, res) {
    try {
      const { idRT } = req.params;

      const rt = await prisma.rT.findUnique({
        where: { idRT: Number(idRT) },
      });

      if (!rt) {
        return res.status(404).json({ message: "RT não encontrado" });
      }

      res.status(200).json(rt);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao consultar RT" });
    }
  },

  async editarRT(req, res) {
    try {
      const { idRT } = req.params;
      const { nomeRT } = req.body;

      const rtAtualizado = await prisma.rT.update({
        where: { idRT: Number(idRT) },
        data: { nomeRT },
      });

      res.status(200).json(rtAtualizado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao editar RT" });
    }
  },

  async excluirRT(req, res) {
    try {
      const { idRT } = req.params;

      await prisma.rT.delete({
        where: { idRT: Number(idRT) },
      });

      res.status(200).json({ message: "RT excluído com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro ao excluir RT" });
    }
  },
};

module.exports = rtController;
