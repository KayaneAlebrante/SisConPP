import { Request, Response, NextFunction } from "express";
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: number;
      login: string;
      funcao: string;
      [key: string]: any;
    };
  }
}

export function permitirFuncoes(funcoesPermitidas: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const usuario = req.user;

    if (!usuario) {
      res.status(401).json({ mensagem: "Token inválido" });
      return;
    }

    if (!funcoesPermitidas.includes(usuario.funcao)) {
      res.status(403).json({ mensagem: "Acesso negado" });
      return;
    }

    next();
  };
}
