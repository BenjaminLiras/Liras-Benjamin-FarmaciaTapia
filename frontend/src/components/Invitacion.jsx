import React from 'react';
import { telefono } from './Layout.jsx';

export default function Invitacion() {
  return <section className="container invitacion"><div className="invitacion-contenido"><div><h2>¿Necesitás algo puntual? Llamanos.</h2><p>Reservá o consultá disponibilidad por teléfono. Te lo dejamos preparado para que solo pases a retirarlo.</p></div><div className="acciones"><a className="boton" href={telefono}>011 4709-6085</a><a className="boton secundario" href="/contacto">Cómo llegar</a></div></div><div className="horarios"><span>Lun–Vie 9:30 a 19:30</span><span>Sábados 9:00 a 13:00</span><span>Laprida 4255</span></div></section>;
}
