import express, { Request, Response } from "express";
import concursoController from "../controllers/concurso.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await concursoController.criarConcurso(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await concursoController.atualizarConcurso(req, res);
});

router.get("/:id", authMiddleware, async(req: Request, res: Response) => {
    await concursoController.buscarConcursoPorId(req, res);
})

router.get("/", authMiddleware, async(req: Request, res: Response) =>{
    await concursoController.buscarConcursos(req, res);
})

router.delete("/:id", authMiddleware, async(req: Request, res: Response) =>{
    await concursoController.deletarConcurso(req, res);
});

router.put("/:id/anexo", authMiddleware, async(req: Request, res: Response) =>{
    await concursoController.anexarEdital(req, res);
});

export default router;