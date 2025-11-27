import express, { Request, Response } from "express";
import RecursoController from "../controllers/recurso.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware,  async (req: Request, res: Response) => {
    await RecursoController.solicitarRecurso(req, res);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await RecursoController.listarRecursos(req, res);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await RecursoController.visualizarRecursoPorId(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await RecursoController.alterarStatusRecurso(req, res);
});

export default router;