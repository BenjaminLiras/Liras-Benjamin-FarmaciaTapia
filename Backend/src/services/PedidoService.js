import { createHash, randomUUID } from 'node:crypto';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../exceptions/AppError.js';
import DetallePedido from '../models/DetallePedido.js';
import Pedido from '../models/Pedido.js';
import pedidos from '../repositories/PedidoRepository.js';
import productos from '../repositories/ProductoRepository.js';

const esClave = valor => typeof valor === 'string' && /^[a-f0-9]{32}$/.test(valor);

function obtenerTitular(autorizacion) {
  const clave = autorizacion?.match(/^Bearer ([a-f0-9]{32})$/)?.[1];
  if (!clave) throw new UnauthorizedError('Falta una clave de acceso válida para consultar o gestionar tus pedidos.');
  return createHash('sha256').update(clave).digest('hex');
}

function paraCliente({ titular, referencia, ...pedido }) {
  return pedido;
}

function validarCliente(cliente) {
  const nombre = typeof cliente?.nombre === 'string' ? cliente.nombre.trim() : '';
  const telefono = typeof cliente?.telefono === 'string' ? cliente.telefono.trim() : '';
  if (nombre.length < 2 || nombre.length > 80) {
    throw new BadRequestError('Ingresá un nombre de entre 2 y 80 caracteres.');
  }
  const digitos = telefono.replace(/\D/g, '');
  if (!/^\+?[0-9 ()-]{7,25}$/.test(telefono) || digitos.length < 7 || digitos.length > 15) {
    throw new BadRequestError('Ingresá un teléfono válido de entre 7 y 15 dígitos.');
  }
  return { nombre, telefono };
}

class PedidoService {
  listar(autorizacion) {
    return pedidos.findAll(obtenerTitular(autorizacion)).reverse().map(paraCliente);
  }

  crear(autorizacion, datos) {
    const titular = obtenerTitular(autorizacion);
    const { referencia, items, cliente } = datos ?? {};
    if (!esClave(referencia)) throw new BadRequestError('La referencia del pedido es inválida.');
    const existente = pedidos.findAll(titular).find(pedido => pedido.referencia === referencia);
    if (existente) return paraCliente(existente);

    const contacto = validarCliente(cliente);
    if (!Array.isArray(items) || items.length < 1 || items.length > 100) {
      throw new BadRequestError('El pedido debe contener entre 1 y 100 productos distintos.');
    }

    const cantidades = new Map();
    const detalles = items.map(item => {
      const { productoId, cantidad, precioUnitario } = item ?? {};
      if (!Number.isSafeInteger(productoId) || productoId < 1 || !Number.isSafeInteger(cantidad) || cantidad < 1) {
        throw new BadRequestError('Seleccioná un producto válido y una cantidad entera mayor que cero.');
      }
      if (cantidades.has(productoId)) throw new BadRequestError('Cada producto debe figurar una sola vez en el pedido.');
      const producto = productos.findById(productoId);
      if (!producto) throw new NotFoundError('Un producto del carrito ya no está disponible.');
      if (cantidad > producto.stock) {
        throw new ConflictError(`Stock insuficiente para ${producto.nombre}. Disponible: ${producto.stock}.`);
      }
      const detalle = new DetallePedido(producto, cantidad);
      if (precioUnitario !== undefined && precioUnitario !== detalle.precioUnitario) {
        throw new ConflictError(`Cambió el precio de ${producto.nombre}. Revisá el carrito antes de confirmar.`);
      }
      cantidades.set(productoId, cantidad);
      return detalle;
    });

    const pedido = new Pedido(randomUUID(), contacto, detalles, referencia);
    if (!Number.isSafeInteger(Math.round(pedido.total * 100))) {
      throw new BadRequestError('El total del pedido supera el importe permitido.');
    }
    const inventario = productos.findAll().map(producto => cantidades.has(producto.id)
      ? { ...producto, stock: producto.stock - cantidades.get(producto.id) }
      : producto);
    return paraCliente(pedidos.crear(titular, pedido, inventario));
  }

  cancelar(autorizacion, id) {
    const pedido = pedidos.findAll(obtenerTitular(autorizacion)).find(item => item.id === id);
    if (!pedido) throw new NotFoundError('No encontramos el pedido.');
    if (pedido.estado === 'cancelado') return paraCliente(pedido);

    const cantidades = new Map(pedido.detalles.map(detalle => [detalle.productoId, detalle.cantidad]));
    const inventario = productos.findAll().map(producto => {
      if (!cantidades.has(producto.id)) return producto;
      const stock = producto.stock + cantidades.get(producto.id);
      if (!Number.isSafeInteger(stock)) throw new ConflictError('No se pudo devolver la cantidad reservada al stock.');
      return { ...producto, stock };
    });
    return paraCliente(pedidos.actualizar({ ...pedido, estado: 'cancelado' }, inventario));
  }
}

export default new PedidoService();
