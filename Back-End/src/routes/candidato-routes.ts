import express, { Request, Response } from "express";
import CandidatoController from "../controllers/candidato-controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await CandidatoController.criarCandidato(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await CandidatoController.atualizarCandidato(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatoPorId(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatos(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await CandidatoController.deletarCandidato(req, res);
});

router.post("/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.anexarAnexos(req, res);
});

router.get("/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.visualizarAnexos(req, res);
});

router.put("/:id/anexos", async (req: Request, res: Response) => {
    await CandidatoController.editarAnexos(req, res);
});

export default router;   