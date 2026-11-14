const ruta = '/api/productos';

async function solicitar(method, id, datos) {
  const url = id == null ? ruta : ruta + '/' + encodeURIComponent(id);
  let respuesta;
  try {
    respuesta = await fetch(url, {
      method,
      headers: datos ? { 'Content-Type': 'application/json' } : undefined,
      body: datos ? JSON.stringify(datos) : undefined,
    });
  } catch {
    throw new Error('No se pudo conectar con la API.');
  }
  if (respuesta.status === 204 && method === 'DELETE') return;
  const resultado = await respuesta.json().catch(() => null);
  if (!respuesta.ok || resultado?.success !== true) {
    throw new Error(resultado?.message || 'La API no pudo completar la operación.');
  }
  return resultado.data;
}

export const listar = () => solicitar('GET');
export const crear = datos => solicitar('POST', null, datos);
export const editar = (id, datos) => solicitar('PUT', id, datos);
export const eliminar = id => solicitar('DELETE', id);
