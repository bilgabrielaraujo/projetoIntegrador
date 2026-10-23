import express from 'express';
import * as usuarioController from '../controllers/usuarioController.js';
import validade from '../middlewares/validate.js';
import { usuarioCreateSchema, usuarioUpdateSchema } from '../controllers/usuarioController.js'
import authMiddleware from '../middlewares/authMiddleware.js'

const router = express.Router();
router.post('/', validade(usuarioCreateSchema), usuarioController.adicionaUsuario);
router.use(authMiddleware);

router.get('/', usuarioController.listarUsuario);
router.put('/:cpf', validade(usuarioUpdateSchema), usuarioController.atualizarUsuario);

export default router