const { Router } = require('express');
const auth = require('../controllers/authController');
const router = Router();
router.post('/cadastro', auth.cadastrar);
router.post('/login', auth.entrar);
module.exports = router;
