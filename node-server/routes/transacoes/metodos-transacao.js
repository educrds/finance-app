import express from 'express';
import { executeQuery } from '../../db.config.js';
import { get_metodos } from '../../queries/transacoes/GET/index.js';
const router = express.Router();

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar/metodos', async (req, res) => {
  const result = await executeQuery(get_metodos);
  res.send(result);
});

export default router;
