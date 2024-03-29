import express from 'express';
import executeQuery from '../../db.config.js';
import { despesas_com_relacionamentos } from './queries.js';
const router = express.Router();

// Obter transações por usuário
async function getDespesas() {
  return await executeQuery(despesas_com_relacionamentos); 
  }

// chamada GET para obter as transações por usuário
router.post('/transacoes/listar/despesas', async (req, res) => {
  const result = await getDespesas();
  res.send(result);
});

export default router;