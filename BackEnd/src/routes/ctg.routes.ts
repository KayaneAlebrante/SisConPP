import express, { Request, Response } from 'express';
import CTGController from '../controllers/ctg.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await CTGController.criarCTG(req, res);
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    await CTGController.atualizarCTG(req, res);
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
    await CTGController.buscarCTGPorId(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    await CTGController.buscarCTGs(req, res);
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    await CTGController.deletarCTG(req, res);
});

export default router;