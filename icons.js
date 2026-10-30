/* Ícones SVG dos componentes, indexados pelo campo "t" de cada produto. */
const svg = (corpo) => `<svg viewBox="0 0 96 96" fill="none" stroke="#f7faf9" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${corpo}</svg>`;
const ICONES = {
res:svg('<path d="M4 48h18M74 48h18"/><rect x="22" y="36" width="52" height="24" rx="10" fill="#c9a77a" stroke="none"/><path d="M34 36v24M46 36v24M58 36v24" stroke="#b8602a" stroke-width="5"/>'),
cap:svg('<rect x="30" y="14" width="36" height="58" rx="6" fill="#1d3a6b" stroke="none"/><path d="M36 14v58" stroke="#f7faf9" stroke-width="6"/><path d="M40 72v18M58 72v18"/>'),
cer:svg('<circle cx="48" cy="40" r="22" fill="#c9a77a" stroke="none"/><path d="M40 60v28M56 60v28"/>'),
led:svg('<path d="M32 64V34a16 16 0 0132 0v30z" fill="#e0443a" stroke="none"/><path d="M26 64h44M40 64v26M56 64v22"/>'),
to92:svg('<path d="M28 20h40v26a20 20 0 01-40 0z" fill="#222" stroke="none"/><path d="M36 60v28M48 60v28M60 60v28"/>'),
reg:svg('<rect x="26" y="14" width="44" height="40" rx="3" fill="#222" stroke="none"/><rect x="26" y="14" width="44" height="12" fill="#999" stroke="none"/><path d="M36 54v34M48 54v34M60 54v34"/>'),
ic:svg('<rect x="26" y="20" width="44" height="56" rx="3" fill="#222" stroke="none"/><path d="M18 30h8M18 42h8M18 54h8M18 66h8M70 30h8M70 42h8M70 54h8M70 66h8"/><circle cx="36" cy="30" r="3" fill="#f7faf9" stroke="none"/>'),
mod:svg('<rect x="22" y="12" width="52" height="72" rx="4" fill="#222" stroke="none"/><rect x="30" y="18" width="36" height="22" fill="#999" stroke="none"/><path d="M14 24h8M14 38h8M14 52h8M14 66h8M74 24h8M74 38h8M74 52h8M74 66h8"/>'),
sen:svg('<rect x="28" y="12" width="40" height="52" rx="4" fill="#f7faf9" stroke="none"/><path d="M36 24h24M36 34h24M36 44h24" stroke="#0f4d3a"/><path d="M36 64v24M48 64v24M60 64v24"/>'),
pb:svg('<rect x="12" y="22" width="72" height="52" rx="3" fill="#f7faf9" stroke="none"/><path d="M20 38h56M20 58h56" stroke="#0f4d3a" stroke-dasharray="2 6"/>'),
mm:svg('<rect x="26" y="10" width="44" height="76" rx="6" fill="#d8a82a" stroke="none"/><rect x="32" y="16" width="32" height="16" fill="#222" stroke="none"/><circle cx="48" cy="58" r="14" fill="#222" stroke="none"/>')
};
