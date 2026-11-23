export default class DetallePedido {
  constructor(producto, cantidad) {
    this.productoId = producto.id;
    this.nombre = producto.nombre;
    this.cantidad = cantidad;
    const centavos = Math.round(producto.precio * 100);
    this.precioUnitario = centavos / 100;
    this.subtotal = (centavos * cantidad) / 100;
  }
}
