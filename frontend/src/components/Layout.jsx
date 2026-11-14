import React, { useState, useRef } from 'react';

export const telefono = 'tel:+541147096085';
const enlaces = [['/', 'Inicio'], ['/productos', 'Productos'], ['/nosotros', 'Nosotros'], ['/contacto', 'Contacto']];

export function Marca() {
  return <a className="marca" href="/" aria-label="Farmacia Tapia, inicio"><span className="cruz" aria-hidden="true">✚</span><span>Farmacia Tapia<small>BARRIO · FAMILIA · CUIDADO</small></span></a>;
}

export default function Layout({ ruta, children }) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const botonMenu = useRef(null);

  function cerrarConEscape(evento) {
    if (evento.key === 'Escape' && menuAbierto) {
      setMenuAbierto(false);
      botonMenu.current?.focus();
    }
  }
  return <>
    <a className="salto" href="#contenido">Saltar al contenido</a>
    <header className="cabecera" onKeyDown={cerrarConEscape}><div className="container cabecera-interior">
      <Marca />
      <button ref={botonMenu} className="menu-toggle" type="button" aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuAbierto} aria-controls="menu-principal" onClick={() => setMenuAbierto(!menuAbierto)}>
        <span className="menu-barras" aria-hidden="true"><span /><span /><span /></span>
      </button>
      <nav id="menu-principal" className={menuAbierto ? 'menu-abierto' : ''} aria-label="Navegación principal">{enlaces.map(([url, nombre]) => <a key={url} href={url} aria-current={ruta === url ? 'page' : undefined}>{nombre}</a>)}</nav>
      <a className="boton telefono" href={telefono}>☎ 011 4709-6085</a>
    </div></header>
    <main id="contenido">{children}</main>
    <footer><div className="container pie-grid"><div><Marca /><p>Una farmacia de barrio, atendida por su familia. Estamos para acompañarte con el remedio justo y una charla amable, como toda la vida.</p></div><div><h3>Visítanos</h3><p>Francisco N. de Laprida 4255</p><p>Lun a Vie 9:30 – 19:30<br />Sábados 9:00 – 13:00</p><a href={telefono}>011 4709-6085</a></div><nav aria-label="Navegación del pie"><h3>Navegación</h3>{enlaces.map(([url,nombre]) => <a href={url} key={url}>{nombre}</a>)}</nav></div><div className="pie-base container"><span>© 2026 Farmacia Tapia. Todos los derechos reservados.</span><span>Hecho con cariño para el barrio.</span></div></footer>
  </>;
}
