import express, { Request, Response } from "express";
import authController from "../controllers/auth.controller";

const route = express.Router();

route.post("/login", async (req: Request, res: Response) => {
  await authController.login(req, res);
});

route.post("/validar-token", async (req: Request, res: Response) => {
  await authController.validarToken(req, res);
});

export default route;