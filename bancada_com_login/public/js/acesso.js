const form = document.getElementById('authForm');
const feedback = document.getElementById('feedback');
const roleButtons = [...document.querySelectorAll('.role-btn')];
const modeButtons = [...document.querySelectorAll('.mode-btn')];
let perfil = 'cliente';
let modo = 'login';

function atualizarFormulario() {
  const cadastro = modo === 'cadastro';
  document.getElementById('nameField').hidden = !cadastro;
  document.getElementById('adminKeyField').hidden = !(cadastro && perfil === 'administrador');
  document.getElementById('formTitle').textContent = cadastro ? 'Crie sua conta' : 'Acesse sua conta';
  document.getElementById('formSubtitle').textContent = perfil === 'cliente'
    ? (cadastro ? 'Cadastre-se para comprar na Bancada.' : 'Entre para continuar sua experiência na loja.')
    : (cadastro ? 'Cadastro exclusivo para equipe autorizada.' : 'Entre com suas credenciais administrativas.');
  document.getElementById('submitAuth').innerHTML = cadastro ? 'Criar conta <span>→</span>' : 'Entrar na Bancada <span>→</span>';
  document.getElementById('senha').autocomplete = cadastro ? 'new-password' : 'current-password';
  feedback.textContent = '';
  feedback.className = 'feedback';
}

roleButtons.forEach(button => button.addEventListener('click', () => {
  perfil = button.dataset.role;
  roleButtons.forEach(b => { const active = b === button; b.classList.toggle('active', active); b.setAttribute('aria-pressed', String(active)); });
  atualizarFormulario();
}));
modeButtons.forEach(button => button.addEventListener('click', () => {
  modo = button.dataset.mode;
  modeButtons.forEach(b => b.classList.toggle('active', b === button));
  atualizarFormulario();
}));

form.addEventListener('submit', async event => {
  event.preventDefault();
  feedback.textContent = '';
  const botao = document.getElementById('submitAuth');
  const dados = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    senha: document.getElementById('senha').value,
    perfil,
    chaveAdmin: document.getElementById('chaveAdmin').value
  };
  if (modo === 'cadastro' && dados.nome.length < 2) { feedback.textContent = 'Informe seu nome completo.'; return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) { feedback.textContent = 'Informe um e-mail válido.'; return; }
  if (dados.senha.length < 8) { feedback.textContent = 'A senha deve ter pelo menos 8 caracteres.'; return; }
  botao.disabled = true;
  botao.textContent = 'Aguarde...';
  try {
    const resposta = await fetch(`/api/auth/${modo}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(modo === 'cadastro' ? dados : { email: dados.email, senha: dados.senha, perfil })
    });
    const resultado = await resposta.json();
    if (!resposta.ok) throw new Error(resultado.erro || 'Não foi possível concluir a operação.');
    localStorage.setItem('bancada_token', resultado.token);
    localStorage.setItem('bancada_usuario', JSON.stringify(resultado.usuario));
    feedback.textContent = perfil === 'administrador' ? 'Acesso administrativo autorizado. Abrindo a loja...' : 'Tudo certo! Abrindo a loja...';
    feedback.classList.add('success');
    setTimeout(() => { window.location.href = 'index.html'; }, 650);
  } catch (erro) {
    feedback.textContent = erro.message.includes('Failed to fetch')
      ? 'Não foi possível conectar ao servidor. Inicie o projeto com npm start.' : erro.message;
  } finally {
    botao.disabled = false;
    atualizarTextoBotao();
  }
});
function atualizarTextoBotao() {
  const botao = document.getElementById('submitAuth');
  if (!botao.disabled) botao.innerHTML = modo === 'cadastro' ? 'Criar conta <span>→</span>' : 'Entrar na Bancada <span>→</span>';
}

// Se já existir sessão, a página permite voltar para a loja sem novo login.
if (localStorage.getItem('bancada_token')) {
  feedback.textContent = 'Você já possui uma sessão salva. Selecione Entrar para trocar de conta ou volte à loja.';
}
