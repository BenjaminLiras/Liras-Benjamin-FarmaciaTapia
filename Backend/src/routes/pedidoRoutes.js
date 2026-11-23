import { Router } from 'express';
import PedidoController from '../controllers/PedidoController.js';

const router = Router();

router.get('/', PedidoController.listar);
router.post('/', PedidoController.crear);
router.patch('/:id/cancelacion', PedidoController.cancelar);

export default router;
