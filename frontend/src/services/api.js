export async function solicitar(ruta, { method = 'GET', datos, clave } = {}) {
  const headers = {};
  if (datos !== undefined) headers['Content-Type'] = 'application/json';
  if (clave) headers.Authorization = 'Bearer ' + clave;

  let respuesta;
  try {
    respuesta = await fetch('/api' + ruta, { method, headers, body: JSON.stringify(datos) });
  } catch {
    throw new Error('No se pudo conectar con la API.');
  }

  if (respuesta.status === 204) return;
  const resultado = await respuesta.json().catch(() => null);
  if (!respuesta.ok || resultado?.success !== true) {
    throw new Error(resultado?.message || 'La API no pudo completar la operación.');
  }
  return resultado.data;
}
