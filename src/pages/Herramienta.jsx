import { useEffect } from 'react';
import usePageTitle from '../hooks/usePageTitle.js';
import EditorMarkup from './herramienta/EditorMarkup.jsx';
import { initEditor } from './herramienta/initEditor.js';
import './herramienta/editor.css';
import './Herramienta.css';

export default function Herramienta() {
  usePageTitle('Herramienta de diseño · Mosik Beads');

  // El editor trabaja sobre el DOM que acaba de pintar EditorMarkup.
  useEffect(() => initEditor(), []);

  return (
    <div className="container tool-page">
      <h1>Herramienta de diseño</h1>
      <p className="muted tool-page__intro">
        Versión de prueba. Sube una imagen, ponla detrás de la rejilla de cuentas y rellena los
        colores a mano. Los colores son aproximados (medidos de imagen) y solo de una marca de cuentas.
      </p>
      <div className="mk-editor">
        <EditorMarkup />
      </div>
    </div>
  );
}
