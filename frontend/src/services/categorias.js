import { solicitar } from './api.js';

export const listarCategorias = () => solicitar('/categorias');
