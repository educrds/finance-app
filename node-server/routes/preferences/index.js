import express from 'express';
import { atualizarPreferencia, listarPreferencias } from '../../controllers/preferences-controller.js';

const router = express.Router();

// Chamada POST para listar as preferencias por usuário.
router.post('/listar-preferencias', listarPreferencias);

// Chamada POST para adicionar as preferencias por usuário.
router.post('/atualizar-preferencia', atualizarPreferencia);

export default router;
