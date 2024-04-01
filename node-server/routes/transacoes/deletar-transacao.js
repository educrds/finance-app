import express from 'express';
import executeQuery from '../../db.config.js';
import { delete_transacao_by_id } from '../../queries/transacoes/DELETE/index.js';

const router = express.Router();

// chamada GET para obter as transações por usuário
router.post('/transacao/deletar', async (req, res) => {
  const { body } = req;
  const id = body.data.trs_id;

  const result = await executeQuery(delete_transacao_by_id, id);

  if (result.affectedRows > 0) {
    res.status(200).json({ message: 'Registro deletado com sucesso!' });

    return;
  }

  res.status(500).json({ message: 'Ocorreu um erro ao deletar o registro, tente novamente.' });
});

export default router;