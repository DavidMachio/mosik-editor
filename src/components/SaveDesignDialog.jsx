import { useEffect, useRef, useState } from 'react';
import './SaveDesignDialog.css';

// Diálogo para guardar un diseño en el perfil (nuevo o cambios de uno existente).
export default function SaveDesignDialog({ open, initial, editing, onCancel, onSave }) {
  const ref = useRef(null);
  const [values, setValues] = useState({ title: '', description: '', tags: '', isPublic: false });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (open && !dialog.open) {
      setValues({
        title: initial?.title || '',
        description: initial?.description || '',
        tags: (initial?.tags || []).join(', '),
        isPublic: Boolean(initial?.isPublic),
      });
      setErrors({});
      setFormError('');
      setSending(false);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open, initial]);

  const set = (name) => (e) => setValues((v) => ({ ...v, [name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  async function onSubmit(e) {
    e.preventDefault();
    setErrors({});
    setFormError('');
    setSending(true);
    try {
      await onSave(values);
    } catch (err) {
      setErrors(err.fields || {});
      setFormError(Object.keys(err.fields || {}).length ? '' : err.message);
      setSending(false);
    }
  }

  return (
    <dialog ref={ref} className="save-dialog" onCancel={(e) => { e.preventDefault(); onCancel(); }} aria-labelledby="save-title">
      <form onSubmit={onSubmit} noValidate>
        <h2 id="save-title">{editing ? 'Guardar cambios' : 'Guardar en mi perfil'}</h2>

        <div className="field">
          <label htmlFor="d-title">Título</label>
          <input id="d-title" value={values.title} onChange={set('title')} maxLength={80} required
            aria-invalid={errors.title ? 'true' : undefined} aria-describedby={errors.title ? 'd-title-error' : undefined} />
          {errors.title && <p id="d-title-error" className="field__error" role="alert">{errors.title}</p>}
        </div>

        <div className="field">
          <label htmlFor="d-desc">Descripción <span className="muted">(opcional)</span></label>
          <textarea id="d-desc" rows={3} value={values.description} onChange={set('description')} maxLength={500}
            aria-invalid={errors.description ? 'true' : undefined} />
          {errors.description && <p className="field__error" role="alert">{errors.description}</p>}
        </div>

        <div className="field">
          <label htmlFor="d-tags">Etiquetas <span className="muted">(opcional)</span></label>
          <input id="d-tags" value={values.tags} onChange={set('tags')} aria-describedby="d-tags-hint" />
          <p id="d-tags-hint" className="field__hint">Palabras separadas por comas, hasta 10. Sirven para encontrar el diseño, por ejemplo: halloween, calabaza, fácil.</p>
        </div>

        <label className="save-dialog__check">
          <input type="checkbox" checked={values.isPublic} onChange={set('isPublic')} />
          <span>Visible en la galería para todo el mundo<br /><span className="muted">Si no lo marcas, solo lo ves tú.</span></span>
        </label>

        <p className="auth__error" role="alert" aria-live="assertive">{formError}</p>
        <div className="save-dialog__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
          <button type="submit" className="btn" disabled={sending}>{sending ? 'Guardando…' : 'Guardar'}</button>
        </div>
      </form>
    </dialog>
  );
}
