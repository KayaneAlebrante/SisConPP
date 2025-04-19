import express, {Request, Response} from "express";
import sorteioDancaController from "../controllers/sorteioDanca.controller";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
    await sorteioDancaController.realizarSorteio(req, res);
});

export default router;