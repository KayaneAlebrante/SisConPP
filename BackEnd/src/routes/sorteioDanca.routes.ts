import express, {Request, Response} from "express";
import sorteioDancaController from "../controllers/sorteioDanca.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
    await sorteioDancaController.realizarSorteio(req, res);
});

export default router;