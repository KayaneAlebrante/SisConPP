import express, {Request, Response } from "express";
import blocoProvaController from "../controllers/blocoProva-controller";

const route = express.Router();

route.post("/", async (req: Request, res: Response) => {
    await blocoProvaController.criarBlocoProva(req, res);
});

route.put("/", async (req: Request, res: Response) => {
    await blocoProvaController.editarBlocoProva(req, res);
});

route.get("/:idBloco", async (req: Request, res: Response) => {
    await blocoProvaController.consultarBlocoProva(req, res);
});

route.get("/", async (req: Request, res: Response) => {
    await blocoProvaController.consultarBlocosProva(req, res);
});


export default route;