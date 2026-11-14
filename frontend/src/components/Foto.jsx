import React from 'react';

// Las capturas originales se encuadran con CSS para reutilizar sus fotografías.
export default function Foto({ tipo, descripcion }) {
  return <div className={'foto foto-' + tipo} role="img" aria-label={descripcion} />;
}
