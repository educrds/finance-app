import express from 'express';

import { adicionarTransacao, atualizarTransacaoById, deletarTransacaoById, deletarTransacaoEmMassa, listarMetodos, listarTransacoes } from '../../controllers/transacoes-controller.js';

const router = express.Router();

// Chamada POST para obter as transações por usuário.
router.post('/listar-transacoes', listarTransacoes);

router.post('/adicionar-transacao', adicionarTransacao);

// Chamada POST para obter os metódos de pagamento.
router.post('/listar-metodos', listarMetodos);

// Chamada POST para deletar a transacao por id.
router.post('/deletar-transacao', deletarTransacaoById);

// Rota POST para deletar todas as transações relacionadas a uma transação pai
router.post('/deletar-todas', deletarTransacaoEmMassa);

// Chamada POST para obter as transações por usuário.
router.post('/atualizar-transacao', atualizarTransacaoById);

export default router;
