import { Request, Response } from "express";
import AuthService from "../services/auth.service";

class AuthController {
  // 🟢 Login de usuário
  async login(req: Request, res: Response) {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ mensagem: "Usuário e senha são obrigatórios." });
    }

    try {
      const token = await AuthService.login(login, senha );

      if (!token) {
        return res.status(401).json({ mensagem: "Credenciais inválidas." });
      }

      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        token,
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao realizar login:", error);
        return res.status(400).json({ mensagem: error.message });
      } else {
        console.error("Erro desconhecido:", error);
        console.error("Erro desconhecido:", error);
        return res.status(500).json({ mensagem: "Erro desconhecido." });
      }
    }
  }

  // 🔵 Exemplo opcional: método para validar token (caso queira futuramente)
  async validarToken(req: Request, res: Response) {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ mensagem: "Token é obrigatório." });
    }

    try {
      const usuario = await AuthService.validarToken(token);
      return res.status(200).json(usuario);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Erro ao validar token:", error);
        return res.status(401).json({ mensagem: error.message });
      } else {
        console.error("Erro desconhecido:", error);
        return res.status(500).json({ mensagem: "Erro desconhecido." });
      }
    }
  }
}

export default new AuthController();
