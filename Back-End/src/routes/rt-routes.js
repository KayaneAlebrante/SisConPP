const { Router } = require("express");
const rtController = require("../controllers/rt-controller");

const router = Router();

router.post("/", rtController.adicionarRT);          // AdicionarRT
router.get("/", rtController.consultarRT);           // ConsultarRT (todos)
router.get("/:idRT", rtController.consultarRTPorId); // ConsultarRT (por ID)
router.put("/:idRT", rtController.editarRT);         // EditarRT
router.delete("/:idRT", rtController.excluirRT);     // ExcluirRT

module.exports = router;
