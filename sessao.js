(() => {
  const link = document.getElementById('accountLink');
  if (!link) return;
  try {
    const usuario = JSON.parse(localStorage.getItem('bancada_usuario') || 'null');
    if (usuario) {
      link.textContent = `${usuario.nome} · Sair`;
      link.href = '#';
      link.addEventListener('click', event => {
        event.preventDefault();
        localStorage.removeItem('bancada_token');
        localStorage.removeItem('bancada_usuario');
        window.location.reload();
      });
    }
  } catch { localStorage.removeItem('bancada_usuario'); }
})();
