const express = require("express");
const cors = require("cors");
const produtoRoutes = require("./routes/produtoRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/saude", (req, res) => res.json({ ok: true }));
app.use("/api/produtos", produtoRoutes);

app.use((req, res) => res.status(404).json({ erro: "Rota não encontrada" }));

// Tratamento central de erros (ex.: nome duplicado, banco fora do ar).
app.use((err, req, res, next) => {
  if (err.code === "23505") return res.status(409).json({ erro: "Já existe um produto com esse nome" });
  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor" });
});

module.exports = app;
