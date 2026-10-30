# Bancada — loja de componentes eletrônicos

Projeto baseado nos arquivos enviados: catálogo de componentes, filtros, carrinho, ícones e API Express/PostgreSQL. Foi adicionada uma área de acesso com cadastro e login de clientes e administradores.

## O que foi acrescentado
- Página `public/acesso.html` com seleção de perfil (Cliente ou Administrador).
- Alternância entre login e cadastro.
- Cadastro de cliente com nome, e-mail e senha.
- Cadastro de administrador protegido por chave privada configurada no servidor.
- Senhas armazenadas com hash bcrypt (não são gravadas em texto puro).
- Login com token JWT e sessão no navegador.
- Rotas de alteração de produtos protegidas para administradores; consulta ao catálogo continua pública.
- Endpoint de exemplo `/api/admin/area`, que valida o perfil administrativo.

## 1. Banco de dados no pgAdmin
1. Abra o pgAdmin e conecte-se ao banco `bancada` (ou ao banco escolhido por você).
2. Abra **Query Tool**.
3. Execute o arquivo `sql/autenticacao.sql`. Ele cria a tabela `usuarios` sem apagar a tabela `produtos` nem os registros existentes.

Se ainda não criou a tabela de produtos, execute também `sql/schema_produtos_original.sql`.

## 2. Configurar o servidor
1. Abra a pasta `bancada_com_login` no Visual Studio Code.
2. Copie `.env.example` para um arquivo chamado `.env`.
3. Preencha `DB_NAME`, `DB_USER`, `DB_PASSWORD` com os dados do PostgreSQL.
4. Troque `JWT_SECRET` por uma chave longa e aleatória.
5. Defina `ADMIN_REGISTRATION_KEY` como uma chave privada que será informada somente aos administradores.

Exemplo de `.env` (use seus próprios valores):

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bancada
DB_USER=postgres
DB_PASSWORD=sua_senha
PORT=3000
JWT_SECRET=uma_chave_longa_e_aleatoria
ADMIN_REGISTRATION_KEY=uma_chave_privada_para_admin
```

**Não compartilhe o arquivo `.env` nem publique suas chaves no GitHub.**

## 3. Instalar e iniciar
No terminal do VS Code, dentro da pasta do projeto:

```bash
npm install
npm start
```

Abra no navegador: `http://localhost:3000`.
- Loja: `http://localhost:3000/`
- Login/cadastro: `http://localhost:3000/acesso.html`
- Verificação do banco: `http://localhost:3000/api/status`

## 4. Como testar
- Selecione **Cliente** > **Criar conta**, preencha os dados e cadastre-se.
- Para administrador, selecione **Administrador** > **Criar conta** e informe a chave `ADMIN_REGISTRATION_KEY` configurada no `.env`.
- Depois use a aba **Entrar** para autenticar com o perfil correspondente.
- A consulta de produtos é pública. Criar, editar e excluir produtos pela API exige login de administrador.

## Rotas de autenticação
| Método | Rota | Função |
|---|---|---|
| POST | `/api/auth/cadastro` | Cadastrar cliente ou administrador |
| POST | `/api/auth/login` | Entrar como cliente ou administrador |
| GET | `/api/minha-conta` | Consultar sessão autenticada |
| GET | `/api/admin/area` | Testar acesso administrativo |

## Observações importantes
- O carrinho original do projeto continua no navegador. O checkout ainda não grava pedidos no banco; a tela avisa que a integração de vendas precisa ser feita.
- O sistema protege as operações de cadastro/edição/exclusão de produtos no backend, mas ainda não foi criada uma tela de painel administrativo para gerenciar pedidos ou clientes.
- O arquivo `.env` não está incluído no pacote por segurança. Crie-o a partir de `.env.example`.
