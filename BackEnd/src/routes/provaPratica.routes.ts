import express, {Request, Response } from "express";
import ProvaPraticaController from "../controllers/provaPratica.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {   
    await ProvaPraticaController.criarProvaPratica(req, res);
});

router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
    await ProvaPraticaController.buscarProvaPraticaPorId(req, res);
}); 

router.get("/", authMiddleware, async (req: Request, res: Response) => {
    await ProvaPraticaController.buscarProvasPraticas(req, res);
});

router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
    await ProvaPraticaController.atualizarProvaPratica(req, res);
});

export default router;