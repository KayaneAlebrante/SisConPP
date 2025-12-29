import express, { Request, Response } from "express";
import avaliacaoController from "../controllers/avaliacao.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/avaliacaoCompleta", async (req: Request, res: Response) => {
    await avaliacaoController.criarAvaliacaoCompleta(req, res);
});

router.get("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.visualizarAvaliacoes(req, res);
});

router.put("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.editarAvaliacao(req, res);
});

router.get( "/avaliacao/:avaliadorId/:candidatoId", async (req: Request, res: Response) => {
    await avaliacaoController.buscarEstruturaCompleta(req, res);
});

export default router;