import express, { Application } from "express";
import rtRoutes from "./routes/rt-routes"; 
import ctgRoutes from "./routes/ctg-routes";
import usuarioRoutes from "./routes/usuario-routes";
import candidatoRoutes from "./routes/candidato-routes";
import concursoRoutes from "./routes/concurso-routes";
import categoriaRoutes from "./routes/categoria-routes";


const app: Application = express(); 

app.use(express.json()); // Para analisar o corpo das requisições como JSON

// Definindo os prefixos das rotas 
app.use("/rt", rtRoutes);
app.use("/ctg", ctgRoutes);
app.use("/usuario", usuarioRoutes);
app.use("/candidato", candidatoRoutes);
app.use("/concurso", concursoRoutes);
app.use("/categoria", categoriaRoutes);

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log("Hello World");
  console.log(`Servidor rodando em http://localhost:${PORT}`);  
});