import express from 'express';
import { executeQuery } from '../../db.config.js';
import { transacoes_com_relacionamentos } from '../../queries/transacoes/GET/index.js';
const router = express.Router();

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar', async (req, res) => {
  const { body } = req;

  const date = new Date(body.data.filterDate);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const tipo_transacao = body.data.idTipoTransacao;

  // Montar os parâmetros
  const params = [
    body.usr_id, tipo_transacao, tipo_transacao, tipo_transacao, year, month,
    body.usr_id, tipo_transacao, tipo_transacao, tipo_transacao, year, month
  ];

  const result = await executeQuery(transacoes_com_relacionamentos, params);
  res.send(result);
});

export default router;
