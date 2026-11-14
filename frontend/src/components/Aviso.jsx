import React from 'react';

export default function Aviso({ aviso }) {
  return (
    <>
      <div role="status">{aviso?.tipo === 'exito' && <p className="aviso exito">{aviso.mensaje}</p>}</div>
      <div role="alert">{aviso?.tipo === 'error' && <p className="aviso error">{aviso.mensaje}</p>}</div>
    </>
  );
}
