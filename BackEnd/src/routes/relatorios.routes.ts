import express, { Request, Response } from "express";
import RelatoriosController from "../controllers/relatorios.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import relatoriosController from "../controllers/relatorios.controller";

const router = express.Router();

router.get( "/relatorio-geral/:concursoId", authMiddleware, async (req:Request, res: Response) => {
 await relatoriosController.relatorioGeralPorConcurso(req, res);
});

router.get( "/ranking/:concursoId/:categoriaId", authMiddleware, async (req: Request, res: Response) => {
        await relatoriosController.rankingPorCategoria(req, res);
});

export default router;
