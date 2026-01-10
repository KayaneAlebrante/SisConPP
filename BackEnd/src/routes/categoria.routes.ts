import express, { Request, Response } from "express";
import CategoriaController from "../controllers/categoria.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { permitirFuncoes } from "../middlewares/roleMiddleware";

const router = express.Router();

router.post("/", authMiddleware, permitirFuncoes(["SECRETARIO"]), async(req: Request, res: Response) => {
    await CategoriaController.criarCategoria(req, res);
});

router.put("/:id", authMiddleware, permitirFuncoes(["SECRETARIO"]), async(req: Request, res: Response) => {
    await CategoriaController.atualizarCategoria(req, res);
});

router.get("/", authMiddleware, permitirFuncoes(["SECRETARIO", "AVALIADOR", "AUXILIAR"]), async(req: Request, res: Response) => {
    await CategoriaController.buscarCategorias(req, res);
});

router.delete("/:id", authMiddleware, permitirFuncoes(["SECRETARIO"]), async(req: Request, res: Response) =>{
    await CategoriaController.deletarCategoria(req, res);
})


export default router;