import { useEffect, useRef } from 'react';
import usePageTitle from '../hooks/usePageTitle.js';
import EditorMarkup from './herramienta/EditorMarkup.jsx';
import { initEditor } from './herramienta/initEditor.js';
import { initTabs } from './herramienta/initTabs.js';
import './herramienta/editor.css';
import './herramienta/editor-layout.css';
import './Herramienta.css';

export default function Herramienta() {
  usePageTitle('Herramienta de diseño · Mosik Beads');
  const rootRef = useRef(null);

  // El editor y las pestañas trabajan sobre el DOM que acaba de pintar EditorMarkup.
  useEffect(() => {
    const stopEditor = initEditor();
    const stopTabs = initTabs(rootRef.current);
    return () => { stopEditor(); stopTabs(); };
  }, []);

  return (
    <div className="container tool-page">
      <div className="tool-page__head">
        <h1>Herramienta de diseño</h1>
        <p className="muted">Versión de prueba · los colores son aproximados.</p>
      </div>
      <div className="mk-editor" ref={rootRef}>
        <EditorMarkup />
      </div>
    </div>
  );
}
