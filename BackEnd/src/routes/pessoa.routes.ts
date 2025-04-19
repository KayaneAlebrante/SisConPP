import express, { Request, Response } from "express";
import pessoaController from "../controllers/pessoa.controller";

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await pessoaController.criarPessoa(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await pessoaController.atualizarPessoa(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await pessoaController.buscarPessoaPorId(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await pessoaController.buscarPessoas(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await pessoaController.deletarPessoa(req, res);
});

export default router;