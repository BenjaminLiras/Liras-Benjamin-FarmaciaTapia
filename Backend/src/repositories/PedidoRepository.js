import { guardarAlmacen, leerAlmacen } from './AlmacenRepository.js';

class PedidoRepository {
  findAll(titular) {
    return leerAlmacen().pedidos.filter(pedido => pedido.titular === titular);
  }

  crear(titular, pedido, productos) {
    const registro = { ...pedido, titular };
    guardarAlmacen({ pedidos: [...leerAlmacen().pedidos, registro], productos });
    return registro;
  }

  actualizar(pedido, productos) {
    guardarAlmacen({
      pedidos: leerAlmacen().pedidos.map(item => item.id === pedido.id ? pedido : item),
      productos,
    });
    return pedido;
  }
}

export default new PedidoRepository();
