require("dotenv").config();
const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 3000;

db.query("SELECT 1")
  .then(() => {
    console.log("Banco de dados conectado");
    app.listen(PORT, () => console.log(`API rodando em http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("Falha ao conectar no PostgreSQL. Confira o arquivo .env:", err.message);
    process.exit(1);
  });
