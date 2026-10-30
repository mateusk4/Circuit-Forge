-- Execute no Query Tool do pgAdmin, conectado ao banco bancada.
-- Esta tabela é independente da tabela produtos já existente.
CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL UNIQUE,
  senha_hash TEXT NOT NULL,
  perfil VARCHAR(20) NOT NULL CHECK (perfil IN ('cliente', 'administrador')),
  criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_usuarios_email ON usuarios (LOWER(email));
