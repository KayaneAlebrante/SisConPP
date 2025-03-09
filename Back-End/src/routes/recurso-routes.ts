import express, { Request, Response } from "express";
import RecursoController from "../controllers/recurso-controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await RecursoController.solicitarRecurso(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await RecursoController.listarRecursos(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await RecursoController.visualizarRecursoPorId(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await RecursoController.alterarStatusRecurso(req, res);
});

export default router;