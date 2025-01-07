import express, { Request, Response } from 'express';
import RTController from '../controllers/rt-controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await RTController.criarRT(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await RTController.atualizarRT(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await RTController.buscarRTPorId(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await RTController.buscarRTs(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await RTController.deletarRT(req, res);
});

export default router;
