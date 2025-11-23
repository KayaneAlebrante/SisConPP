import express, { Request, Response } from 'express';
import quesitoController from '../controllers/quesito.controller';

const router = express.Router();

router.get("/dancasTradicionais", async(req: Request, res: Response) =>{
    await quesitoController.buscarDancasTradicionais(req, res);
});

router.get("/dancasSalao", async(req: Request, res: Response) =>{
    await quesitoController.buscarDancasSalao(req, res);
});

router.post("/", async (req: Request, res: Response) => {
    await quesitoController.criarQuesito(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await quesitoController.atualizarQuesito(req, res); 
});

router.get("/:id", async (req: Request, res: Response) => {
    await quesitoController.buscarQuesitoPorId(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await quesitoController.buscarQuesitos(req, res);
});

router.delete("/:id", async (req: Request, res: Response) => {
    await quesitoController.deletarQuesito(req, res);
});

export default router;