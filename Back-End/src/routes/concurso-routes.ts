import express, { Request, Response } from "express";
import concursoController from "../controllers/concurso-controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await concursoController.criarConcurso(req, res);
});

export default router;