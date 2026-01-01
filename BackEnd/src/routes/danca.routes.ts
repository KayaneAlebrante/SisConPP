import express, { Request, Response } from 'express';
import { authMiddleware } from "../middlewares/authMiddleware";
import dancaController from '../controllers/danca.controller';

const router = express.Router();

router.get("/dancasTradicionais", authMiddleware, async(req: Request, res: Response) =>{
    await dancaController.listarDancasTradicionais(req, res);
});

router.get("/dancasSalao", authMiddleware, async(req: Request, res: Response) =>{
    await dancaController.listarDancasSalao(req, res);
});

router.post("/", authMiddleware, async(req: Request, res: Response) =>{
    await dancaController.criarDanca(req, res);
});

router.put("/:id", authMiddleware, async(req: Request, res: Response) =>{
    await dancaController.atualizarDanca(req,res);
});

router.delete("/:id", authMiddleware, async(req: Request, res: Response) =>{
    await dancaController.deletarDanca(req,res);
});

export default router;