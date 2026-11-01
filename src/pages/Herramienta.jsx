import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';
import { request } from '../lib/api.js';
import { toEditorDesign } from '../lib/designs.js';
import usePageTitle from '../hooks/usePageTitle.js';
import Icon from '../components/Icon.jsx';
import SaveDesignDialog from '../components/SaveDesignDialog.jsx';
import EditorMarkup from './herramienta/EditorMarkup.jsx';
import { initEditor } from './herramienta/initEditor.js';
import { initTabs } from './herramienta/initTabs.js';
import './herramienta/editor.css';
import './herramienta/editor-layout.css';
import './Herramienta.css';

const DRAFT_KEY = 'mosik-draft';

export default function Herramienta() {
  usePageTitle('Herramienta de diseño · Mosik Beads');
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const designId = params.get('diseno');

  const rootRef = useRef(null);
  const editorRef = useRef(null); // { destroy, exportDesign, importDesign }
  const loadedRef = useRef(null); // id del diseño que ya está cargado en el editor
  const [current, setCurrent] = useState(null); // diseño abierto: { ...ficha, isMine }
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notice, setNotice] = useState(null); // { text, error?, link? }
  const [stripOpen, setStripOpen] = useState(false); // móvil: tira de iconos desplegada con la hamburguesa
  // El marcado del editor no cambia nunca: se pinta una sola vez para que React no deshaga lo que hace el editor sobre el DOM.
  const markup = useMemo(() => <EditorMarkup />, []);

  // En móvil la herramienta ocupa toda la pantalla: la cabecera de la web queda reducida al logo (ver Layout.css).
  useEffect(() => {
    document.body.classList.add('is-tool');
    return () => document.body.classList.remove('is-tool');
  }, []);

  // Al plegar la tira también se pliega la hoja de ajustes.
  const firstStrip = useRef(true);
  useEffect(() => {
    if (firstStrip.current) { firstStrip.current = false; return; }
    if (stripOpen) return;
    const tool = rootRef.current && rootRef.current.querySelector('.tool');
    if (tool) tool.dataset.sheet = 'closed';
  }, [stripOpen]);

  // El editor y las pestañas trabajan sobre el DOM que acaba de pintar EditorMarkup.
  useEffect(() => {
    const editor = initEditor();
    editorRef.current = editor;
    const stopTabs = initTabs(rootRef.current);
    return () => { editor.destroy(); stopTabs(); editorRef.current = null; };
  }, []);

  // Abrir un diseño guardado: /herramienta?diseno=ID
  useEffect(() => {
    if (!designId || loading || loadedRef.current === designId) return undefined;
    let cancelled = false;
    request(`/api/designs/${designId}`)
      .then(({ design }) => {
        if (cancelled || !editorRef.current) return;
        editorRef.current.importDesign(toEditorDesign(design.data));
        loadedRef.current = designId;
        setCurrent({ ...design, isMine: Boolean(user) && design.ownerId === user.id });
        setNotice(null);
      })
      .catch((err) => !cancelled && setNotice({ text: err.message, error: true }));
    return () => { cancelled = true; };
  }, [designId, loading, user]);

  // Recuperar el diseño que se estaba haciendo antes de ir a iniciar sesión
  useEffect(() => {
    if (designId || loading || !user || !editorRef.current) return;
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      localStorage.removeItem(DRAFT_KEY);
      const draft = JSON.parse(raw);
      if (Array.isArray(draft?.data?.grid)) {
        editorRef.current.importDesign(draft.data);
        setNotice({ text: 'Hemos recuperado tu diseño. Ya puedes guardarlo.' });
      }
    } catch { /* borrador ilegible: se ignora */ }
  }, [designId, loading, user]);

  // Valores iniciales del diálogo: los del diseño si es tuyo; una copia si es de otra persona
  const initial = useMemo(() => {
    if (!current) return null;
    if (current.isMine) return current;
    return { title: `${current.title} (copia)`.slice(0, 80), description: '', tags: current.tags, isPublic: false };
  }, [current]);

  function onSaveClick() {
    const { data, beads } = editorRef.current.exportDesign();
    if (!beads) {
      setNotice({ text: 'Pinta alguna cuenta antes de guardar el diseño.', error: true });
      return;
    }
    if (!user) {
      let saved = true;
      try { localStorage.setItem(DRAFT_KEY, JSON.stringify({ data, savedAt: Date.now() })); } catch { saved = false; }
      navigate('/entrar', { state: { from: '/herramienta', draft: saved } });
      return;
    }
    setNotice(null);
    setDialogOpen(true);
  }

  async function onSave(values) {
    const { data, preview } = editorRef.current.exportDesign();
    const body = { title: values.title, description: values.description, tags: values.tags, isPublic: values.isPublic, data, preview };
    const updating = Boolean(current?.isMine);
    const { design } = updating
      ? await request(`/api/designs/${current.id}`, { method: 'PATCH', body })
      : await request('/api/designs', { method: 'POST', body });

    loadedRef.current = design.id;
    setCurrent({ ...design, isMine: true });
    setDialogOpen(false);
    setNotice({ text: updating ? 'Cambios guardados.' : 'Diseño guardado en tu perfil.', link: { to: '/perfil', label: 'Ver mis diseños' } });
    if (designId !== design.id) navigate(`/herramienta?diseno=${design.id}`, { replace: true });
  }

  return (
    <div className="container tool-page">
      <div className="tool-page__head">
        <button
          type="button"
          className="tool-page__menu"
          aria-label={stripOpen ? 'Ocultar herramientas' : 'Mostrar herramientas'}
          aria-expanded={stripOpen}
          aria-controls="tool-strip"
          onClick={() => setStripOpen((v) => !v)}
        >
          <Icon name={stripOpen ? 'cerrar' : 'menu'} size={22} />
        </button>
        <div className="tool-page__titles">
          <h1>Herramienta de diseño</h1>
          <p className="muted">Versión de prueba · los colores son aproximados.</p>
        </div>
        <div className="tool-page__actions">
          {current && <span className="tool-page__current muted" title={current.title}>{current.title}</span>}
          <button type="button" className="btn btn--small" onClick={onSaveClick} disabled={loading}>
            <Icon name="guardar-cuenta" size={18} />
            <span className="tool-page__savelong">{current?.isMine ? 'Guardar cambios' : 'Guardar en mi perfil'}</span>
            <span className="tool-page__saveshort">Guardar</span>
          </button>
        </div>
      </div>

      <div className="tool-page__notices" role="status" aria-live="polite">
        {notice && (
          <p className={notice.error ? 'tool-page__notice tool-page__notice--error' : 'tool-page__notice'}>
            {notice.text} {notice.link && <Link to={notice.link.to}>{notice.link.label}</Link>}
          </p>
        )}
        {current && !current.isMine && (
          <p className="tool-page__notice">
            Abierto desde «{current.title}» de @{current.ownerUsername}. Al guardar se creará una copia tuya.
          </p>
        )}
      </div>

      <div className="mk-editor" ref={rootRef} data-strip={stripOpen ? 'open' : 'closed'}>
        {markup}
      </div>

      <SaveDesignDialog open={dialogOpen} initial={initial} editing={Boolean(current?.isMine)}
        onCancel={() => setDialogOpen(false)} onSave={onSave} />
    </div>
  );
}
