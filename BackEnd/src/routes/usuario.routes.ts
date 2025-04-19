import express, { Request, Response } from 'express';
import UsuarioController from '../controllers/usuario.controller';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    await UsuarioController.criarUsuario(req, res);
});

router.put('/:id', async (req: Request, res: Response) => {
    await UsuarioController.atualizarUsuario(req, res);
});

router.get('/:id', async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuarioPorId(req, res);
});

router.get('/', async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuarios(req, res);
});

router.delete('/:id', async (req: Request, res: Response) => {
    await UsuarioController.deletarUsuario(req, res);
});

export default router;