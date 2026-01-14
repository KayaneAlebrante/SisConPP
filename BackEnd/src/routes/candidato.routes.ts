import express, { Request, Response } from "express";
import CandidatoController from "../controllers/candidato.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permitirFuncoes } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.criarCandidato(req, res);
});

router.post("/fichaCandidato",authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.criarFichaCandidato(req, res);
});

router.get("/fichaCandidato/:id",  authMiddleware, permitirFuncoes(["SECRETARIO", "AVALIADOR"]), async (req: Request, res: Response) => {
    await CandidatoController.buscarIdFicha(req, res);
});

router.put("/:id",authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.atualizarCandidato(req, res);
});

router.get("/:id", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatoPorId(req, res);
});

router.get("/", authMiddleware, permitirFuncoes(["SECRETARIO", "AVALIADOR", "AUXILIAR"]), async (req: Request, res: Response) => {
    await CandidatoController.buscarCandidatos(req, res);
});

router.delete("/:id", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.deletarCandidato(req, res);
});

router.post("/:id/anexos", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.anexarAnexos(req, res);
});

router.get("/:id/anexos", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.visualizarAnexos(req, res);
});

router.put("/:id/anexos", authMiddleware, permitirFuncoes(["SECRETARIO"]), async (req: Request, res: Response) => {
    await CandidatoController.editarAnexos(req, res);
});

export default router;   