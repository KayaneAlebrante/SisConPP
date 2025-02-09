import express, { Request, Response } from "express";
import CategoriaController from "../controllers/categoria-controller";

const router = express.Router();

router.post("/", async(req: Request, res: Response) => {
    await CategoriaController.criarCategoria(req, res);
});

router.put("/:id", async(req: Request, res: Response) => {
    await CategoriaController.atualizarCategoria(req, res);
});

router.get("/", async(req: Request, res: Response) => {
    await CategoriaController.buscarCategorias(req, res);
});

router.delete("/:id", async(req: Request, res: Response) =>{
    await CategoriaController.deletarCategoria(req, res);
})


export default router;