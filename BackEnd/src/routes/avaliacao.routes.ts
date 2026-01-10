import express, { Request, Response } from "express";
import avaliacaoController from "../controllers/avaliacao.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/avaliacaoCompleta", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.criarAvaliacaoCompleta(req, res);
});

router.post("/avaliacaoTeorica", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.criarAvaliacaoTeorica(req, res);
});

router.get("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.visualizarAvaliacoes(req, res);
});

router.put("/avaliacao/:idAvaliacao", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.editarAvaliacao(req, res);
});

router.get( "/avaliacao/:avaliadorId/:candidatoId", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.buscarEstruturaCompleta(req, res);
});

router.get( "/avaliacaoTeorica/:candidatoId", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.buscarEstruturaTeorica(req, res);
});

router.get("/avaliacoes", authMiddleware, async (req: Request, res: Response) => {
    await avaliacaoController.listarAvaliacoes(req, res);
});

export default router;