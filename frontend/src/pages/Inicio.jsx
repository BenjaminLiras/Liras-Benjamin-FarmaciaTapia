import React from 'react';
import Foto from '../components/Foto.jsx';
import Invitacion from '../components/Invitacion.jsx';
import { telefono } from '../components/Layout.jsx';

const valores = [
  ['♡', 'Atención familiar', 'Te conocemos por tu nombre. Detrás del mostrador siempre hay alguien dispuesto a escuchar.'],
  ['✓', 'Consejo profesional', 'Te orientamos con seriedad sobre tus medicamentos, dosis y alternativas.'],
  ['♧', 'Barrio de siempre', 'Un rincón de Laprida 4255 pensado para acompañar a adultos y familias del barrio.'],
];

export default function Inicio() {
  return <>
    <section className="fondo-suave"><div className="container hero-inicio dos-columnas">
      <div><p className="eyebrow">Desde el barrio · Villa del Parque</p><h1>Tu farmacia de <em>confianza</em>, con la atención de siempre.</h1><p className="intro">En Farmacia Tapia te recibimos como en casa. Medicamentos, perfumería y consejo profesional, atendidos personalmente por nuestra familia.</p><div className="acciones"><a className="boton" href="/productos">Ver productos</a><a className="boton secundario" href={telefono}>Hacé tu pedido</a></div><dl className="datos-hero"><div><dt>Dirección</dt><dd>Laprida 4255</dd></div><div><dt>Semana</dt><dd>9:30 – 19:30</dd></div><div><dt>Sábado</dt><dd>9:00 – 13:00</dd></div></dl></div>
      <div className="foto-con-etiqueta"><Foto tipo="interior" descripcion="Interior de la farmacia con estanterías de madera y detalles en verde agua" /><div className="etiqueta"><span className="cruz" aria-hidden="true">✚</span><div><small>ATENCIÓN</small><br />Personal y cercana</div></div></div>
    </div></section>
    <section className="container seccion"><p className="eyebrow">Por qué elegirnos</p><h2 className="titulo-limitado">Cuidamos a nuestros vecinos hace décadas.</h2><div className="tarjetas tres">{valores.map(([icono,titulo,texto]) => <article className="tarjeta" key={titulo}><span className="icono" aria-hidden="true">{icono}</span><h3>{titulo}</h3><p>{texto}</p></article>)}</div></section>
    <section className="fondo-menta"><div className="container seccion"><div className="encabezado"><div><p className="eyebrow">Nuestro mostrador</p><h2 className="titulo-limitado">Lo que la gente del barrio nos pide.</h2></div><a className="boton secundario" href="/productos">Ver todos los productos</a></div><div className="tarjetas cuatro">{['Analgésicos','Antigripales','Perfumería','Cuidado adulto'].map(nombre => <a className="tarjeta" key={nombre} href={'/productos?categoria='+encodeURIComponent(nombre)}><span className="icono" aria-hidden="true">◇</span><h3>{nombre}</h3><p>Ver productos disponibles →</p></a>)}</div></div></section>
    <section className="container seccion dos-columnas"><Foto tipo="farmaceutico" descripcion="Farmacéutico atendiendo a una vecina en el mostrador" /><div><p className="eyebrow">Nosotros</p><h2>Una farmacia hecha de vecinos.</h2><p>Farmacia Tapia es un pequeño local de barrio con estanterías de madera, paredes blancas y detalles en verde agua. Un lugar donde el remedio viene acompañado de una charla y una sonrisa.</p><a className="enlace" href="/nosotros">Conocé nuestra historia →</a></div></section>
    <Invitacion />
  </>;
}
