import express, { Request, Response } from 'express';
import UsuarioController from '../controllers/usuario.controller';
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post('/', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.criarUsuario(req, res);
});

router.put('/:id', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.atualizarUsuario(req, res);
});

router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuarioPorId(req, res);
});

router.get('/usuarios/avaliadores', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuariosAvaliadores(req, res);
});
router.get('/usuarios/secretarios', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuariosSecretarios(req, res);
});

router.get('/usuarios/auxiliares', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuariosAuxiliares(req, res);
});

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.buscarUsuarios(req, res);
});

router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
    await UsuarioController.deletarUsuario(req, res);
});

export default router;