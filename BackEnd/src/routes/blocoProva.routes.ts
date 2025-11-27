import express, {Request, Response } from "express";
import blocoProvaController from "../controllers/blocoProva.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const route = express.Router();

route.post("/", authMiddleware,  async (req: Request, res: Response) => {
    await blocoProvaController.criarBlocoProva(req, res);
});

route.put("/",authMiddleware,  async (req: Request, res: Response) => {
    await blocoProvaController.editarBlocoProva(req, res);
});

route.get("/:idBloco", authMiddleware, async (req: Request, res: Response) => {
    await blocoProvaController.consultarBlocoProva(req, res);
});

route.get("/", authMiddleware,  async (req: Request, res: Response) => {
    await blocoProvaController.consultarBlocosProva(req, res);
});


export default route;