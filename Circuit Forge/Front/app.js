/* Lógica da loja: estado, renderização e eventos. Depende de data.js e icons.js. */
const $ = (id) => document.getElementById(id);
const brl = (v) => v.toLocaleString("pt-BR", {style:"currency", currency:"BRL"});

/* ----- Estado ----- */
let categoria = "Todos", termo = "", carrinho = {};
const categorias = ["Todos", ...new Set(PRODUTOS.map(p => p.c))];

/* ----- Renderização ----- */
function renderCategorias(){
  $("chips").innerHTML = categorias.map(c =>
    `<button class="chip" aria-pressed="${c===categoria}" data-c="${c}">${c}</button>`).join("");
}

function renderProdutos(){
  const lista = PRODUTOS.filter(p =>
    (categoria==="Todos" || p.c===categoria) && (p.n+p.c).toLowerCase().includes(termo.toLowerCase()));
  $("grid").innerHTML = lista.length ? lista.map(p => `
    <article class="card">
      <div class="art">${ICONES[p.t]}</div>
      <div class="body">
        <div class="name">${p.n}</div>
        <div class="sku mono">REF ${String(p.id).padStart(4,"0")}</div>
        <dl class="specs mono">${Object.entries(p.sp).map(([k,v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("")}</dl>
        <div class="foot">
          <div>
            <div class="price">${brl(p.p)}</div>
            <div class="stock ${p.s<10?"low":""}">${p.s===0?"Sem estoque":p.s<10?"Restam "+p.s:"Em estoque"}</div>
          </div>
          <button class="add" data-id="${p.id}" ${p.s===0?"disabled":""}>Adicionar</button>
        </div>
      </div>
    </article>`).join("")
  : `<div class="empty">Nenhum componente encontrado. Tente outro termo ou categoria.</div>`;
}

function renderCarrinho(){
  const ids = Object.keys(carrinho);
  let soma = 0, qtd = 0;
  $("items").innerHTML = ids.length ? ids.map(id => {
    const p = PRODUTOS.find(x => x.id == id), q = carrinho[id];
    soma += p.p*q; qtd += q;
    return `<div class="it">
      <div><div class="name">${p.n}</div><button class="rm" data-rm="${id}">Remover</button></div>
      <div class="it-price">${brl(p.p*q)}</div>
      <div class="qty">
        <button data-d="-1" data-id="${id}" aria-label="Diminuir">−</button>
        <span class="mono">${q}</span>
        <button data-d="1" data-id="${id}" aria-label="Aumentar">+</button>
      </div></div>`;
  }).join("") : `<p class="empty">Seu carrinho está vazio. Adicione componentes para começar.</p>`;
  $("sum").textContent = brl(soma);
  $("cnt").textContent = qtd;
}

/* ----- Interface ----- */
function aviso(msg){
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(aviso.h);
  aviso.h = setTimeout(() => t.classList.remove("show"), 1800);
}

function painel(aberto){
  $("cart").classList.toggle("open", aberto);
  $("shade").classList.toggle("open", aberto);
  $("cart").setAttribute("aria-hidden", !aberto);
}

/* ----- Eventos ----- */
$("chips").onclick = e => {
  const c = e.target.dataset.c;
  if (c){ categoria = c; renderCategorias(); renderProdutos(); }
};

$("q").oninput = e => { termo = e.target.value; renderProdutos(); };

$("grid").onclick = e => {
  const id = e.target.dataset.id;
  if (!id) return;
  const p = PRODUTOS.find(x => x.id == id);
  carrinho[id] = Math.min((carrinho[id]||0) + 1, p.s);
  renderCarrinho();
  aviso("Adicionado ao carrinho");
};

$("items").onclick = e => {
  const d = e.target.dataset;
  if (d.rm){
    delete carrinho[d.rm];
  } else if (d.d){
    const p = PRODUTOS.find(x => x.id == d.id);
    carrinho[d.id] = Math.min(carrinho[d.id] + +d.d, p.s);
    if (carrinho[d.id] < 1) delete carrinho[d.id];
  }
  renderCarrinho();
};

$("open").onclick = () => painel(true);
$("close").onclick = $("shade").onclick = () => painel(false);
document.addEventListener("keydown", e => { if (e.key==="Escape") painel(false); });

$("buy").onclick = () => {
  if (!Object.keys(carrinho).length){ aviso("Adicione itens antes de finalizar"); return; }
  carrinho = {};
  renderCarrinho();
  painel(false);
  aviso("Pedido enviado");
};

/* ----- Início ----- */
renderCategorias();
renderProdutos();
renderCarrinho();
