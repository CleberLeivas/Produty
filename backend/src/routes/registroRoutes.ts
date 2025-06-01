import { Router } from 'express';
import RegistroController from '../modules/registros/controller';

const router = Router();

router.post('/', RegistroController.criar.bind(RegistroController));
router.get('/', RegistroController.listar.bind(RegistroController));
router.get('/:id', RegistroController.buscarPorId.bind(RegistroController));
router.put('/:id', RegistroController.atualizar.bind(RegistroController));
router.delete('/:id', RegistroController.remover.bind(RegistroController));

export default router;
