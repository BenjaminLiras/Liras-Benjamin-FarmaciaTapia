import React, { useEffect, useRef } from 'react';

export default function Dialogo({ titulo, cerrar, ocupado, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialogo = ref.current;
    dialogo.showModal();
    return () => dialogo.close();
  }, []);

  function cancelar(evento) {
    evento.preventDefault();
    if (!ocupado) cerrar();
  }

  return (
    <dialog ref={ref} aria-labelledby="titulo-dialogo" onCancel={cancelar}>
      <h2 id="titulo-dialogo">{titulo}</h2>
      {children}
    </dialog>
  );
}
