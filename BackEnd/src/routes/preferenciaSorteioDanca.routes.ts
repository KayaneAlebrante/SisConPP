import express, { Request, Response } from "express";
import PreferenciaSorteioDancaController from "../controllers/preferenciaSorteioDanca.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await PreferenciaSorteioDancaController.criarPreferencias(req, res);
});

router.get("/:candidatoId", async (req: Request, res: Response) => {
    await PreferenciaSorteioDancaController.visualizarPreferencias(req, res);
});

router.put("/", async (req: Request, res: Response) => {
    await PreferenciaSorteioDancaController.atualizarSorteioDancaId(req, res);
});

export default router;