// MODEL: único lugar que conversa com o banco (SQL parametrizado).
const db = require("../config/db");

const COLUNAS = "id, nome, categoria, tipo, preco::float8 AS preco, estoque, especificacoes";

async function listar({ categoria, busca } = {}) {
  const filtros = [];
  const valores = [];
  if (categoria) {
    valores.push(categoria);
    filtros.push(`categoria = $${valores.length}`);
  }
  if (busca) {
    valores.push(`%${busca}%`);
    filtros.push(`(nome ILIKE $${valores.length} OR categoria ILIKE $${valores.length})`);
  }
  const where = filtros.length ? `WHERE ${filtros.join(" AND ")}` : "";
  const { rows } = await db.query(`SELECT ${COLUNAS} FROM produtos ${where} ORDER BY id`, valores);
  return rows;
}

async function buscarPorId(id) {
  const { rows } = await db.query(`SELECT ${COLUNAS} FROM produtos WHERE id = $1`, [id]);
  return rows[0] || null;
}

async function criar({ nome, categoria, tipo, preco, estoque, especificacoes }) {
  const { rows } = await db.query(
    `INSERT INTO produtos (nome, categoria, tipo, preco, estoque, especificacoes)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING ${COLUNAS}`,
    [nome, categoria, tipo, preco, estoque, especificacoes]
  );
  return rows[0];
}

async function atualizar(id, { nome, categoria, tipo, preco, estoque, especificacoes }) {
  const { rows } = await db.query(
    `UPDATE produtos
        SET nome = $1, categoria = $2, tipo = $3, preco = $4, estoque = $5, especificacoes = $6
      WHERE id = $7 RETURNING ${COLUNAS}`,
    [nome, categoria, tipo, preco, estoque, especificacoes, id]
  );
  return rows[0] || null;
}

async function remover(id) {
  const { rowCount } = await db.query("DELETE FROM produtos WHERE id = $1", [id]);
  return rowCount > 0;
}

module.exports = { listar, buscarPorId, criar, atualizar, remover };
