import express from 'express';
import executeQuery from '../../db.config.js';
import { despesas_com_relacionamentos } from '../../queries/transacoes/GET/index.js';
const router = express.Router();

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar/despesas', async (req, res) => {
  const { body } = req;

  const date = new Date(body.data);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // Montar os parâmetros
  const params = [year, month];

  const result = await executeQuery(despesas_com_relacionamentos, params);
  res.send(result);
});

export default router;