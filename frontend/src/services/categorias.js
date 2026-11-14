export async function listarCategorias() {
  const respuesta = await fetch('/api/categorias');
  const resultado = await respuesta.json();
  if (!respuesta.ok || !resultado.success) throw new Error('No se pudieron cargar las categorías.');
  return resultado.data;
}
