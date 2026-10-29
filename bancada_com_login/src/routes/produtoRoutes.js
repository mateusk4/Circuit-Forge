// Consulta ao catálogo é pública. Alterações de produtos exigem conta administrativa.
const { Router } = require('express');
const c = require('../controllers/produtoController');
const { autenticar, somenteAdministrador } = require('../middleware/autenticacao');
const router = Router();
router.get('/', c.listar);
router.get('/:id', c.buscar);
router.post('/', autenticar, somenteAdministrador, c.criar);
router.put('/:id', autenticar, somenteAdministrador, c.atualizar);
router.delete('/:id', autenticar, somenteAdministrador, c.remover);
module.exports = router;
