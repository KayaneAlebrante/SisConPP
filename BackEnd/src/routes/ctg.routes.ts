import express, { Request, Response } from 'express';
import CTGController from '../controllers/ctg.controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await CTGController.criarCTG(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await CTGController.atualizarCTG(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await CTGController.buscarCTGPorId(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await CTGController.buscarCTGs(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await CTGController.deletarCTG(req, res);
});

export default router;