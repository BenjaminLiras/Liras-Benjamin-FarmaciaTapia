import { solicitar } from './api.js';

export const listar = () => solicitar('/productos');
export const crear = datos => solicitar('/productos', { method: 'POST', datos });
export const editar = (id, datos) => solicitar('/productos/' + encodeURIComponent(id), { method: 'PUT', datos });
export const eliminar = id => solicitar('/productos/' + encodeURIComponent(id), { method: 'DELETE' });
