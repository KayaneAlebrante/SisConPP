import express, { Request, Response } from 'express';
import quesitoController from '../controllers/quesito.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await quesitoController.criarQuesito(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await quesitoController.atualizarQuesito(req, res); 
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await quesitoController.buscarQuesitoPorId(req, res);
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await quesitoController.buscarQuesitos(req, res);
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
    await quesitoController.deletarQuesito(req, res);
});

export default router;