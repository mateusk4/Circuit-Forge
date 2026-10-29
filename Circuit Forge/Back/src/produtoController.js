// CONTROLLER: valida a entrada, chama o model e devolve a resposta HTTP.
const Produto = require("../models/produtoModel");

function validar(corpo) {
  const erros = [];
  const { nome, categoria, tipo, preco, estoque, especificacoes } = corpo;
  if (typeof nome !== "string" || !nome.trim()) erros.push("nome é obrigatório");
  if (typeof categoria !== "string" || !categoria.trim()) erros.push("categoria é obrigatória");
  if (typeof tipo !== "string" || !tipo.trim()) erros.push("tipo é obrigatório");
  if (typeof preco !== "number" || preco < 0) erros.push("preco deve ser um número maior ou igual a 0");
  if (!Number.isInteger(estoque) || estoque < 0) erros.push("estoque deve ser um inteiro maior ou igual a 0");
  if (especificacoes !== undefined && (typeof especificacoes !== "object" || especificacoes === null || Array.isArray(especificacoes)))
    erros.push("especificacoes deve ser um objeto");
  return erros;
}

const idValido = (v) => Number.isInteger(Number(v)) && Number(v) > 0;
const dados = (b) => ({ ...b, nome: b.nome.trim(), especificacoes: b.especificacoes || {} });

async function listar(req, res, next) {
  try {
    const { categoria, q } = req.query;
    res.json(await Produto.listar({ categoria, busca: q }));
  } catch (e) { next(e); }
}

async function buscar(req, res, next) {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: "id inválido" });
    const produto = await Produto.buscarPorId(req.params.id);
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (e) { next(e); }
}

async function criar(req, res, next) {
  try {
    const erros = validar(req.body);
    if (erros.length) return res.status(400).json({ erros });
    res.status(201).json(await Produto.criar(dados(req.body)));
  } catch (e) { next(e); }
}

async function atualizar(req, res, next) {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: "id inválido" });
    const erros = validar(req.body);
    if (erros.length) return res.status(400).json({ erros });
    const produto = await Produto.atualizar(req.params.id, dados(req.body));
    if (!produto) return res.status(404).json({ erro: "Produto não encontrado" });
    res.json(produto);
  } catch (e) { next(e); }
}

async function remover(req, res, next) {
  try {
    if (!idValido(req.params.id)) return res.status(400).json({ erro: "id inválido" });
    const removido = await Produto.remover(req.params.id);
    if (!removido) return res.status(404).json({ erro: "Produto não encontrado" });
    res.status(204).end();
  } catch (e) { next(e); }
}

module.exports = { listar, buscar, criar, atualizar, remover };
