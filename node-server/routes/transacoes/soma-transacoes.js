import express from 'express';
import executeQuery from '../../db.config.js';
import { soma_transacoes } from '../../queries/transacoes/GET/index.js';

const router = express.Router();

// chamada POST para obter as transações por usuário
router.post('/transacoes/somatorio', async (req, res) => {
  const { body } = req;

  const date = new Date(body.data);

  const year = date.getFullYear();
  const month = date.getMonth() + 1;

  // Montar os parâmetros
  const params = [year, month];

  const result = await executeQuery(soma_transacoes, params);
  res.send(result);
});

export default router;
