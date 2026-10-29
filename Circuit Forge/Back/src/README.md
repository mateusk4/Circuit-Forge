# Back – API da loja (Express + PostgreSQL, MVC)

## Como rodar
1. No pgAdmin, crie um banco chamado `bancada` (botão direito em *Databases* > *Create*).
2. Abra o *Query Tool* nesse banco, cole o conteúdo de `sql/schema.sql` e execute. Isso cria a tabela `produtos` e carrega os 12 itens de exemplo.
3. Copie `.env.example` para `.env` e preencha usuário e senha do seu PostgreSQL.
4. `npm install` e depois `npm run dev`.

## Estrutura (MVC)
- `src/models/` – acesso ao banco (SQL)
- `src/controllers/` – validação e respostas HTTP
- `src/routes/` – mapa das URLs
- `src/config/db.js` – conexão com o PostgreSQL

## Endpoints (CRUD)
| Método | Rota | Ação |
|---|---|---|
| GET | `/api/produtos?categoria=Passivos&q=led` | Listar (filtros opcionais) |
| GET | `/api/produtos/:id` | Buscar um |
| POST | `/api/produtos` | Criar |
| PUT | `/api/produtos/:id` | Atualizar |
| DELETE | `/api/produtos/:id` | Remover |

Corpo de POST/PUT:
```json
{ "nome": "Diodo 1N4007", "categoria": "Semicondutores", "tipo": "led",
  "preco": 0.25, "estoque": 500, "especificacoes": { "Corrente": "1A" } }
```
