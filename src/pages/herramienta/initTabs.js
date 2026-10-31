// Pestañas del panel de la herramienta. Trabaja sobre el DOM (igual que initEditor) para no volver a pintar el editor.
// En móvil el panel es una hoja inferior: pulsar la pestaña activa la pliega o la despliega.
export function initTabs(root) {
  const tool = root.querySelector('.tool');
  const tabs = [...root.querySelectorAll('[role="tab"]')];
  const mq = window.matchMedia('(max-width: 900px)');
  if (!tool || !tabs.length) return () => {};

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
      if (mq.matches) t.setAttribute('aria-expanded', String(tool.dataset.sheet !== 'closed' && t.getAttribute('aria-selected') === 'true'));
      else t.removeAttribute('aria-expanded');
    });
  }

  function onClick(e) {
    const tab = e.target.closest('[role="tab"]');
    if (!tab) return;
    const alreadySelected = tab.getAttribute('aria-selected') === 'true';
    if (mq.matches && alreadySelected) {
      tool.dataset.sheet = tool.dataset.sheet === 'closed' ? 'open' : 'closed';
    } else {
      select(tab);
      if (mq.matches) tool.dataset.sheet = 'open';
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
    if (mq.matches) tool.dataset.sheet = 'open';
    syncExpanded();
  }

  const list = root.querySelector('[role="tablist"]');
  list.addEventListener('click', onClick);
  list.addEventListener('keydown', onKeyDown);
  mq.addEventListener('change', syncExpanded);
  syncExpanded();

  return () => {
    list.removeEventListener('click', onClick);
    list.removeEventListener('keydown', onKeyDown);
    mq.removeEventListener('change', syncExpanded);
  };
}
