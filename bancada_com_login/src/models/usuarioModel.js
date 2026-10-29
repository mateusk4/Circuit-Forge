const db = require('../config/db');

async function buscarPorEmail(email) {
  const { rows } = await db.query(
    'SELECT id, nome, email, senha_hash, perfil FROM usuarios WHERE LOWER(email) = LOWER($1) LIMIT 1',
    [email]
  );
  return rows[0] || null;
}

async function criar({ nome, email, senhaHash, perfil }) {
  const { rows } = await db.query(
    `INSERT INTO usuarios (nome, email, senha_hash, perfil)
     VALUES ($1, LOWER($2), $3, $4)
     RETURNING id, nome, email, perfil, criado_em`,
    [nome, email, senhaHash, perfil]
  );
  return rows[0];
}

module.exports = { buscarPorEmail, criar };
