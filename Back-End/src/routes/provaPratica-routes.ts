import express, {Request, Response } from "express";
import ProvaPraticaController from "../controllers/provaPratica-controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {   
    await ProvaPraticaController.criarProvaPratica(req, res);
});

router.get("/:id", async (req: Request, res: Response) => {
    await ProvaPraticaController.buscarProvaPraticaPorId(req, res);
}); 

router.get("/", async (req: Request, res: Response) => {
    await ProvaPraticaController.buscarProvasPraticas(req, res);
});

router.put("/:id", async (req: Request, res: Response) => {
    await ProvaPraticaController.atualizarProvaPratica(req, res);
});

export default router;