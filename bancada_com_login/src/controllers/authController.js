const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarioModel');

function tokenDo(usuario) {
  return jwt.sign(
    { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

async function cadastrar(req, res, next) {
  try {
    const { nome, email, senha, perfil, chaveAdmin } = req.body;
    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ erro: 'Preencha nome, e-mail, senha e tipo de conta.' });
    }
    if (!['cliente', 'administrador'].includes(perfil)) {
      return res.status(400).json({ erro: 'Tipo de conta inválido.' });
    }
    if (String(nome).trim().length < 2) return res.status(400).json({ erro: 'Informe seu nome completo.' });
    const emailNormalizado = String(email).trim().toLowerCase();
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formatoEmail.test(emailNormalizado)) return res.status(400).json({ erro: 'Informe um e-mail válido.' });
    if (String(senha).length < 8) return res.status(400).json({ erro: 'A senha precisa ter pelo menos 8 caracteres.' });
    if (perfil === 'administrador' && (!process.env.ADMIN_REGISTRATION_KEY || chaveAdmin !== process.env.ADMIN_REGISTRATION_KEY)) {
      return res.status(403).json({ erro: 'Chave de autorização administrativa incorreta.' });
    }
    if (await Usuario.buscarPorEmail(emailNormalizado)) return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    const senhaHash = await bcrypt.hash(senha, 12);
    const usuario = await Usuario.criar({ nome: String(nome).trim(), email: emailNormalizado, senhaHash, perfil });
    return res.status(201).json({ mensagem: 'Cadastro realizado com sucesso.', usuario, token: tokenDo(usuario) });
  } catch (erro) {
    if (erro.code === '23505') return res.status(409).json({ erro: 'Este e-mail já está cadastrado.' });
    next(erro);
  }
}

async function entrar(req, res, next) {
  try {
    const { email, senha, perfil } = req.body;
    if (!email || !senha || !perfil) return res.status(400).json({ erro: 'Informe e-mail, senha e tipo de conta.' });
    if (!['cliente', 'administrador'].includes(perfil)) return res.status(400).json({ erro: 'Tipo de conta inválido.' });
    const usuario = await Usuario.buscarPorEmail(String(email).trim());
    if (!usuario || usuario.perfil !== perfil || !(await bcrypt.compare(senha, usuario.senha_hash))) {
      return res.status(401).json({ erro: 'E-mail, senha ou tipo de conta incorretos.' });
    }
    const { senha_hash, ...dadosPublicos } = usuario;
    return res.json({ mensagem: 'Login realizado com sucesso.', usuario: dadosPublicos, token: tokenDo(usuario) });
  } catch (erro) { next(erro); }
}

module.exports = { cadastrar, entrar };
