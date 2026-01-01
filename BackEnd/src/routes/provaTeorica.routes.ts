import express, {Request, Response } from "express";	
import ProvaTeoricaController from "../controllers/provaTeorica.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {   
    await ProvaTeoricaController.criarProvaTeorica(req, res);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await ProvaTeoricaController.buscarProvaTeoricaPorId(req, res);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await ProvaTeoricaController.buscarProvasTeoricas(req, res);
});

router.get("/categoria/:idCategoria", authMiddleware, async (req: Request, res: Response) => {
    await ProvaTeoricaController.buscarProvasTeoricasPorCategoria(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await ProvaTeoricaController.atualizarProvaTeorica(req, res);
});

export default router;