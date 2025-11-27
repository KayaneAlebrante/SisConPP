import express, { Request, Response } from "express";
import CategoriaController from "../controllers/categoria.controller";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, async(req: Request, res: Response) => {
    await CategoriaController.criarCategoria(req, res);
});

router.put("/:id", authMiddleware,  async(req: Request, res: Response) => {
    await CategoriaController.atualizarCategoria(req, res);
});

router.get("/", authMiddleware,  async(req: Request, res: Response) => {
    await CategoriaController.buscarCategorias(req, res);
});

router.delete("/:id", authMiddleware,  async(req: Request, res: Response) =>{
    await CategoriaController.deletarCategoria(req, res);
})


export default router;