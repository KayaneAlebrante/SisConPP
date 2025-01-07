import express, { Application } from "express";
import rtRoutes from "./routes/rt-routes"; 

const app: Application = express(); 

app.use(express.json()); // Para analisar o corpo das requisições como JSON

// Definindo o prefixo '/rt' para as rotas de RT
app.use("/rt", rtRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Hello World");
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});