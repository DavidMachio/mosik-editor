import { useEffect, useRef, useState } from 'react';

// Carga progresiva de una imagen pesada (un GIF):
//  1) no se pide nada hasta que el elemento está a menos de ~600 px de entrar en pantalla (lazy);
//  2) entonces llega la versión pequeña (el tamaño que ocupa en pantalla es el mismo, solo con menos resolución);
//  3) un momento después de entrar de verdad en pantalla se precarga la completa y se cambia sin saltos.
export default function useCargaProgresiva(pequena, completa, retardo = 250) {
  const ref = useRef(null);
  const [src, setSrc] = useState(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) { setSrc(completa); return undefined; }
    let timer;
    const cerca = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSrc((s) => s || pequena); cerca.disconnect(); } }, { rootMargin: '600px 0px' });
    const dentro = new IntersectionObserver(([e]) => {
      clearTimeout(timer);
      if (!e.isIntersecting) return;
      timer = setTimeout(() => {
        const im = new Image();
        im.onload = () => { setSrc(completa); dentro.disconnect(); };
        im.src = completa;
      }, retardo);
    }, { rootMargin: '0px' });
    cerca.observe(el);
    dentro.observe(el);
    return () => { cerca.disconnect(); dentro.disconnect(); clearTimeout(timer); };
  }, [pequena, completa, retardo]);
  return [ref, src];
}
