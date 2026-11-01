import { useEffect } from 'react';

// Aparición al hacer scroll: marca con .is-visible los elementos [data-reveal] la primera vez que se ven.
// Con «reducir movimiento» o sin IntersectionObserver no hace nada y el contenido se ve entero desde el principio.
export default function useReveal(deps = []) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) return undefined;

    const root = document.documentElement;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );
    document.querySelectorAll('[data-reveal]:not(.is-visible)').forEach((el) => io.observe(el));
    root.classList.add('js-reveal');
    return () => {
      io.disconnect();
      root.classList.remove('js-reveal');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
