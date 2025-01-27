import express, { Request, Response } from "express";
import concursoController from "../controllers/concurso-controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await concursoController.criarConcurso(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await concursoController.atualizarConcurso(req, res);
});


export default router;