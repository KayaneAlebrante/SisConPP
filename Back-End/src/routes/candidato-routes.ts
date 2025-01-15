import express, { Request, Response } from "express";
import CandidatoController from "../controllers/canditado-controller";

const router = express.Router();

router.post("/candidatos", async (req: Request, res: Response) => {
    await CandidatoController.criarCandidato(req, res);
});

router.put("/candidatos/:id", async (req: Request, res: Response) => {
    await CandidatoController.atualizarCandidato(req, res);
});

router.get("/candidatos/:id", async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatoPorId(req, res);
});

router.get("/candidatos", async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatos(req, res);
});

router.delete("/candidatos/:id", async (req: Request, res: Response) => {
    await CandidatoController.deletarCandidato(req, res);
});

router.post("/candidatos/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.anexarAnexos(req, res);
});

router.get("/candidatos/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.visualizarAnexos(req, res);
});

router.put("/candidatos/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.editarAnexos(req, res);
});

export default router;