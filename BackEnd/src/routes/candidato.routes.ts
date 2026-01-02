import express, { Request, Response } from "express";
import CandidatoController from "../controllers/candidato.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.criarCandidato(req, res);
});

router.post("/fichaCandidato",authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.criarFichaCandidato(req, res);
});

router.get("/fichaCandidato/:id", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.buscarIdFicha(req, res);
});

router.put("/:id",authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.atualizarCandidato(req, res);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatoPorId(req, res);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatos(req, res);
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.deletarCandidato(req, res);
});

router.post("/:id/anexos", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.anexarAnexos(req, res);
});

router.get("/:id/anexos", authMiddleware, async (req: Request, res: Response) => {
    await CandidatoController.visualizarAnexos(req, res);
});

router.put("/:id/anexos", authMiddleware,  async (req: Request, res: Response) => {
    await CandidatoController.editarAnexos(req, res);
});

export default router;   