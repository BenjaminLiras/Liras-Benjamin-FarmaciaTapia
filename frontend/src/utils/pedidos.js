const claveCarrito = 'farmacia-tapia-carrito';

export const moneda = new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS' });

export function generarClave() {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, '0')).join('');
}

export function leerCarrito() {
  try {
    const datos = JSON.parse(localStorage.getItem(claveCarrito));
    if (Array.isArray(datos?.items) && /^[a-f0-9]{32}$/.test(datos.referencia)) return datos;
  } catch {
    // Un carrito local ilegible inicia vacío.
  }
  return { items: [], referencia: generarClave() };
}

export function guardarCarrito(items) {
  const datos = { items, referencia: generarClave() };
  localStorage.setItem(claveCarrito, JSON.stringify(datos));
  return datos;
}

export function precioEnCentavos(precio) {
  return Math.round(precio * 100);
}
