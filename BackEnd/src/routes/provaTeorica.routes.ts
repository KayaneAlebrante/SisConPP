import express, {Request, Response } from "express";	
import ProvaTeoricaController from "../controllers/provaTeorica.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {   
    await ProvaTeoricaController.criarProvaTeorica(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await ProvaTeoricaController.buscarProvaTeoricaPorId(req, res);
});

router.get("/", async (req: Request, res: Response) => {
    await ProvaTeoricaController.buscarProvasTeoricas(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await ProvaTeoricaController.atualizarProvaTeorica(req, res);
});

export default router;