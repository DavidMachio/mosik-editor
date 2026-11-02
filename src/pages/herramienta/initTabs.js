// Pestañas del panel de la herramienta. Trabaja sobre el DOM (igual que initEditor) para no volver a pintar el editor.
// En móvil el panel es una hoja inferior: pulsar la pestaña activa la pliega o la despliega.
export function initTabs(root) {
  const tool = root.querySelector('.tool');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const mq = window.matchMedia('(max-width: 900px)');
  if (!tool || !tabs.length) return () => {};

  // En móvil los iconos de ajustes (Tablero, Paleta, Gamas, Descargar) van en la misma tira que las herramientas.
  // Se mueve el DOM a mano porque el marcado es estático: React nunca lo vuelve a pintar.
  const strip = root.querySelector('.tool__bar');
  const side = root.querySelector('.tool__side');
  const list = root.querySelector('[role="tablist"]');
  const topbar = root.querySelector('#tool-topbar');
  const saveBtn = root.querySelector('#savebtn');
  const closeBtn = root.querySelector('.sheet__close');
  function placeList() {
    if (!strip || !side || !list) return;
    if (mq.matches) {
      if (list.parentElement !== strip) strip.appendChild(list);
    } else if (topbar) {
      if (list.parentElement !== topbar) topbar.insertBefore(list, saveBtn);
    } else if (list.parentElement !== side) {
      side.insertBefore(list, side.querySelector('.tabpanel'));
    }
  }
  // En escritorio las capas por color viven en un panel izquierdo propio; en móvil vuelven a la pestaña Paleta.
  const layers = root.querySelector('#tool-layers');
  const capas = root.querySelector('#sec-capas');
  const palPanel = root.querySelector('#tp-paleta');
  const grupos = root.querySelector('#sec-grupos');
  const tabPanel = root.querySelector('#tp-tablero');
  function placeLayers() {
    if (!layers || !capas || !palPanel) return;
    if (mq.matches) {
      if (capas.parentElement !== palPanel) palPanel.appendChild(capas);
      if (grupos && tabPanel && grupos.parentElement !== tabPanel) tabPanel.insertBefore(grupos, tabPanel.firstChild);
    } else {
      if (grupos && grupos.parentElement !== layers) layers.insertBefore(grupos, layers.firstChild);
      if (capas.parentElement !== layers) layers.appendChild(capas);
    }
  }
  placeLayers();
  placeList();
  // Escritorio: el panel de capas se muestra u oculta con su botón del raíl; los ajustes empiezan abiertos en la Paleta.
  const layersBtn = root.querySelector('#layersbtn');
  function onLayers() {
    const open = tool.dataset.layers !== 'closed';
    tool.dataset.layers = open ? 'closed' : 'open';
    layersBtn.setAttribute('aria-pressed', String(!open));
    layersBtn.classList.toggle('on', !open);
  }
  if (layersBtn) { layersBtn.classList.add('on'); layersBtn.addEventListener('click', onLayers); }
  const beadBtn = root.querySelector('#beadmenu');
  const onBead = () => window.dispatchEvent(new Event('mosik:menu'));
  if (beadBtn) beadBtn.addEventListener('click', onBead);
  // En móvil el dibujo ocupa toda la pantalla: los ajustes empiezan cerrados.
  if (mq.matches) tool.dataset.sheet = 'closed';
  function onMq() {
    placeList();
    placeLayers();
    tool.dataset.sheet = mq.matches ? 'closed' : 'open';
    syncExpanded();
  }
  function onClose() {
    tool.dataset.sheet = 'closed';
    syncExpanded();
  }
  if (closeBtn) closeBtn.addEventListener('click', onClose);

  const panelOf = (tab) => root.querySelector('#' + tab.getAttribute('aria-controls'));

  function select(tab) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      panelOf(t).hidden = !on;
    });
  }

  function syncExpanded() {
    tabs.forEach((t) => {
      t.setAttribute('aria-expanded', String(tool.dataset.sheet !== 'closed' && t.getAttribute('aria-selected') === 'true'));
    });
  }

  function onClick(e) {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const alreadySelected = tab.getAttribute('aria-selected') === 'true';
    if (alreadySelected) {
      tool.dataset.sheet = tool.dataset.sheet === 'closed' ? 'open' : 'closed';
    } else {
      select(tab);
      tool.dataset.sheet = 'open';
    }
    syncExpanded();
  }

  function onKeyDown(e) {
    const i = tabs.indexOf(e.target.closest('[role="tab"]'));
    if (i < 0) return;
    let next = null;
    if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
    else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
    else if (e.key === 'Home') next = tabs[0];
    else if (e.key === 'End') next = tabs[tabs.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next);
    next.focus();
    tool.dataset.sheet = 'open';
    syncExpanded();
  }

  list.addEventListener('click', onClick);
  list.addEventListener('keydown', onKeyDown);
  mq.addEventListener('change', onMq);
  if (!mq.matches) select(root.querySelector('#tab-paleta'));
  syncExpanded();

  return () => {
    list.removeEventListener('click', onClick);
    list.removeEventListener('keydown', onKeyDown);
    mq.removeEventListener('change', onMq);
    if (layersBtn) layersBtn.removeEventListener('click', onLayers);
    if (beadBtn) beadBtn.removeEventListener('click', onBead);
    if (closeBtn) closeBtn.removeEventListener('click', onClose);
    if (palPanel && capas && capas.parentElement !== palPanel) palPanel.appendChild(capas);
    if (grupos && tabPanel && grupos.parentElement !== tabPanel) tabPanel.insertBefore(grupos, tabPanel.firstChild);
    if (topbar && list && list.parentElement !== topbar) topbar.insertBefore(list, saveBtn);
  };
}
