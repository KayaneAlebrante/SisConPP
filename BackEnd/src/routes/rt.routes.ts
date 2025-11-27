import express, { Request, Response } from 'express';
import RTController from '../controllers/rt.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await RTController.criarRT(req, res);
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    await RTController.atualizarRT(req, res);
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
    await RTController.buscarRTPorId(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    await RTController.buscarRTs(req, res);
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    await RTController.deletarRT(req, res);
});

export default router;
