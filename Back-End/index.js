const express = require("express");
const rtRoutes = require("./src/routes/rt-routes.js");

const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas 
app.use("/rt", rtRoutes);

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Hello World");
  
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
