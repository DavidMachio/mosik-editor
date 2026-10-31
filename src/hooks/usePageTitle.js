import { useEffect } from 'react';

// Cambia el título de la pestaña al entrar en una página.
export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
