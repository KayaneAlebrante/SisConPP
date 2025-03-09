import express, { Request, Response } from 'express';
import subquesitoController from '../controllers/subquesito-controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await subquesitoController.criarsubQuesitos(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await subquesitoController.atualizarsubQuesitos(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await subquesitoController.buscarSubQuesitoPorId(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await subquesitoController.buscarSubQuesitos(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await subquesitoController.deletarSubQuesito(req, res);
});


export default router;