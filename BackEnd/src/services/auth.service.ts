import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();
const SECRET = process.env.JWT_SECRET || "chave-secreta";

class AuthService {
  async login(login: string, senha: string) {
    const usuario = await prisma.usuario.findUnique({
      where: { login },
      include: { CTG: true },
    });

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error("Senha incorreta.");
    }

    const token = jwt.sign(
      { id: usuario.idUsuario, login: usuario.login, funcao: usuario.funcao },
      process.env.JWT_SECRET || "segredo",
      { expiresIn: "1h" }
    );

    return {
      message: "Login realizado com sucesso.",
      token,
      usuario: {
        id: usuario.idUsuario,
        nome: usuario.nomeCompleto,
        funcao: usuario.funcao,
        ctg: usuario.CTG?.nomeCTG,
        cidade: usuario.cidade,
        estado: usuario.estado,
      },
    };
  }

  async validarToken(token: string) {
    try {
      const decoded = jwt.verify(token, SECRET);
      return decoded;
    } catch {
      throw new Error("Token inválido ou expirado.");
    }
  }
}

export default new AuthService();
