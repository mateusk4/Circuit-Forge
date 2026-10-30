require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('./config/db');
const produtoRoutes = require('./routes/produtoRoutes');
const authRoutes = require('./routes/authRoutes');
const { autenticar, somenteAdministrador } = require('./middleware/autenticacao');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('/api/status', async (req, res, next) => {
  try { await db.query('SELECT 1'); res.json({ status: 'ok', banco: 'conectado' }); }
  catch (erro) { next(erro); }
});
app.use('/api/auth', authRoutes);
app.use('/api/produtos', produtoRoutes);
app.get('/api/minha-conta', autenticar, (req, res) => res.json({ usuario: req.usuario }));
app.get('/api/admin/area', autenticar, somenteAdministrador, (req, res) => {
  res.json({ mensagem: 'Acesso administrativo autorizado.', usuario: req.usuario });
});

app.use((erro, req, res, next) => {
  console.error(erro);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

const porta = Number(process.env.PORT) || 3000;
app.listen(porta, () => console.log(`Bancada rodando em http://localhost:${porta}`));
