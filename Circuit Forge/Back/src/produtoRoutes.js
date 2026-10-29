// ROUTES: liga cada URL ao método do controller.
const { Router } = require("express");
const c = require("../controllers/produtoController");

const router = Router();
router.get("/", c.listar);
router.get("/:id", c.buscar);
router.post("/", c.criar);
router.put("/:id", c.atualizar);
router.delete("/:id", c.remover);

module.exports = router;
