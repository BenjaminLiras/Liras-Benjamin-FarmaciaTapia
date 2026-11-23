export default class Pedido {
  constructor(id, cliente, detalles, referencia) {
    this.id = id;
    this.fecha = new Date().toISOString();
    this.estado = 'confirmado';
    this.cliente = cliente;
    this.detalles = detalles;
    this.referencia = referencia;
    this.total = detalles.reduce((centavos, detalle) => centavos + Math.round(detalle.subtotal * 100), 0) / 100;
  }
}
