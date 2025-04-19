import express, { Request, Response } from "express";
import concursoController from "../controllers/concurso.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await concursoController.criarConcurso(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await concursoController.atualizarConcurso(req, res);
});

router.get("/:id", async(req: Request, res: Response) => {
    await concursoController.buscarConcursoPorId(req, res);
})

router.get("/", async(req: Request, res: Response) =>{
    await concursoController.buscarConcursos(req, res);
})

router.delete("/:id", async(req: Request, res: Response) =>{
    await concursoController.deletarConcurso(req, res);
});

router.get("/:idConcurso/candidatos", async(req: Request, res: Response) =>{
    await concursoController.bsucarCandidadosConcurso(req, res);
});


router.put("/:id/anexo", async(req: Request, res: Response) =>{
    await concursoController.anexarEdital(req, res);
});

export default router;