import { solicitar } from './api.js';
import { generarClave } from '../utils/pedidos.js';

function claveDelNavegador() {
  const nombre = 'farmacia-tapia-pedidos';
  const anterior = localStorage.getItem(nombre);
  if (anterior && /^[a-f0-9]{32}$/.test(anterior)) return anterior;
  const clave = generarClave();
  localStorage.setItem(nombre, clave);
  return clave;
}

export async function listarPedidos() {
  return solicitar('/pedidos', { clave: claveDelNavegador() });
}

export async function confirmarPedido(datos) {
  return solicitar('/pedidos', { method: 'POST', datos, clave: claveDelNavegador() });
}

export async function cancelarPedido(id) {
  return solicitar('/pedidos/' + encodeURIComponent(id) + '/cancelacion', {
    method: 'PATCH',
    clave: claveDelNavegador(),
  });
}
