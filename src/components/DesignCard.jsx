import { Link } from 'react-router-dom';
import { GAMA_LABELS, previewUrl } from '../lib/designs.js';
import './DesignCard.css';

// Tarjeta de un diseño (galería y perfil). El título enlaza a la ficha y la tarjeta entera es pulsable.
export default function DesignCard({ design, showOwner = true, showVisibility = false, children }) {
  return (
    <article className="design-card">
      <div className="design-card__media">
        <img src={previewUrl(design)} alt="" loading="lazy" style={{ aspectRatio: `${design.cols} / ${design.rows}` }} />
      </div>
      <div className="design-card__body">
        <h3 className="design-card__title">
          <Link to={`/diseno/${design.id}`} className="design-card__link">{design.title}</Link>
        </h3>
        {showOwner && (
          <p className="design-card__meta">
            por <Link to={`/galeria?autor=${encodeURIComponent(design.ownerUsername)}`} className="design-card__owner">@{design.ownerUsername}</Link>
          </p>
        )}
        <p className="design-card__meta">
          {design.cols} × {design.rows} · {design.beads.toLocaleString('es-ES')} cuentas · {design.colors} {design.colors === 1 ? 'color' : 'colores'} · {GAMA_LABELS[design.gama] || design.gama}
        </p>
        {showVisibility && (
          <p className="design-card__meta">
            <span className={design.isPublic ? 'pill pill--public' : 'pill'}>{design.isPublic ? 'Público' : 'Privado'}</span>
          </p>
        )}
        {design.tags.length > 0 && (
          <ul className="design-card__tags" aria-label="Etiquetas">
            {design.tags.map((tag) => (
              <li key={tag}><Link to={`/galeria?etiqueta=${encodeURIComponent(tag)}`}>#{tag}</Link></li>
            ))}
          </ul>
        )}
        {children && <div className="design-card__actions">{children}</div>}
      </div>
    </article>
  );
}
